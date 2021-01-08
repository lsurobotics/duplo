// Manages events on certain block types, creating a mirroring effect.

/* To manage which blocks are mirrored and how, review the following functions:
    For all blocks -
    mirror.js: mirroredBlocks, isMirrored, mirrorCreateEvent_

    For container blocks (should always be mirrored, as well) -
    lengthen-container.js: Blockly.blockRendering.RenderInfo.prototype.computeBounds_
*/

/**
 * Array of accepted block types.
 * If a block is only mirrored under certain conditions, it is included here, and the conditions is stated in `isMirrored`.
 */
const mirroredBlocks = ['custom_wait', 'controls_repeat', 'custom_move', 'custom_follow', 'custom_mirror'];

/**
 * Returns whether this block is or should be mirrored.
 * @param {Blockly.Block} block
*/
function isMirrored(block) {
  if (!mirroredBlocks.includes(block.type)) return false;
  if (block.type == "custom_move") {
    return block.getField('END') || getMirror(block);
  }
  return true;
}

/**
 * Returns the block mirrored to this block, or null if there is no such match.
 */
function getMirror(block) {
  if (!block) return null;
  return workspace(block.workspace == rightWorkspace).getBlockById(block.id);
}

/**
 * Redirects an event to event handlers that mirror that event.
 */
function mirrorEvent(event) {
  var fromLeft = (event.workspaceId == leftWorkspace.id); //true if triggered from the left workspace

  //redirect
  if (event instanceof Blockly.Events.BlockCreate) mirrorCreateEvent_(event, fromLeft);
  else if (event instanceof Blockly.Events.Change) mirrorChangeEvent_(event, fromLeft);
  else if (event instanceof Blockly.Events.Delete) mirrorDeleteEvent_(event, fromLeft);
  else if (event instanceof Blockly.Events.Ui) {
    if (event.element == "dragStart" || event.element == "dragStop") mirrorDragEvent_(event, fromLeft);
    else if (event.element == "selected") {
      if (event.oldValue) setupSplitStacks(event.oldValue, !!workspace(true).getBlockById(event.oldValue), false);
      if (event.newValue) setupSplitStacks(event.newValue, fromLeft, true);
    }
  }
}


/**
 * Called on BlockCreate event
 */
function mirrorCreateEvent_(event, fromLeft) {
  var block = workspace(fromLeft).getBlockById(event.blockId);
  if (!block || !isMirrored(block)) {
    return; //only for synchronizing type
  }
  if (getMirror(block)) {
    return; //already matching block on other side
  }

  // Get proper block type to recreate
  var type = block.type;
  if (block.type == 'custom_move') {
    //right out of toolbox (we've already verified that this block still needs to mutate) - mutate to correct shape & record type
    type = block.getFieldValue('END').includes('ollow') ? 'custom_follow' : 'custom_mirror';
    block.updateShape_('null');
    var gesture = workspace(fromLeft).getGesture(event);
    if (gesture) {
      var start = gesture.mouseDownXY_;
      block.moveConnections(start.x - pageX, start.y - pageY);
    }
  }
  else if (block.type == 'custom_follow' || block.type == 'custom_mirror') type = 'custom_move';

  // Recreate event in other workspace
  var newBlock = workspace(!fromLeft).newBlock(type, block.id);
  newBlock.initSvg();
  newBlock.render();
  newBlock.moveTo(block.getRelativeToSurfaceXY());
}

/**
 * Called on Change event
 */
function mirrorChangeEvent_(event, fromLeft) {
  var otherBlock = workspace(!fromLeft).getBlockById(event.blockId); //block with same ID in other workspace
  if (!otherBlock || !isMirrored(otherBlock)) {
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

/**
 * Called on Delete event
 */
function mirrorDeleteEvent_(event, fromLeft) {
  var otherBlock = workspace(!fromLeft).getBlockById(event.blockId); //block with same ID in other workspace
  if (!otherBlock) {
    //you've deleted a non-mirrored block; resolve everything on your side without worrying about mirroring
    workspace(fromLeft).getTopBlocks().forEach(block => {
      var otherBlock = getMirror(block);
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

/**
 * Called on UI event when element is `"dragStart"` or `"dragStop"`
 */
function mirrorDragEvent_(event, fromLeft) {
  if (event.element == "dragStart") {
    if (fromLeft) rightWorkspace.removeChangeListener(mirrorEvent);
    else leftWorkspace.removeChangeListener(mirrorEvent);

    //find top block to mirror dragging
    var block = workspace(fromLeft).getBlockById(event.blockId);
    var initialBlockPos = block.getRelativeToSurfaceXY();
    var otherBlock = getMirror(block);
    while(!otherBlock && block.getNextBlock()) {
      block = block.getNextBlock();
      otherBlock = getMirror(block);
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
    setupSplitStacks(event.blockId, fromLeft, false);

    var block = workspace(fromLeft).getBlockById(event.blockId);
    if (block) resolveBlocks(block.getTopStackBlock().id, fromLeft);

    if (fromLeft) rightWorkspace.addChangeListener(mirrorEvent);
    else leftWorkspace.addChangeListener(mirrorEvent);
  }
}