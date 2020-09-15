// Manages events on certain block types, creating a mirroring effect.

// Array of accepted block types
var mirroredBlocks = ['custom_wait'];

// Redirects an event to event handlers that mirror that event.
function mirrorEvent(event) {
  var fromLeft = (event.workspaceId == leftWorkspace.id); //true if triggered from the left workspace

  //redirect
  if (event instanceof Blockly.Events.BlockCreate) mirrorCreateEvent_(event, fromLeft);
  else if (event instanceof Blockly.Events.BlockMove) mirrorMoveEvent_(event, fromLeft);
  else if (event instanceof Blockly.Events.Delete) mirrorDeleteEvent_(event, fromLeft);
  else if (event instanceof Blockly.Events.Ui) {
    if (event.element == "dragStart" || event.element == "dragStop") mirrorDragEvent_(event, fromLeft);
  }
}


// BlockCreate event
function mirrorCreateEvent_(event, fromLeft) {
  var block = workspace(fromLeft).getBlockById(event.blockId);
  if (!block || !mirroredBlocks.includes(block.type)) {
    return; //only for synchronizing type
  }
  //recreate event in other workspace
  var newBlock = workspace(!fromLeft).newBlock(block.type, block.id);
  newBlock.initSvg();
  newBlock.render();
  newBlock.moveTo(block.getRelativeToSurfaceXY());
}

// BlockMove event
function mirrorMoveEvent_(event, fromLeft) {
  //check block & all next children
  var block = workspace(fromLeft).getBlockById(event.blockId);
  var otherBlock = workspace(!fromLeft).getBlockById(event.blockId);
  while (block) {
    otherBlock = workspace(!fromLeft).getBlockById(block.id);
    if (otherBlock) {
      resolveBlocks(block, otherBlock);
    }

    block = block.getNextBlock();
  }
}

//if the blocks have attached to something, put them into the aesthetically correct position
function resolveBlocks(block, otherBlock) {
  if (block && otherBlock && (block.parentBlock_ || otherBlock.parentBlock_)) { //if parent on either side
    if (block.parentBlock_ && otherBlock.parentBlock_) { //they both have parents -> move the higher one down
      if (block.getRelativeToSurfaceXY().y == otherBlock.getRelativeToSurfaceXY().y) return;

      var moveOtherBlock = block.getRelativeToSurfaceXY().y > otherBlock.getRelativeToSurfaceXY().y;
      ((moveOtherBlock) ? otherBlock : block).previousConnection.disconnect();
    }
    else { //one of them doesn't have a parent -> move that one
      var moveOtherBlock = otherBlock.parentBlock_ == null;
      ((moveOtherBlock) ? otherBlock : block).moveTo(((moveOtherBlock) ? block : otherBlock).getRelativeToSurfaceXY());
    }
  }
}

// Delete event
function mirrorDeleteEvent_(event, fromLeft) {
  var otherBlock = workspace(!fromLeft).getBlockById(event.blockId); //block with same ID in other workspace
  if (!otherBlock) {
    return; //no matching block
  }
  if (!mirroredBlocks.includes(otherBlock.type)) {
    return; //only for synchronizing type
  }
  //delete block
  otherBlock.dispose();
}

// UI event -> element = "dragStart" or "dragStop"
function mirrorDragEvent_(event, fromLeft) {
  if (event.element == "dragStart") {
    if (fromLeft) rightWorkspace.removeChangeListener(mirrorEvent);
    else leftWorkspace.removeChangeListener(mirrorEvent);

    //mirror dragging
    var otherBlock = workspace(!fromLeft).getBlockById(event.blockId);
    if (otherBlock && mirroredBlocks.includes(otherBlock.type)) {
      var gesture = workspace(fromLeft).getGesture(event);

      //move other block to be aligned
      if (otherBlock.previousConnection.isConnected()) otherBlock.previousConnection.disconnect();
      otherBlock.moveTo(gesture.blockDragger_.startXY_);

      //set up initial dragging coords
      startX = gesture.mouseDownXY_.x;
      startY = gesture.mouseDownXY_.y;
      offsetX = 0;
      offsetY = 0;
      dragger = new Blockly.BlockDragger(otherBlock, workspace(!fromLeft));
      dragger.startBlockDrag(new Blockly.utils.Coordinate(0, 0), false);
      //the rest of this is handled the same way dragging across is handled (see drag-across.js)
    }
  }
  else { //event.element == "dragStop"
    if (fromLeft) rightWorkspace.addChangeListener(mirrorEvent);
    else leftWorkspace.addChangeListener(mirrorEvent);
  }
}