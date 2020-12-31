// Manages events on certain block types, creating a mirroring effect.

// Array of accepted block types
var mirroredBlocks = ['custom_wait', 'controls_repeat', 'custom_move', 'custom_follow', 'custom_mirror'];

function isMirrored(block) {
  if (!mirroredBlocks.includes(block.type)) return false;
  if (block.type == "custom_move") {
    var fromLeft = (block.workspace == leftWorkspace);
    if (block.getField('END') || workspace(!fromLeft).getBlockById(block.id)) return true;
    else return false;
  }
  return true;
}

// Redirects an event to event handlers that mirror that event.
function mirrorEvent(event) {
  var fromLeft = (event.workspaceId == leftWorkspace.id); //true if triggered from the left workspace

  //redirect
  if (event instanceof Blockly.Events.BlockCreate) mirrorCreateEvent_(event, fromLeft);
  else if (event instanceof Blockly.Events.Change) mirrorChangeEvent_(event, fromLeft);
  else if (event instanceof Blockly.Events.Delete) mirrorDeleteEvent_(event, fromLeft);
  else if (event instanceof Blockly.Events.Ui) {
    if (event.element == "dragStart" || event.element == "dragStop") mirrorDragEvent_(event, fromLeft);
    else if (event.element == "selected") {
      if (event.oldValue) setupSplitStacks_(event.oldValue, !!workspace(true).getBlockById(event.oldValue), false);
      if (event.newValue) setupSplitStacks_(event.newValue, fromLeft, true);
    }
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
    if (block.getField('END')) {
      type = block.getFieldValue('END').includes('ollow') ? 'custom_follow' : 'custom_mirror';
      block.updateShape_('null');
      if (workspace(fromLeft).getGesture(event)) {
        var start = workspace(fromLeft).getGesture(event).mouseDownXY_;
        block.moveConnections(start.x - pageX, start.y - pageY);
      }
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
    //resolve everything on your side without worrying about mirroring
    workspace(fromLeft).getTopBlocks().forEach(block => {
      var otherBlock = workspace(!fromLeft).getBlockById(event.blockId);
      if (otherBlock && otherBlock.getPreviousBlock()) return; //in split stack
      else resolveBlocks(block.id, fromLeft);
    });

    return; //no matching block
  }
  if (!isMirrored(otherBlock)) {
    return; //this was a transfer from one side to another
  }
  //delete block
  otherBlock.dispose(true, true);
}

// UI event -> element = "dragStart" or "dragStop"
function mirrorDragEvent_(event, fromLeft) {
  if (event.element == "dragStart") {
    if (fromLeft) rightWorkspace.removeChangeListener(mirrorEvent);
    else leftWorkspace.removeChangeListener(mirrorEvent);

    //find top block to mirror dragging
    var block = workspace(fromLeft).getBlockById(event.blockId);
    var initialBlockPos = block.getRelativeToSurfaceXY();
    var otherBlock = workspace(!fromLeft).getBlockById(event.blockId);
    while(!otherBlock && block.getNextBlock()) {
      block = block.getNextBlock();
      otherBlock = workspace(!fromLeft).getBlockById(block.id);
    }

    //if found, mirror!
    if (otherBlock) {
      var gesture = workspace(fromLeft).getGesture(event);

      //move other block to be aligned
      if (otherBlock.previousConnection.isConnected()) otherBlock.previousConnection.disconnect();
      //starting point + the distance the other block is shifted
      otherBlock.moveTo(Blockly.utils.Coordinate.sum(gesture.blockDragger_.startXY_, Blockly.utils.Coordinate.difference(block.getRelativeToSurfaceXY(), initialBlockPos)));

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
    setupSplitStacks_(event.blockId, fromLeft, false);

    var block = workspace(fromLeft).getBlockById(event.blockId);
    if (block) resolveBlocks(block.getTopStackBlock().id, fromLeft);

    if (fromLeft) rightWorkspace.addChangeListener(mirrorEvent);
    else leftWorkspace.addChangeListener(mirrorEvent);
  }
}