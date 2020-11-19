// Injects Blockly into the html page and adds event handlers.

var toolbox = document.getElementById("toolbox");
var leftWorkspace = Blockly.inject('left-workspace',
  { media: 'blockly/media/',
    toolbox: toolbox,
    trashcan: false,
    toolboxPosition: "start",
    move:{
      scrollbars: false,
      drag: false,
      wheel: false}
});
var rightWorkspace = Blockly.inject('right-workspace',
  { media: 'blockly/media/',
    trashcan: true,
    move:{
      scrollbars: false,
      drag: false,
      wheel: false}
});

//Generally, workspace(fromLeft) chooses the workspace that the event originated from, while workspace(!fromLeft) chooses the workspace on the other side.
function workspace(chooseLeft) {
  return chooseLeft ? leftWorkspace : rightWorkspace;
}

var workspaceBlocks = document.getElementById("workspaceBlocks");
Blockly.Xml.domToWorkspace(workspaceBlocks, leftWorkspace);
Blockly.Xml.domToWorkspace(workspaceBlocks, rightWorkspace);
leftWorkspace.getAllBlocks().forEach(block => { block.setMovable(false); block.setDeletable(false); block.setEditable(false) });
rightWorkspace.getAllBlocks().forEach(block => { block.setMovable(false); block.setDeletable(false); block.setEditable(false) });

leftWorkspace.addChangeListener(mirrorEvent);
rightWorkspace.addChangeListener(mirrorEvent);
leftWorkspace.addChangeListener(listenForDragging);
rightWorkspace.addChangeListener(listenForDragging);