// Manages events on certain block types, creating a mirroring effect.

// Array of accepted block types
var mirroredBlocks = ['custom_wait', 'controls_repeat', 'custom_move', 'custom_follow', 'custom_mirror'];

function isMirrored(block) {
  if (!mirroredBlocks.includes(block.type)) return false;
  if (block.type == "custom_move") {
    var fromLeft = (block.workspace == leftWorkspace);
    if (block.getInput('CONNECTION') || workspace(!fromLeft).getBlockById(block.id)) return true;
    else return false;
  }
  return true;
}

// Redirects an event to event handlers that mirror that event.
function mirrorEvent(event) {
  var fromLeft = (event.workspaceId == leftWorkspace.id); //true if triggered from the left workspace

  //redirect
  if (event instanceof Blockly.Events.BlockCreate) mirrorCreateEvent_(event, fromLeft);
  else if (event instanceof Blockly.Events.BlockMove) mirrorMoveEvent_(event, fromLeft);
  else if (event instanceof Blockly.Events.Change) mirrorChangeEvent_(event, fromLeft);
  else if (event instanceof Blockly.Events.Delete) mirrorDeleteEvent_(event, fromLeft);
  else if (event instanceof Blockly.Events.Ui) {
    if (event.element == "dragStart" || event.element == "dragStop") mirrorDragEvent_(event, fromLeft);
  }
}


// BlockCreate event
function mirrorCreateEvent_(event, fromLeft) {
  var block = workspace(fromLeft).getBlockById(event.blockId);
  if (!block || !isMirrored(block)) {
    return; //only for synchronizing type
  }
  if (workspace(!fromLeft).getBlockById(event.blockId)) {
    return; //already matching block on other side
  }

  // Get proper block type to recreate
  var type = block.type;
  if (block.type == 'custom_move') {
    //right out of toolbox - disconnect toolbox block & record type
    if (block.getInputTargetBlock('CONNECTION')) {
      var badBlock = block.getInputTargetBlock('CONNECTION')
      type = badBlock.type.replace("_toolbox", "");
      badBlock.dispose();
      block.updateShape_(false);
    }
    //matching block on other side
    else type = workspace(!fromLeft).getBlockById(event.blockId).type;
  }
  else if (block.type == 'custom_follow' || block.type == 'custom_mirror') type = 'custom_move';

  // Recreate event in other workspace
  var newBlock = workspace(!fromLeft).newBlock(type, block.id);
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

// Change event
function mirrorChangeEvent_(event, fromLeft) {
  var otherBlock = workspace(!fromLeft).getBlockById(event.blockId); //block with same ID in other workspace
  if (!otherBlock) {
    return; //no matching block
  }
  if (!isMirrored(otherBlock)) {
    return; //only for synchronizing type
  }
  if (event.element == "field" && otherBlock.getField(event.name)) {
    //change other block's old value to new value
    otherBlock.setFieldValue(event.newValue, event.name);
  }
  else if (event.element == "collapsed") {
    otherBlock.setCollapsed(event.newValue);
  }
}

// Delete event
function mirrorDeleteEvent_(event, fromLeft) {
  var otherBlock = workspace(!fromLeft).getBlockById(event.blockId); //block with same ID in other workspace
  if (!otherBlock) {
    return; //no matching block
  }
  if (!isMirrored(otherBlock)) {
    return; //only for synchronizing type
  }
  //delete block
  otherBlock.unplug(true);
  otherBlock.dispose();
}

// UI event -> element = "dragStart" or "dragStop"
function mirrorDragEvent_(event, fromLeft) {
  if (event.element == "dragStart") {
    if (fromLeft) rightWorkspace.removeChangeListener(mirrorEvent);
    else leftWorkspace.removeChangeListener(mirrorEvent);

    //mirror dragging
    var otherBlock = workspace(!fromLeft).getBlockById(event.blockId);
    if (otherBlock && isMirrored(otherBlock)) {
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