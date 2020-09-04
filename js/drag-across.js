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
  var block = fromWorkspace.getBlockById(draggingId);

  if (!block || block.type == "custom_close") return; //no need to transfer mirroring blocks

  block.dispose(false);

  var newBlock = toWorkspace.newBlock(block.type, draggingId);
  newBlock.initSvg();
  newBlock.render();
  newBlock.select();
  startX = fromLeft ? 100 : -300;
  startY = 0;
  offsetX = fromLeft ? 0 : -130 - newBlock.width; //get toolbox width instead of 130?
  offsetY = -17;
  newBlock.moveBy(event.offsetX + startX, event.offsetY + startY);

  dragger = new Blockly.BlockDragger(newBlock, toWorkspace);
  dragger.startBlockDrag(new Blockly.utils.Coordinate(0, 0), false);
  startX += event.pageX;
  startY += event.pageY;

  draggingId = null;
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
    console.log("DONE");
  }
}