// Deals with resolving/aligning mirrored blocks so that mirrored stacks are cleanly connected and drag together.


/* UI event -> element = "selected" (select/deselect) or "dragStop"
  This doesn't mirror, but instead recursively sets up divs for mirrored dragging, on both sides.
  For variable naming reference, where block triggered the event and --- represents a mirrored connection:

  block
  x0 ---------- otherBlock
  x1            x5
  x2
  x3            highest
  x4 ---------- x6

  In this case, highest is attached beneath x5 if joining or disconnecting from x5 if !joining.
  'block' changes to x0 so that otherBlock can be found.
  Then, 'block' is assigned to x1, then x2, then x3, then x4. Meanwhile, 'otherBlock' is assigned to x5.
  Since exactly 1 of 'block' and 'otherBlock' (x4 and x5) is mirrored, x6 (x4's mirror) is identified as 'highest', then highest.
  */
function setupSplitStacks_(blockId, fromLeft, joining) {
  //find top mirroring otherBlock
  var block = workspace(fromLeft).getBlockById(blockId);
  if (!block) return;
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
        setupSplitStacks_(otherBlock.id, !fromLeft, joining);
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

  if (!connecting.pathObject.svgRoot.contains(highest.pathObject.svgRoot) && joining) {
    var low = connecting.getRelativeToSurfaceXY();
    var high = highest.getRelativeToSurfaceXY();
    highest.translate(high.x - low.x, high.y - low.y);
    connecting.pathObject.svgRoot.appendChild(highest.pathObject.svgRoot);
    connecting.childBlocks_.push(highest);
  }
  else if (connecting.pathObject.svgRoot.contains(highest.pathObject.svgRoot) && !joining) {
    disconnectSplitStack(connecting, highest);
  }

  setupSplitStacks_(notConnecting.id, !connectYours == fromLeft, joining);
}
  
// Recursively aligns mirrored blocks. Returns whether a mirrored descendant was found to align.
function resolveBlocks(blockId, fromLeft) {
  // The blocks on your side & the other side are identified by these indices.
  var your = 0;
  var other = 1;

  //find top mirroring otherBlock
  var block = [workspace(fromLeft).getBlockById(blockId), workspace(!fromLeft).getBlockById(blockId)];
  if (!block[your]) return;
  while(!block[other] && block[your].getNextBlock()) {
    block[your] = block[your].getNextBlock();
    block[other] = workspace(!fromLeft).getBlockById(block[your].id);
  }

  if (!block[other]) return false;

  var height = [0, 0];
  var connected = 0; //1st binary digit for connected on your side (connected > 1), 2nd for the other side (connected % 2 == 1)

  var stack = [block[your], block[other]];
  while(stack[your].getPreviousBlock() && connected < 2) {
    stack[your] = stack[your].getPreviousBlock();
    height[your]++;
    if (workspace(!fromLeft).getBlockById(stack[your].id)) connected += 2;
  }
  while(stack[other].getPreviousBlock() && connected % 2 == 0) {
    stack[other] = stack[other].getPreviousBlock();
    height[other]++;
    if (workspace(fromLeft).getBlockById(stack[other].id)) connected++;
  }

  var low;
  if (connected == 1) {
    //you've missed some on a split stack!
    height[your]++;
    low = workspace(fromLeft).getBlockById(stack[other].id);
    while(low.getNextBlock()) {
      height[your]++;
      low = low.getNextBlock();
    }
  }
  else if (connected == 2) {
    height[other]++;
    low = workspace(!fromLeft).getBlockById(stack[your].id);
    while(low.getNextBlock()) {
      height[other]++;
      low = low.getNextBlock();
    }
  }

  /* There are a few possible situations here.
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
      var move = (height[your] < height[other]) ? 0 : 1;
      var base = (height[your] < height[other]) ? 1 : 0;
      block[move].unplug();
      block[move].moveTo(block[base].getRelativeToSurfaceXY());
      pauseBump();
    }
  }
  else if (connected == 0) {
    var diff = block[your].getRelativeToSurfaceXY().y - block[other].getRelativeToSurfaceXY().y;
    if (diff != 0) {

      var move = (diff > 0) ? 0 : 1;
      var base = (diff > 0) ? 1 : 0;
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
    var conn = connected % 2;
    var disconn = connected-1;
    if (height[conn] == height[disconn]) {
      low.nextConnection.connect_(stack[disconn].previousConnection);
    }
    else if (height[conn] > height[disconn]) {
      var diff = block[conn].getRelativeToSurfaceXY().y - block[disconn].getRelativeToSurfaceXY().y;
      stack[disconn].moveBy(block[conn].getRelativeToSurfaceXY().x - block[disconn].getRelativeToSurfaceXY().x, diff);
      pauseBump();
    }
    else {
      low.nextConnection.connect_(stack[disconn].previousConnection);
      block[conn].unplug();
      block[conn].moveTo(block[disconn].getRelativeToSurfaceXY());
      pauseBump();
    }
  }

  if (block[your].getNextBlock() && resolveBlocks(block[your].getNextBlock().id, fromLeft)) ;
  else if (block[other].getNextBlock()) resolveBlocks(block[other].getNextBlock().id, !fromLeft);
  return true;
}

// Disconnects two blocks previously connected in a split stack.
function disconnectSplitStack(top, bottom) {
  if (!top.pathObject.svgRoot.contains(bottom.pathObject.svgRoot)) {
    if (top.childBlocks_.contains(bottom)) top.childBlocks_.splice(top.childBlocks_.indexOf(bottom), 1);
    console.error("The top block does not contain the bottom block.");
    return;
  }
  else if (top.getNextBlock() || bottom.getPreviousBlock()) {
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





// Overrides the default BlockSvg.snapToGrid and BlockSvg.bumpNeighbours functions to not snap/bump if requested.
var originalSnap = Blockly.BlockSvg.prototype.snapToGrid;
var originalBump = Blockly.BlockSvg.prototype.bumpNeighbours;
var pauseBump_ = false;

function pauseBump() {
  if (!pauseBump_) {
    pauseBump_ = true;
    setTimeout(function() {
      pauseBump_ = false;
    }, Blockly.BUMP_DELAY * 1.1);
  }
}
Blockly.BlockSvg.prototype.snapToGrid = function() {
  if (pauseBump_) return;
  originalSnap.apply(this);
};
Blockly.BlockSvg.prototype.bumpNeighbours = function() {
  if (pauseBump_) return;
  originalBump.apply(this);
};

// Overrides the default BlockSvg.dispose function to seperate split stacks.
var originalDispose = Blockly.BlockSvg.prototype.dispose;

Blockly.BlockSvg.prototype.dispose = function(healStack, animate) {
  if (!this.isInsertionMarker_) {
    for(var i = 0; i < this.childBlocks_.length; i++) {
      if (this.workspace.getTopBlocks().includes(this.childBlocks_[i])) {
        disconnectSplitStack(this, this.childBlocks_[i]);
      }
    }
  }
  originalDispose.apply(this, [healStack, animate]);
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
    if (this.id == draggingId && (this.workspace == draggingWorkspace || draggingWorkspace == null)) { // Only change is putting this in an if statement + timeout
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
  
  
// This is also part of the Blockly library. The function change for lastOnStack chooses the last connection on a split stack for dragging.
Blockly.InsertionMarkerManager.prototype.initAvailableConnections_ = function() {
  var available = this.topBlock_.getConnections_(false);
  // Also check the last connection on this stack
  var lastOnStack = lastConnectionInSplitStack(this.topBlock_, this.topBlock_.workspace == leftWorkspace); // Function changed from this.topBlock_.lastConnectionInStack()
  if (lastOnStack && lastOnStack != this.topBlock_.nextConnection) {
    available.push(lastOnStack);
    if (!this.topBlock_.nextConnection.targetBlock()) available.splice(available.indexOf(this.topBlock_.nextConnection), 1); // Removes extra connection
    this.lastOnStack_ = lastOnStack;
    this.lastMarker_ = this.createMarkerBlock_(lastOnStack.getSourceBlock());
  }
  return available;
};

function lastConnectionInSplitStack(topBlock, fromLeft) {
  var lowestMirror = null;
  var block = topBlock;
  if (workspace(!fromLeft).getBlockById(block.id)) lowestMirror = workspace(!fromLeft).getBlockById(block.id);
  while (block.nextConnection) {
    if (!block.nextConnection.targetBlock() && !lowestMirror) {
      // Found a next connection with nothing on the other side, where there are no mirrored blocks to turn to.
      return block.nextConnection;
    }
    else if (!block.nextConnection.targetBlock()) {
      // You ran out of connections, but this could be a split stack.
      break;
    }
    block = block.nextConnection.targetBlock();
    if (workspace(!fromLeft).getBlockById(block.id)) lowestMirror = workspace(!fromLeft).getBlockById(block.id);
  }
  if (lowestMirror) {
    var otherBlock = lowestMirror;
    while(otherBlock.getNextBlock()) {
      otherBlock = otherBlock.getNextBlock();
      if (workspace(fromLeft).getBlockById(otherBlock.id)) return lastConnectionInSplitStack(workspace(fromLeft).getBlockById(otherBlock.id), fromLeft);
    }
    return block.nextConnection;
  }

  // Ran out of next connections.
  return null;
}