// Injects Blockly into the html page and manages events there, creating a mirroring effect.

var toolbox = document.getElementById("toolbox");
var leftWorkspace = Blockly.inject('leftdiv',
    {media: 'blockly/media/',
     toolbox: toolbox,
     toolboxPosition: "start",
     move:{
        scrollbars: false,
        drag: false,
        wheel: false}
     });
var rightWorkspace = Blockly.inject('rightdiv',
    {media: 'blockly/media/',
    toolbox: toolbox,
    toolboxPosition: "end",
    move:{
        scrollbars: false,
        drag: false,
        wheel: false}
    });

var workspaceBlocks = document.getElementById("workspaceBlocks");
Blockly.Xml.domToWorkspace(workspaceBlocks, leftWorkspace);
Blockly.Xml.domToWorkspace(workspaceBlocks, rightWorkspace);
leftWorkspace.getAllBlocks().forEach(block => { block.setMovable(false); block.setDeletable(false); block.setEditable(false) });
rightWorkspace.getAllBlocks().forEach(block => { block.setMovable(false); block.setDeletable(false); block.setEditable(false) });

leftWorkspace.addChangeListener(mirrorEvent);
rightWorkspace.addChangeListener(mirrorEvent);
leftWorkspace.addChangeListener(listenForDragging);
rightWorkspace.addChangeListener(listenForDragging);


function mirrorEvent(primaryEvent) {
  var fromLeft = (primaryEvent.workspaceId == leftWorkspace.id);

  if (primaryEvent instanceof Blockly.Events.Ui) {
    //makes it so you can see dragging
    if (primaryEvent.element == "dragStart") {
      if (fromLeft) rightWorkspace.removeChangeListener(mirrorEvent);
      else leftWorkspace.removeChangeListener(mirrorEvent);

      //mirror dragging
      var otherWorkspace = fromLeft ? rightWorkspace : leftWorkspace;
      var otherBlock = otherWorkspace.getBlockById(primaryEvent.blockId);
      if (otherBlock && otherBlock.type == "custom_close") {
        startX = pageX;
        startY = pageY;
        offsetX = 0;
        offsetY = 0;
        dragger = new Blockly.BlockDragger(otherBlock, otherWorkspace);
        dragger.startBlockDrag(new Blockly.utils.Coordinate(0, 0), false);
        //the rest of this is handled the same way dragging across is handled
      }
    }
    else if (primaryEvent.element == "dragStop") {
      if (fromLeft) rightWorkspace.addChangeListener(mirrorEvent);
      else leftWorkspace.addChangeListener(mirrorEvent);
    }
  }

  else if (primaryEvent instanceof Blockly.Events.BlockCreate) {
    var workspace = Blockly.Workspace.getById(primaryEvent.workspaceId);
    var block = workspace.getBlockById(primaryEvent.blockId);
    if (!block || block.type != "custom_close") {
      return; //only for synchronizing type
    }
    //recreate event in other workspace
    var otherWorkspace = fromLeft ? rightWorkspace : leftWorkspace;
    var newBlock = otherWorkspace.newBlock(block.type, block.id);
    newBlock.initSvg();
    newBlock.render();
    newBlock.moveTo(block.getRelativeToSurfaceXY());
  }

  else if (primaryEvent instanceof Blockly.Events.BlockMove) {
    var workspace = Blockly.Workspace.getById(primaryEvent.workspaceId);
    var block = workspace.getBlockById(primaryEvent.blockId);
    if (!block || block.type != "custom_close") {
      return; //only for synchronizing type
    }
    //recreate event in other workspace
    var otherWorkspace = fromLeft ? rightWorkspace : leftWorkspace;
    var otherBlock = otherWorkspace.getBlockById(primaryEvent.blockId);

    Blockly.Events.disable();

    //handle connecting on one side without a matching block
    if (!primaryEvent.newCoordinate && !otherWorkspace.getBlockById(primaryEvent.newParentId)) {
      primaryEvent.newParentId = null;
      primaryEvent.newCoordinate = block.getRelativeToSurfaceXY();
    }

    if (primaryEvent.newCoordinate) {
      console.log(fromLeft);
      console.log(primaryEvent);
      otherBlock.moveTo(primaryEvent.newCoordinate);
    }

    Blockly.Events.enable();
  }

  else if (primaryEvent instanceof Blockly.Events.Delete) {
    var workspace = Blockly.Workspace.getById(primaryEvent.workspaceId);
    var otherWorkspace = fromLeft ? rightWorkspace : leftWorkspace;
    var otherBlock = otherWorkspace.getBlockById(primaryEvent.blockId); //block with same ID in other workspace
    if (!otherBlock) {
      return; //no matching block
    }
    if (otherBlock.type != "custom_close") {
      return; //only for synchronizing type
    }
    //delete block
    otherBlock.dispose();
  }
}