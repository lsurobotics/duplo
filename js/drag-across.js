// Manages events concerning the dragging of blocks, allowing blocks to travel from one side to another.

var leftDiv = document.getElementById("leftdiv");
var rightDiv = document.getElementById("rightdiv");

var draggingId = null; //the ID of the block being dragged, or null if there is no such block

// Keeps track of which block is being dragged & cleans up afterwards.
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
Blockly.bindEvent_(leftDiv, "touchenter", null, (evt) => transferBlock(evt, false));
Blockly.bindEvent_(leftDiv, "mouseenter", null, (evt) => transferBlock(evt, false)); //simulate for computer mice
Blockly.bindEvent_(rightDiv, "touchenter", null, (evt) => transferBlock(evt, true));
Blockly.bindEvent_(rightDiv, "mouseenter", null, (evt) => transferBlock(evt, true));

var dragger;            // The object managing a manually manipulated drag.
var startX, startY;     // The coordinates of the block before it's dragged (the old pageX/pageY coords)
var offsetX, offsetY;   // The offset the block should appear right & down from its original coords when dragged, e.g. -17 to shift it up 17

function transferBlock(event, fromLeft) {
  if (!draggingId) return;

  var fromWorkspace = fromLeft ? leftWorkspace : rightWorkspace;
  var toWorkspace = fromLeft ? rightWorkspace : leftWorkspace;
  var blocks = getAllConnections(fromWorkspace.getBlockById(draggingId));
  var widest = 0;

  //protect from transferring mirror blocks
  if (!blocks) return;
  for (var i = 0; i < blocks.length; i++) {
    if (mirroredBlocks.includes(blocks[i].type)) return;
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