// Manages events concerning the dragging of blocks, allowing blocks to travel from one side to another.

var leftDiv = document.getElementById("left-workspace");
var rightDiv = document.getElementById("right-workspace");

var draggingId = null; //the ID of the block being dragged, or null if there is no such block
var draggingWorkspace = null; //the ID of the workspace dragged in

// Keeps track of which block is being dragged & cleans up afterwards.
function listenForDragging(event) {
  if (event instanceof Blockly.Events.Ui) {
    if (event.element == "dragStart") {
      draggingId = event.blockId;
      draggingWorkspace = event.workspace;
    }
    else if (event.element == "dragStop") {
      if (event.oldValue[0].workspace) event.oldValue[0].select();
      unhighlightAll();
      draggingId = null;
      draggingWorkspace = null;
    }
  }
}

// Enable transferring block from one side to another
Blockly.bindEvent_(leftDiv, "touchenter", null, (evt) => transferBlock(evt, false));
Blockly.bindEvent_(leftDiv, "mouseenter", null, (evt) => transferBlock(evt, false)); //simulate for computer mice
Blockly.bindEvent_(rightDiv, "touchenter", null, (evt) => transferBlock(evt, true));
Blockly.bindEvent_(rightDiv, "mouseenter", null, (evt) => transferBlock(evt, true));

var dragger;            // The object managing a manually manipulated drag.
var startX, startY;     // The coordinates of the block before it's dragged (the old pageX/pageY coords)
var offsetX, offsetY;   // The offset the block should appear right & down from its original coords when dragged, e.g. -17 to shift it up 17

function transferBlock(event, fromLeft) {
  if (!draggingId) return;

  var fromWorkspace = workspace(fromLeft);
  var toWorkspace = workspace(!fromLeft);
  var blocks = getAllConnections(fromWorkspace.getBlockById(draggingId));
  var widest = 0;

  //protect from transferring mirror blocks
  if (!blocks) return;
  for (var i = 0; i < blocks.length; i++) {
    if (isMirrored(blocks[i])) return;
    widest = Math.max(widest, blocks[i].width);
  }

  offsetX = fromLeft ? 0 : -leftWorkspace.getToolbox().width - widest;
  offsetY = -17;

  //basically Blockly.BlockSvg.prototype.toCopyData() except it copies all connected blocks
  var xml = Blockly.Xml.blockToDom(blocks[0], true);
  xml.setAttribute('x', event.offsetX);
  xml.setAttribute('y', event.offsetY);
  xml.setAttribute("id", blocks[0].id);

  //paste & start dragging
  blocks.forEach((block) => block.dispose());
  toWorkspace.paste(xml);
  newTopBlock = toWorkspace.getBlockById(blocks[0].id);

  dragger = new Blockly.BlockDragger(newTopBlock, toWorkspace);
  dragger.startBlockDrag(new Blockly.utils.Coordinate(0, 0), false);
  startX = event.pageX;
  startY = event.pageY;

  draggingId = null;
}

// Returns an array of all the blocks attached to this block, including the block itself.
function getAllConnections(block) {
  if (!block) return null;

  var blocks = [block,];
  block.getChildren().forEach((block) => { blocks = blocks.concat(getAllConnections(block)) });
  return blocks;
}

Blockly.bindEvent_(document.body, "touchmove", null, (evt) => updateCoordinates(evt));
Blockly.bindEvent_(document.body, "mousemove", null, (evt) => updateCoordinates(evt));

var pageX, pageY;
function updateCoordinates(event) {
  pageX = event.pageX;
  pageY = event.pageY;

  if (dragger) dragger.dragBlock(event, new Blockly.utils.Coordinate(pageX - startX + offsetX, pageY - startY + offsetY));
}

Blockly.bindEvent_(document.body, "touchup", null, (evt) => stopDragging(evt));
Blockly.bindEvent_(document.body, "mouseup", null, (evt) => stopDragging(evt));

function stopDragging(event) {
  if (dragger) {
    dragger.endBlockDrag(event, new Blockly.utils.Coordinate(pageX - startX + offsetX, pageY - startY + offsetY));
    dragger.dispose();
    dragger = null;
    pauseBump();
  }
}


// Blockly's default unhightlight function can't undo any more than the last highlight (acts more like a static method); this deals with strange leftover highlights.
function unhighlight(node) {
  node.childNodes.forEach((child) => {
    if (Blockly.utils.dom.hasClass(child, "blocklyHighlightedConnectionPath")) Blockly.utils.dom.removeNode(child);
  });
}

function unhighlightAll() {
  leftWorkspace.getAllBlocks().forEach((block) => {
    unhighlight(block.svgGroup_);
  });
  rightWorkspace.getAllBlocks().forEach((block) => {
    unhighlight(block.svgGroup_);
  });
}



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