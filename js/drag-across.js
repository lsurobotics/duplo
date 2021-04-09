// Manages events concerning the dragging of blocks, allowing blocks to travel from one side to another.

const leftDiv = document.getElementById("left-workspace");
const rightDiv = document.getElementById("right-workspace");

/**
 * The ID of the block being dragged, or null if there is no such block.
 */
var draggingId = null;

/**
 * Keeps track of which block is being dragged & cleans up on drag end.
 */
function listenForDragging(event) {
  if (event instanceof Blockly.Events.Ui) {
    if (event.element == "dragStart") {
      draggingId = event.blockId;
    }
    else if (event.element == "dragStop") {
      if (event.oldValue[0].workspace) event.oldValue[0].select();
      unhighlightAll();
      draggingId = null;
    }
  }
}

// Enable transferring block from one side to another
Blockly.bindEvent_(leftDiv, "touchenter", null, (evt) => transferBlock_(evt, false));
Blockly.bindEvent_(leftDiv, "mouseenter", null, (evt) => transferBlock_(evt, false)); //simulate for computer mice
Blockly.bindEvent_(rightDiv, "touchenter", null, (evt) => transferBlock_(evt, true));
Blockly.bindEvent_(rightDiv, "mouseenter", null, (evt) => transferBlock_(evt, true));

var dragger;            // The object managing a manually manipulated drag.
var startX, startY;     // The coordinates of the block before it's dragged (the old pageX/pageY coords)
var offsetX, offsetY;   // The offset the block should appear right & down from its original coords when dragged, e.g. -17 to shift it up 17

/**
 * Transfers the block currently being dragged from one side to the other if it should be.
 * @param {Event} event The normal (non-Blockly wrapped) mouse/touch event to base the coordinates upon.
 */
function transferBlock_(event, fromLeft) {
  if (!draggingId) return;

  var fromWorkspace = workspace(fromLeft);
  var toWorkspace = workspace(!fromLeft);
  var blocks = getAllFamily(fromWorkspace.getBlockById(draggingId));
  var widest = 0;

  //protect from transferring mirror blocks
  if (!blocks) return;
  for (let i = 0; i < blocks.length; i++) {
    if (isMirrored(blocks[i])) return;
    widest = Math.max(widest, blocks[i].width);
  }

  var metrics = toWorkspace.getMetrics(); //check if workspace has been scrolled

  offsetX = fromLeft ? 0 : -leftWorkspace.getToolbox().width - widest;
  offsetY = -17;

  //basically Blockly.BlockSvg.prototype.toCopyData() except it copies all connected blocks
  var xml = Blockly.Xml.blockToDom(blocks[0], true);
  xml.setAttribute('x', event.offsetX + metrics.viewLeft);  //account for scrolling
  xml.setAttribute('y', event.offsetY + metrics.viewTop);   //account for scrolling
  xml.setAttribute("id", blocks[0].id);

  //paste & start dragging
  blocks.forEach((block) => block.dispose());
  toWorkspace.paste(xml);
  newTopBlock = toWorkspace.getBlockById(blocks[0].id);

  dragger = new Blockly.BlockDragger(newTopBlock, toWorkspace);
  dragger.startBlockDrag(new Blockly.utils.Coordinate(0, 0), false);
  startX = event.pageX;
  startY = event.pageY;
}

/**
 * Returns an array of all the blocks attached to this block, including the block itself while not including its ancestors.
 */
function getAllFamily(block) {
  if (!block) return null;

  var blocks = [block];
  block.getChildren().forEach((block) => { blocks = blocks.concat(getAllFamily(block)) });
  return blocks;
}

Blockly.bindEvent_(document.body, "touchmove", null, (evt) => updateCoordinates_(evt));
Blockly.bindEvent_(document.body, "mousemove", null, (evt) => updateCoordinates_(evt));

var pageX, pageY;
function updateCoordinates_(event) {
  pageX = event.pageX;
  pageY = event.pageY;

  if (dragger) dragger.dragBlock(event, new Blockly.utils.Coordinate(pageX - startX + offsetX, pageY - startY + offsetY));
}

Blockly.bindEvent_(document.body, "touchup", null, (evt) => stopDragging_(evt));
Blockly.bindEvent_(document.body, "mouseup", null, (evt) => stopDragging_(evt));

function stopDragging_(event) {
  if (dragger) {
    dragger.endBlockDrag(event, new Blockly.utils.Coordinate(pageX - startX + offsetX, pageY - startY + offsetY));
    dragger.dispose();
    dragger = null;
  }
}


/**
 * Physically removes highlights from the DOM on this node.
 * @param {SVGGElement} node
 */
function unhighlight(node) {
  node.childNodes.forEach((child) => {
    if (Blockly.utils.dom.hasClass(child, "blocklyHighlightedConnectionPath")) Blockly.utils.dom.removeNode(child);
  });
}

/**
 * Blockly's default unhightlight function can't undo any more than the last highlight (acts more like a static method).
 * This deals with strange leftover highlights on all blocks.
 */
function unhighlightAll() {
  leftWorkspace.getAllBlocks().forEach((block) => {
    unhighlight(block.svgGroup_);
  });
  rightWorkspace.getAllBlocks().forEach((block) => {
    unhighlight(block.svgGroup_);
  });
}