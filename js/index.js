// Injects Blockly into the html page and manages events there, creating a mirroring effect.

var toolbox = document.getElementById("toolbox");
var leftWorkspace = Blockly.inject('leftdiv',
    {media: 'blockly/media/',
     toolbox: toolbox,
     trashcan: false,
     toolboxPosition: "start",
     move:{
        scrollbars: false,
        drag: false,
        wheel: false}
     });
var rightWorkspace = Blockly.inject('rightdiv',
    {media: 'blockly/media/',
    trashcan: true,
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

/* Mirror blocks across workspaces (mirror.js) */
// Since the toolbox will be available only in the left workspace,
// we just listen to create block events on the left workspace.
leftWorkspace.addChangeListener(createBlockEvent);
// Since the trashcan will be available only in the right workspace,
// we just listen to delete block events on the right workspace.
rightWorkspace.addChangeListener(deleteBlockEvent);
// For the movement of blocks, we listen in both workspaces.
leftWorkspace.addChangeListener(moveBlockEvent);
rightWorkspace.addChangeListener(moveBlockEvent);

/* Drag blocks across workspaces (drag-across.js) */
leftWorkspace.addChangeListener(listenForDragging);
rightWorkspace.addChangeListener(listenForDragging);
