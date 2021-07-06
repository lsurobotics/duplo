// Injects Blockly into the html page and adds event handlers.

const toolbox = document.getElementById("toolbox");

const fontStyle = {
  "size": 14
}

goog.require('Blockly.Theme');
const prototypeTheme = Blockly.Theme.defineTheme('prototype-theme', {
  'base': Blockly.Themes.Classic,
  'fontStyle': fontStyle,
});

const leftWorkspace = Blockly.inject('left-workspace',
  { media: 'blockly/media/',
    toolbox: toolbox,
    trashcan: false,
    theme: prototypeTheme,
    toolboxPosition: "start",
    move:{
      scrollbars: true,
      drag: false,
      wheel: false}
});

const rightWorkspace = Blockly.inject('right-workspace',
  { media: 'blockly/media/',
    trashcan: true,
    theme: prototypeTheme,
    move:{
      scrollbars: true,
      drag: false,
      wheel: false}
});


/**
 * Generally, `workspace(fromLeft)` chooses the workspace that the event originated from, while `workspace(!fromLeft)` chooses the workspace on the other side.
 * @param {boolean} chooseLeft Whether you want the left (`true`) or right (`false`) workspace.
 */
function workspace(chooseLeft) {
  return chooseLeft ? leftWorkspace : rightWorkspace;
}

var workspaceBlocks = document.getElementById("workspaceBlocks");
Blockly.Xml.domToWorkspace(workspaceBlocks, leftWorkspace);
Blockly.Xml.domToWorkspace(workspaceBlocks, rightWorkspace);
leftWorkspace.getAllBlocks().forEach(block => { block.setMovable(false); block.setDeletable(false); block.setEditable(false) });
rightWorkspace.getAllBlocks().forEach(block => { block.setMovable(false); block.setDeletable(false); block.setEditable(false) });

leftWorkspace.createVariable("Home Position");
rightWorkspace.createVariable("Home Position");

leftWorkspace.addChangeListener(mirrorEvent);
rightWorkspace.addChangeListener(mirrorEvent);
leftWorkspace.addChangeListener(listenForDragging);
rightWorkspace.addChangeListener(listenForDragging);
leftWorkspace.addChangeListener(listenForVariable); //listener for variable changes
rightWorkspace.addChangeListener(listenForVariable); //listener for variable changes
leftWorkspace.addChangeListener(monitorLeftWorkspace);
rightWorkspace.addChangeListener(monitorRightWorkspace);

setupScrollingTouchHandlers();