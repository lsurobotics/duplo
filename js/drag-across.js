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

  blocks = getAllFamily(toWorkspace.getBlockById(blocks[0].id));
  clearVariables(blocks, toWorkspace); //check blocks array for variables from opposite workspace and reset if necessary

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

/**
 * Checks each block for the LOCATION field and sets the variable within
 * that field to the default variable name if it is set to something else.
 * This keeps variables from one workspace being transferred into the other.
 * Also deletes any carried over variables from the previous workspace. Makes
 * an exception for the "Home Position" variable.
 */
function clearVariables(blocks, toWorkspace){
  var field;
  var variablesToDelete = [];
  var variableList = toWorkspace.getAllVariables(); //get array of variables contained in workspace
  //search each block for field named LOCATION
  blocks.forEach(function(block){
    field = block.getField("LOCATION");
    //if field is found this means it is a custom move block
    if(field !== null){
      //if the default variable name is not selected in the block AND Home Position variable is not selected
      var currentSelection = field.variable_;
      if((field.defaultVariableName !== currentSelection.name) && (currentSelection.name !== "Home Position")){
        //if default variable is present in the workspace
        var obj = variableList.find(o => o.name === field.defaultVariableName)
        //default variable is present in workspace so just set field value to it
        if(obj !== undefined){
          field.setValue(obj.id_);  //set the field to the default
        //default variable not present so create and set field to it
        }else{          
          var defaultVariable = toWorkspace.createVariable(field.defaultVariableName);  //create the default variable in the workspace
          field.setValue(defaultVariable.id_);  //set the field to the default
        }
        variablesToDelete.push(currentSelection.id_); //save id of variables that will need deleted after forEach loop is done                
      }
    }
  });
  variablesToDelete.forEach((variableId) => toWorkspace.deleteVariableById(variableId));  //delete carried over variable from the new workspace
}