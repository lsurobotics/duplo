// Manages events concerning the dragging of blocks, allowing blocks to travel from one side to another.

var draggingId = null;

function listenForDragging(event) {
  if (event instanceof Blockly.Events.Ui) {
    if (event.element == "dragStart") {
      draggingId = event.blockId;
    }
    else if (event.element == "dragStop") {
      draggingId = null;
    }
  }
}

//enable transfering block from one side to another
var leftDiv = document.getElementById("leftdiv");
var rightDiv = document.getElementById("rightdiv");
Blockly.bindEvent_(leftDiv, "touchenter", null, (evt) => transferBlock(evt, false));
Blockly.bindEvent_(leftDiv, "mouseenter", null, (evt) => transferBlock(evt, false)); //simulate for computer mice
Blockly.bindEvent_(rightDiv, "touchenter", null, (evt) => transferBlock(evt, true));
Blockly.bindEvent_(rightDiv, "mouseenter", null, (evt) => transferBlock(evt, true));

var dragger, startX, startY, offsetX, offsetY;
function transferBlock(event, fromLeft) {
  if (!draggingId) return;

  var fromWorkspace = fromLeft ? leftWorkspace : rightWorkspace;
  var toWorkspace = fromLeft ? rightWorkspace : leftWorkspace;
  var blocks = getAllConnections(fromWorkspace.getBlockById(draggingId));
  var widest = 0;

  //protect from transferring mirror blocks
  if (!blocks) return;
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].type == "custom_close") return;
    widest = Math.max(widest, blocks[i].width);
  }

  offsetX = fromLeft ? 0 : -130 - widest; //get toolbox width instead of 130?
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


Blockly.bindEvent_(leftDiv, "touchmove", null, (evt) => updateCoordinates(evt));
Blockly.bindEvent_(leftDiv, "mousemove", null, (evt) => updateCoordinates(evt));
Blockly.bindEvent_(rightDiv, "touchmove", null, (evt) => updateCoordinates(evt));
Blockly.bindEvent_(rightDiv, "mousemove", null, (evt) => updateCoordinates(evt));

var pageX, pageY;
function updateCoordinates(event) {
  pageX = event.pageX;
  pageY = event.pageY;

  if (dragger) dragger.dragBlock(event, new Blockly.utils.Coordinate(pageX - startX + offsetX, pageY - startY + offsetY));
}

Blockly.bindEvent_(leftDiv, "touchup", null, (evt) => stopDragging(evt));
Blockly.bindEvent_(leftDiv, "mouseup", null, (evt) => stopDragging(evt));
Blockly.bindEvent_(rightDiv, "touchup", null, (evt) => stopDragging(evt));
Blockly.bindEvent_(rightDiv, "mouseup", null, (evt) => stopDragging(evt));

function stopDragging(event) {
  if (dragger) {
    dragger.endBlockDrag(event, new Blockly.utils.Coordinate(pageX - startX + offsetX, pageY - startY + offsetY));
    dragger.dispose();
    dragger = null;
  }
}