// Deals with resolving/aligning mirrored blocks so that mirrored stacks are cleanly connected and drag together.


/**
 * This function recursively sets up stacks for mirrored dragging, on both sides if found.
 * 
 * For variable naming reference, where `block[your]` triggered the function and `---` represents a mirrored connection:
 * 
 * ```
 * block[your]
 * x0 ---------- block[other]
 * x1            x5
 * x2
 * x3            highest
 * x4 ---------- x6
 * ```
 * 
 * In this case, `highest` is attached beneath `x5` if `joining` or disconnecting from `x5` if `!joining`.
 * 
 * `'block[your]'` changes to `x0` so that `block[other]` can be found.
 * At that point, if either of `'block'` contain other blocks, those are connected/disconnected.
 * 
 * Then, `'block[your]'` is assigned to `x1`, then `x2`, then `x3`, then `x4`. Meanwhile, `'block[other]'` is assigned to `x5`.
 * Since exactly 1 of `'block'` (`x4` and `x5`) is mirrored, `x6` (`x4`'s mirror) is identified as `'highest'`, then `highest`.
 * 
 * @param {string} blockId The ID of the block in whose stack you will search for split stacks.
 * @param {boolean} fromLeft Workspace of above block.
 * @param {boolean} joining Whether you are connecting (`true`) or disconnecting (`false`) any split stacks found.
 */
function setupSplitStacks(blockId, fromLeft, joining) {
  // The blocks on your side & the other side are identified by these indices.
  const your = 0;
  const other = 1;

  //find top mirroring otherBlock
  var block = [workspace(fromLeft).getBlockById(blockId), workspace(!fromLeft).getBlockById(blockId)];
  if (!block[your]) return;
  while(!block[other] && block[your].getNextBlock()) {
    block[your] = block[your].getNextBlock();
    block[other] = getMirror(block[your]);
  }

  if (!block[other]) return;

  // If block contains blocks in inputs, dis/connect those off the bat
  block[your].inputList.forEach(input => {
    if (!input.connection) return;

    //split between container & first block of input?
    if (!!block[your].getInputTargetBlock(input.name) != !!block[other].getInputTargetBlock(input.name)) {
      // Index of the connected & disconnected containers
      const conn = block[your].getInputTargetBlock(input.name) ? 0 : 1;
      const disconn = block[your].getInputTargetBlock(input.name) ? 1 : 0;

      let otherBlock = block[conn].getInputTargetBlock(input.name);
      while(otherBlock.getNextBlock()) {
        otherBlock = otherBlock.getNextBlock();
        if (getMirror(otherBlock)) break;
      }
      let highest = getMirror(otherBlock);
      if (!highest) return;
      highest = highest.getTopStackBlock();

      if (!block[disconn].pathObject.svgRoot.contains(highest.pathObject.svgRoot) && joining) {
        connectSplitStack_(block[disconn], highest);
      }
      else if (block[disconn].pathObject.svgRoot.contains(highest.pathObject.svgRoot) && !joining) {
        disconnectSplitStack_(block[disconn], highest);
      }
    }

    //internal split stacks
    if (block[your].getInputTargetBlock(input.name)) setupSplitStacks(block[your].getInputTargetBlock(input.name).id, fromLeft, joining);
    if (block[other].getInputTargetBlock(input.name)) setupSplitStacks(block[other].getInputTargetBlock(input.name).id, !fromLeft, joining);
  });

  blockId = block[your].id;
  var highest;

  while(!highest && block[your].getNextBlock()) {
    block[your] = block[your].getNextBlock();
    highest = getMirror(block[your]);
  }

  var connectYours = !highest;

  if (highest) {
    while(block[other].getNextBlock()) {
      block[other] = block[other].getNextBlock();
      if (block[other] == highest) {
        setupSplitStacks(block[other].id, !fromLeft, joining);
        return;
      }
    }
  } else {
    while(!highest && block[other].getNextBlock()) {
      block[other] = block[other].getNextBlock();
      highest = workspace(fromLeft).getBlockById(block[other].id);
    }
    if (!highest) return;
  }

  highest = highest.getTopStackBlock();

  // Indices of the block you're dis/connecting in a split stack, and the lowest block on the other side.
  const connecting = connectYours ? 0 : 1;
  const notConnecting = connectYours ? 1 : 0;

  if (!block[connecting].pathObject.svgRoot.contains(highest.pathObject.svgRoot) && joining) {
    connectSplitStack_(block[connecting], highest);
  }
  else if (block[connecting].pathObject.svgRoot.contains(highest.pathObject.svgRoot) && !joining) {
    disconnectSplitStack_(block[connecting], highest);
  }

  setupSplitStacks(block[notConnecting].id, !connectYours == fromLeft, joining);
}

  
/**
 * Recursively aligns mirrored blocks & their relatives.
 * @param {string} blockId The ID of the block in whose stack you will search for mirrored blocks to align.
 * @param {boolean} fromLeft Workspace of above block.
 * @returns {boolean} Whether a mirrored descendant was found to align.
 */
function resolveBlocks(blockId, fromLeft) {
  // The blocks on your side & the other side are identified by these indices.
  const your = 0;
  const other = 1;

  //find top mirroring otherBlock
  var block = [workspace(fromLeft).getBlockById(blockId), workspace(!fromLeft).getBlockById(blockId)];
  if (!block[your]) return false;
  while(!block[other] && block[your].getNextBlock()) {
    block[your] = block[your].getNextBlock();
    block[other] = getMirror(block[your]);
  }

  if (!block[other]) return false;

  var height = [0, 0];
  var connected = 0; //1st binary digit for connected on your side (connected > 1), 2nd for the other side (connected % 2 == 1)

  var stack = [block[your], block[other]];
  var secondBlock = [null, null]; //2nd in stack
  while(stack[your].getParent() && connected < 2) {
    secondBlock[your] = stack[your];
    stack[your] = stack[your].getParent();
    height[your]++;
    if (getMirror(stack[your])) connected += 2;
  }
  while(stack[other].getParent() && connected % 2 == 0) {
    secondBlock[other] = stack[other];
    stack[other] = stack[other].getParent();
    height[other]++;
    if (getMirror(stack[other])) connected++;
  }

  /* There are a few possible situations here. Evenness refers to the number of blocks in a stack being equal or unequal.
      - Both sides are connected (connected = 3). If they are even, move on. If they are uneven, disconnect the higher one & move down.
      - There is no mirrored ancestor (connected = 0). In this case, move the lower mirrored stack up to the higher one all the way up to where the
        stack would reach y = 0. From then on, move the higher mirrored stack down.
      - Only one side is connected (connected = 1 or 2), but the sides are even. In this case, connect the disconnected side.
      - Only one side is connected, but the sides are uneven, with the connected side being longer. In this case, move the disconnected side to match you.
      - Only one side is connected, but the sides are unever, with the disconnected side being longer. In this case, connect the disconnected side,
        disconnect the connected mirrored block, and move it to match.
  */

  if (connected == 3) {
    if (height[your] != height[other]) {
      // The blocks on the side you're primarily moving & that other side are identified by these indices.
      const move = (height[your] < height[other]) ? 0 : 1;
      const base = (height[your] < height[other]) ? 1 : 0;
      block[move].unplug();
      block[move].moveTo(block[base].getRelativeToSurfaceXY());
    }
  }
  else if (connected == 0) {
    var diff = block[your].getRelativeToSurfaceXY().y - block[other].getRelativeToSurfaceXY().y;
    if (diff != 0) {

      const move = (diff > 0) ? 0 : 1;
      const base = (diff > 0) ? 1 : 0;
      if (diff < 0) diff *= -1;

      if (diff < stack[move].getRelativeToSurfaceXY().y) stack[move].moveBy(stack[base].getRelativeToSurfaceXY().x - stack[move].getRelativeToSurfaceXY().x, -diff);
      else {
        stack[move].moveTo(stack[move].getRelativeToSurfaceXY().x, 0);
        stack[base].moveBy(stack[base].getRelativeToSurfaceXY().x - stack[move].getRelativeToSurfaceXY().x, Math.abs(block[your].getRelativeToSurfaceXY().y - block[other].getRelativeToSurfaceXY().y));
      }

    }
  }
  else {
    // Index of connected & disconnected side.
    const conn = connected % 2;
    const disconn = connected-1;

    //you've missed some height on a split stack!
    height[disconn]++;
    var targetConnection;
    if (stack[conn].getInputWithBlock(secondBlock[conn])) {
      targetConnection = getMirror(stack[conn]).getMatchingConnection(stack[conn], stack[conn].getInputWithBlock(secondBlock[conn]).connection);
    } else {
      targetConnection = getMirror(stack[conn]).nextConnection;
    }
    while(targetConnection.targetBlock()) {
      height[disconn]++;
      targetConnection = targetConnection.targetBlock().nextConnection;
    }

    //decide what to do based on height
    if (height[conn] == height[disconn]) {
      targetConnection.connect_(stack[disconn].previousConnection);
    }
    else if (height[conn] > height[disconn]) {
      var diff = block[conn].getRelativeToSurfaceXY().y - block[disconn].getRelativeToSurfaceXY().y;
      stack[disconn].moveBy(block[conn].getRelativeToSurfaceXY().x - block[disconn].getRelativeToSurfaceXY().x, diff);
    }
    else {
      targetConnection.connect_(stack[disconn].previousConnection);
      block[conn].unplug();
      block[conn].moveTo(block[disconn].getRelativeToSurfaceXY());
    }
  }

  // If block contains blocks in inputs, resolve those now
  block[your].inputList.forEach(input => {
    if (input.connection && block[your].getInputTargetBlock(input.name)) resolveBlocks(block[your].getInputTargetBlock(input.name).id, fromLeft);
    if (input.connection && block[other].getInputTargetBlock(input.name)) resolveBlocks(block[other].getInputTargetBlock(input.name).id, !fromLeft);
  });

  // Next blocks
  if (block[your].getNextBlock() && resolveBlocks(block[your].getNextBlock().id, fromLeft)) ;
  else if (block[other].getNextBlock()) resolveBlocks(block[other].getNextBlock().id, !fromLeft);
  return true;
}


/**
 * Connects two blocks into a split stack.
 */
function connectSplitStack_(top, bottom) {
  if (top.pathObject.svgRoot.contains(bottom.pathObject.svgRoot)) {
    if (top.childBlocks_.includes(bottom)) top.childBlocks_.push(bottom);
    console.error("The top block already contains the bottom block.");
    return;
  }
  else if ((top.getNextBlock() && top.inputList.length == 0) || bottom.getParent()) {
    console.error("These blocks are not the ends of their stacks.");
    return;
  }

  var topLoc = top.getRelativeToSurfaceXY();
  var bottomLoc = bottom.getRelativeToSurfaceXY();
  bottom.translate(bottomLoc.x - topLoc.x, bottomLoc.y - topLoc.y);
  top.pathObject.svgRoot.appendChild(bottom.pathObject.svgRoot);
  if (!top.childBlocks_.includes(bottom)) {
    top.childBlocks_.push(bottom);
  } else {
    console.warn("Something has been set up incorrectly, as the bottom block is already the top's child block. Continuing to connect in the DOM.");
  }
}

/**
 * Disconnects two blocks previously connected in a split stack.
 */
function disconnectSplitStack_(top, bottom) {
  if (!top.pathObject.svgRoot.contains(bottom.pathObject.svgRoot)) {
    if (top.childBlocks_.includes(bottom)) top.childBlocks_.splice(top.childBlocks_.indexOf(bottom), 1);
    console.error("The top block does not contain the bottom block.");
    return;
  }
  else if ((top.getNextBlock() && top.inputList.length == 0) || bottom.getParent()) {
    console.error("These blocks are not the ends of their stacks.");
    return;
  }

  var bottomLoc = bottom.getRelativeToSurfaceXY();
  bottom.translate(bottomLoc.x, bottomLoc.y);
  if (top.childBlocks_.includes(bottom)) {
    top.childBlocks_.splice(top.childBlocks_.indexOf(bottom), 1);
  } else {
    console.warn("Something has been set up incorrectly, as the bottom block is not top's child block. Continuing to split.");
  }
  bottom.workspace.getBlockById("START").pathObject.svgRoot.parentElement.appendChild(bottom.pathObject.svgRoot);
}





// Disables snapping & bumping; it messes with the alignment system. Maybe there's a way to make mirrored stacks not apply?
Blockly.BlockSvg.prototype.snapToGrid = function() {};
Blockly.BlockSvg.prototype.bumpNeighbours = function() {};

// Overrides the default BlockSvg.dispose function to seperate split stacks.
let originalDispose = Blockly.BlockSvg.prototype.dispose;

Blockly.BlockSvg.prototype.dispose = function(healStack, animate) {
  setupSplitStacks(this.id, this.workspace == leftWorkspace);
  if (!this.isInsertionMarker_) {
    for(var i = 0; i < this.childBlocks_.length; i++) {
      if (this.workspace.getTopBlocks().includes(this.childBlocks_[i])) {
        disconnectSplitStack_(this, this.childBlocks_[i]);
      }
    }
  }
  originalDispose.apply(this, [healStack, animate]);
};

// Overrides the default InsertionMarkerManager.showInsertionMarker_ function to resolve blocks on marker insertion.
let originalShowInsert = Blockly.InsertionMarkerManager.prototype.showInsertionMarker_;
let originalHideInsert = Blockly.InsertionMarkerManager.prototype.hideInsertionMarker_;

Blockly.InsertionMarkerManager.prototype.showInsertionMarker_ = function() {
  originalShowInsert.apply(this);
  resolveBlocks(this.markerConnection_.sourceBlock_.id, this.markerConnection_.sourceBlock_.workspace == leftWorkspace);
};
Blockly.InsertionMarkerManager.prototype.hideInsertionMarker_ = function() {
  let connectedBlock = this.markerConnection_.targetBlock();
  originalHideInsert.apply(this);
  if (connectedBlock) resolveBlocks(connectedBlock.id, connectedBlock.workspace == leftWorkspace);
};





// This is part of the Blockly library. The line changes fix freezing on end block drag when a mirrored stack is dragged immediately around itself.
Blockly.BlockSvg.prototype.setDragging = function(adding) {
  if (adding) {
    var group = this.getSvgRoot();
    group.translate_ = '';
    group.skew_ = '';
    Blockly.draggingConnections =
        Blockly.draggingConnections.concat(this.getConnections_(true));
    Blockly.utils.dom.addClass(
        /** @type {!Element} */ (this.svgGroup_), 'blocklyDragging');
  } else {
    if (this.id == draggingId) { // Only change is putting this in an if statement + timeout
      setTimeout(function() {
        Blockly.draggingConnections = [];
      }, 10);
    }
    Blockly.utils.dom.removeClass(
        /** @type {!Element} */ (this.svgGroup_), 'blocklyDragging');
  }
  // Recurse through all blocks attached under this one.
  for (var i = 0; i < this.childBlocks_.length; i++) {
    this.childBlocks_[i].setDragging(adding);
  }
};


// Also part of the Blockly library; change makes select events in the flyout trigger in the left workspace so that our event listeners are triggered.
Blockly.BlockSvg.prototype.select = function() {
  if (this.isShadow() && this.getParent()) {
    // Shadow blocks should not be selected.
    this.getParent().select();
    return;
  }
  if (Blockly.selected == this) {
    return;
  }
  var oldId = null;
  if (Blockly.selected) {
    oldId = Blockly.selected.id;
    // Unselect any previously selected block.
    Blockly.Events.disable();
    try {
      Blockly.selected.unselect();
    } finally {
      Blockly.Events.enable();
    }
  }
  var event = new Blockly.Events.Ui(null, 'selected', oldId, this.id);
  event.workspaceId = this.workspace.isFlyout ? leftWorkspace.id : this.workspace.id; // Only change.
  Blockly.Events.fire(event);
  Blockly.selected = this;
  this.addSelect();
};