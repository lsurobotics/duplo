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
  // else if (event instanceof Blockly.Events.BlockMove) mirrorMoveEvent_(event, fromLeft);
  else if (event instanceof Blockly.Events.Change) mirrorChangeEvent_(event, fromLeft);
  else if (event instanceof Blockly.Events.Delete) mirrorDeleteEvent_(event, fromLeft);
  else if (event instanceof Blockly.Events.Ui) {
    if (event.element == "dragStart" || event.element == "dragStop") mirrorDragEvent_(event, fromLeft);
    else if (event.element == "selected" && event.newValue) setupOnSelectEvent_(event.newValue, fromLeft);
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
// function mirrorMoveEvent_(event, fromLeft) {
//   var block = workspace(fromLeft).getBlockById(event.blockId);
//   var otherBlock = workspace(!fromLeft).getBlockById(event.blockId);
//   if (block && otherBlock) {
    //move to parent's html hierarchy, if not already
    // if (!block.getPreviousBlock() && otherBlock.getPreviousBlock()) if (attachToParent(block, otherBlock, fromLeft)) return;
    // else if (block.getPreviousBlock() && !otherBlock.getPreviousBlock()) if (attachToParent(otherBlock, block, !fromLeft)) return;

    //correct position
    // resolveBlocks(block, otherBlock);
//   }
// }

// //if the blocks have attached to something, put them into the aesthetically correct position
// function resolveBlocks(block, otherBlock) {
//   if (block && otherBlock && (block.parentBlock_ || otherBlock.parentBlock_)) { //if parent on either side
//     if (block.parentBlock_ && otherBlock.parentBlock_) { //they both have parents -> move the higher one down
//       if (block.getRelativeToSurfaceXY().y == otherBlock.getRelativeToSurfaceXY().y) return;

//       var moveOtherBlock = block.getRelativeToSurfaceXY().y > otherBlock.getRelativeToSurfaceXY().y;
//       ((moveOtherBlock) ? otherBlock : block).previousConnection.disconnect();
//     }
//     else { //one of them doesn't have a parent -> move that one
//       var moveOtherBlock = otherBlock.parentBlock_ == null;
//       ((moveOtherBlock) ? otherBlock : block).moveTo(((moveOtherBlock) ? block : otherBlock).getRelativeToSurfaceXY());
//     }
//   }
// }

// // Attempt to move block html if the hierarchy looks something like
// // mirrored1 -------- mirrored2
// // non-mirrored
// // otherBlock ------- block
// // In this case, block would be moved under mirrored2 so that they would drag together.
// // Returns whether the operation succeeded.
// function attachToParent(block, otherBlock, blockOnLeft) {
//   var loc = otherBlock.getRelativeToSurfaceXY();
//   //find first mirrored parent of otherBlock
//   var diff = -1; //num of spaces between block & mirrored2
//   while (otherBlock.getPreviousBlock()) {
//     otherBlock = otherBlock.getPreviousBlock();
//     diff++;

//     var mirroredToOtherBlock = workspace(blockOnLeft).getBlockById(otherBlock.id);
//     if (mirroredToOtherBlock && !mirroredToOtherBlock.pathObject.svgRoot.contains(block.pathObject.svgRoot)) {
//       //attach!
//       // if (diff == 1) mirroredToOtherBlock.nextConnection.connect(block.previousConnection);
//       // else {
//         block.translate(0, 0);
//         mirroredToOtherBlock.pathObject.svgRoot.appendChild(block.pathObject.svgRoot);
//         mirroredToOtherBlock.childBlocks_.push(block);
//       // }

//       var mirrorLoc = mirroredToOtherBlock.getRelativeToSurfaceXY();
//       console.log(mirrorLoc);
//       console.log(loc);
//       block.translate(loc.x - mirrorLoc.x, loc.y - mirrorLoc.y);
//       return true;
//     }
//   }
//   return false;
// }












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
      otherBlock.isMirroring = true;
      dragger = new Blockly.BlockDragger(otherBlock, workspace(!fromLeft));
      dragger.startBlockDrag(new Blockly.utils.Coordinate(0, 0), false);
      //the rest of this is handled the same way dragging across is handled (see drag-across.js)
    }
  }
  else { //event.element == "dragStop"
    // If split stack:
    // - Disconnect stack below connection point and reconnect to bottom of lowest stack
    // - Take out of dragging divs/remake into top block



    // Go down stack again, on both sides where applicable. Keep track of the number of blocks since the last mirrored pair, or something else if there is no mirrored ancestor.
    // Where uneven mirrored pairs are found:
    // - If there is no mirrored ancestor (no #), move them and their relatives to you.
    // - Else if # is uneven, consolidate larger side if split, and move other side (bottom if split, or disconnect mirrored bottom only if not split)
    // - Else (# is even) consolidate both sides if either is split.

    if (fromLeft) rightWorkspace.addChangeListener(mirrorEvent);
    else leftWorkspace.addChangeListener(mirrorEvent);
  }
}

/* UI event -> -> element = "selected" and is selecting (i.e. not deselecting)
   This doesn't mirror, but rather sets up divs for mirrored dragging, on both sides.
   For variable naming reference, where 'block' triggered the event and --- represents a mirrored connection:

   block
   x0 ---------- otherBlock
   x1            x5
   x2
   x3            highest
   x4 ---------- x6

   In this case, highest is attached beneath x5.
   'block' changes to x0 so that otherBlock can be found.
   Then, 'block' is assigned to x1, then x2, then x3, then x4. Meanwhile, otherBlock is assigned to x5.
   Since exactly 1 of block and otherBlock (x4 and x5) is mirrored, x6 (x4's mirror) is identified as highest, then highest.
   */
function setupOnSelectEvent_(blockId, fromLeft) {
  //find top mirroring otherBlock
  var block = workspace(fromLeft).getBlockById(blockId);
  var otherBlock = workspace(!fromLeft).getBlockById(blockId);
  while(!otherBlock && block.getNextBlock()) {
    block = block.getNextBlock();
    otherBlock = workspace(!fromLeft).getBlockById(block.id);
  }

  if (!otherBlock) return;

  blockId = block.id;
  var highest;

  while(!highest && block.getNextBlock()) {
    block = block.getNextBlock();
    highest = workspace(!fromLeft).getBlockById(block.id);
  }

  var connectYours = !highest;

  if (highest) {
    while(otherBlock.getNextBlock()) {
      otherBlock = otherBlock.getNextBlock();
      if (otherBlock == highest) {
        setupOnSelectEvent_(otherBlock.id, !fromLeft);
        return;
      }
    }
  } else {
    while(!highest && otherBlock.getNextBlock()) {
      otherBlock = otherBlock.getNextBlock();
      highest = workspace(fromLeft).getBlockById(otherBlock.id);
    }
    if (!highest) return;
  }

  highest = highest.getTopStackBlock();

  var connecting = connectYours ? block : otherBlock;
  var notConnecting = connectYours ? otherBlock : block;

  if (!connecting.pathObject.svgRoot.contains(highest.pathObject.svgRoot)) {
    var low = connecting.getRelativeToSurfaceXY();
    var high = highest.getRelativeToSurfaceXY();
    highest.translate(high.x - low.x, high.y - low.y);
    connecting.pathObject.svgRoot.appendChild(highest.pathObject.svgRoot);
    connecting.childBlocks_.push(highest);
  }
  setupOnSelectEvent_(notConnecting.id, !connectYours == fromLeft);
}