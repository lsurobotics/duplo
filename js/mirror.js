// Injects Blockly into the html page and manages events there, creating a mirroring effect.

var toolbox = document.getElementById("toolbox");
var leftWorkspace = Blockly.inject('leftdiv',
    {media: '../../media/',
     toolbox: toolbox,
     toolboxPosition: "start",
     trashcan: false,
     move:{
        scrollbars: false,
        drag: false,
        wheel: false}
     });
var rightWorkspace = Blockly.inject('rightdiv',
    {media: '../../media/',
    toolbox: toolbox,
    toolboxPosition: "end",
    trashcan: false,
    move:{
        scrollbars: false,
        drag: false,
        wheel: false}
    });

var workspaceBlocks = document.getElementById("workspaceBlocks");
Blockly.Xml.domToWorkspace(workspaceBlocks, leftWorkspace);
Blockly.Xml.domToWorkspace(workspaceBlocks, rightWorkspace);
leftWorkspace.getAllBlocks().forEach(block => block.setMovable(false));
rightWorkspace.getAllBlocks().forEach(block => block.setMovable(false));

leftWorkspace.addChangeListener(mirrorEvent);
rightWorkspace.addChangeListener(mirrorEvent);


function mirrorEvent(primaryEvent) {
  console.log(primaryEvent.type);
  if (primaryEvent instanceof Blockly.Events.Ui) {
    //makes it so you can see dragging
    if (primaryEvent.element == "dragStart") {
      if (primaryEvent.workspaceId == leftWorkspace.id) {
        rightWorkspace.removeChangeListener(mirrorEvent);
      } else {
        leftWorkspace.removeChangeListener(mirrorEvent);
      }
    }
    else if (primaryEvent.element == "dragStop") {
      if (primaryEvent.workspaceId == leftWorkspace.id) {
        rightWorkspace.addChangeListener(mirrorEvent);
      } else {
        leftWorkspace.addChangeListener(mirrorEvent);
      }
    }
  }
  else if (primaryEvent instanceof Blockly.Events.BlockCreate || primaryEvent instanceof Blockly.Events.BlockMove) {
    var workspace = Blockly.Workspace.getById(primaryEvent.workspaceId);
    var block = workspace.getBlockById(primaryEvent.blockId);
    if (block.type != "custom_close") {
      return; //only for synchronizing type
    }
    if (eventJustHappened(primaryEvent)) {
      return; //prevent infinite looping
    }
    assignLastEventVariable(primaryEvent);
    //recreate event in other workspace
    var otherWorkspace = (workspace == leftWorkspace) ? rightWorkspace : leftWorkspace;
    var json = primaryEvent.toJson();
    var secondaryEvent = Blockly.Events.fromJson(json, otherWorkspace);
    secondaryEvent.run(true);
  }
  else if (primaryEvent instanceof Blockly.Events.Delete) {
    var workspace = Blockly.Workspace.getById(primaryEvent.workspaceId);
    var otherWorkspace = (workspace == leftWorkspace) ? rightWorkspace : leftWorkspace;
    var block = otherWorkspace.getBlockById(primaryEvent.blockId); //block with same ID in other workspace
    if (block == null) {
      return; //no matching block
    }
    if (block.type != "custom_close") {
      return; //only for synchronizing type
    }
    //delete block
    var json = primaryEvent.toJson();
    var secondaryEvent = Blockly.Events.fromJson(json, otherWorkspace);
    secondaryEvent.run(true);
  } //TODO: "move" event where block A connects to a block and block B mirrors its location (right now, block B has nothing to connect to)
}

var lastLeftCreateEvent, lastRightCreateEvent, lastLeftMoveEvent, lastRightMoveEvent;

// Returns true if this action has just been done in the other workspace and you are attempting to loop back onto the original workspace.
function eventJustHappened(event) {
  var workspace = Blockly.Workspace.getById(event.workspaceId);
  var isInLeft = workspace == leftWorkspace;
  //make sure this event hasn't just been done
  var lastEvent;
  if (event instanceof Blockly.Events.Create) {
    lastEvent = isInLeft ? lastRightCreateEvent : lastLeftCreateEvent;
  } else { //Blockly.Events.Move
    lastEvent = isInLeft ? lastRightMoveEvent : lastLeftMoveEvent;
  }
  if (lastEvent != null) {
    if (event.group == lastEvent.group) {
      return true;
    }
  }
  return false;
}

// Assigns the new event to the event stored that corresponds to the new event, e.g. lastLeftCreateEvent.
function assignLastEventVariable(event) {
  var workspace = Blockly.Workspace.getById(event.workspaceId);
  var isInLeft = workspace == leftWorkspace;
  if (event instanceof Blockly.Events.Create) {
    if (isInLeft) { lastLeftCreateEvent = event; }
    else { lastRightCreateEvent = event; }
  } else { //Blockly.Events.Move
    if (isInLeft) { lastLeftMoveEvent = event; }
    else { lastRightMoveEvent = event; }
  }
}