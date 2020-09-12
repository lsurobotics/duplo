// Manages events on certain block types, creating a mirroring effect.

// Array of accepted block types
var mirroredBlocks = ['custom_close', 'custom_open'];

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
  var workspace = Blockly.Workspace.getById(event.workspaceId);
  var block = workspace.getBlockById(event.blockId);
  if (!block || !mirroredBlocks.includes(block.type)) {
    return; //only for synchronizing type
  }
  //recreate event in other workspace
  var otherWorkspace = fromLeft ? rightWorkspace : leftWorkspace;
  var newBlock = otherWorkspace.newBlock(block.type, block.id);
  newBlock.initSvg();
  newBlock.render();
  newBlock.moveTo(block.getRelativeToSurfaceXY());
}

// BlockMove event
function mirrorMoveEvent_(event, fromLeft) {
  var workspace = Blockly.Workspace.getById(event.workspaceId);
  var block = workspace.getBlockById(event.blockId);
  if (!block || !mirroredBlocks.includes(block.type)) {
    return; //only for synchronizing type
  }
  //recreate event in other workspace
  var otherWorkspace = fromLeft ? rightWorkspace : leftWorkspace;
  var otherBlock = otherWorkspace.getBlockById(event.blockId);

  Blockly.Events.disable();

  //handle connecting on one side without a matching block
  if (!event.newCoordinate && !otherWorkspace.getBlockById(event.newParentId)) {
    event.newParentId = null;
    event.newCoordinate = block.getRelativeToSurfaceXY();
  }

  if (event.newCoordinate) {
    console.log(fromLeft);
    console.log(event);
    otherBlock.moveTo(event.newCoordinate);
  }

  Blockly.Events.enable();
}

// Delete event
function mirrorDeleteEvent_(event, fromLeft) {
  var workspace = Blockly.Workspace.getById(event.workspaceId);
  var otherWorkspace = fromLeft ? rightWorkspace : leftWorkspace;
  var otherBlock = otherWorkspace.getBlockById(event.blockId); //block with same ID in other workspace
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
    var otherWorkspace = fromLeft ? rightWorkspace : leftWorkspace;
    var otherBlock = otherWorkspace.getBlockById(event.blockId);
    if (otherBlock && mirroredBlocks.includes(otherBlock.type)) {
      startX = pageX;
      startY = pageY;
      offsetX = 0;
      offsetY = 0;
      dragger = new Blockly.BlockDragger(otherBlock, otherWorkspace);
      dragger.startBlockDrag(new Blockly.utils.Coordinate(0, 0), false);
      //the rest of this is handled the same way dragging across is handled (see drag-across.js)
    }
  }
  else { //event.element == "dragStop"
    if (fromLeft) rightWorkspace.addChangeListener(mirrorEvent);
    else leftWorkspace.addChangeListener(mirrorEvent);
  }
}