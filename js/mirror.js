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
    }
    else if (primaryEvent.element == "dragStop") {
      if (fromLeft) rightWorkspace.addChangeListener(mirrorEvent);
      else leftWorkspace.addChangeListener(mirrorEvent);
    }
  }

  else if (primaryEvent instanceof Blockly.Events.BlockCreate || primaryEvent instanceof Blockly.Events.BlockMove) {
    var workspace = Blockly.Workspace.getById(primaryEvent.workspaceId);
    var block = workspace.getBlockById(primaryEvent.blockId);
    if (!block || block.type != "custom_close") {
      return; //only for synchronizing type
    }
    if (eventJustHappened(primaryEvent)) {
      return; //prevent infinite looping
    }
    //recreate event in other workspace
    var otherWorkspace = fromLeft ? rightWorkspace : leftWorkspace;

    //handle connecting on one side without a matching block
    if (primaryEvent instanceof Blockly.Events.BlockMove && !primaryEvent.newCoordinate && !otherWorkspace.getBlockById(primaryEvent.newParentId)) {
      primaryEvent.newParentId = null;
      primaryEvent.newCoordinate = block.getRelativeToSurfaceXY();
    }
    assignLastEventVariable(primaryEvent);

    var json = primaryEvent.toJson();
    var secondaryEvent = Blockly.Events.fromJson(json, otherWorkspace);
    secondaryEvent.run(true);
  }

  else if (primaryEvent instanceof Blockly.Events.Delete) {
    var workspace = Blockly.Workspace.getById(primaryEvent.workspaceId);
    var otherWorkspace = fromLeft ? rightWorkspace : leftWorkspace;
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
  }
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
    else if (event instanceof Blockly.Events.BlockMove) {
      if (event.newCoordinate && lastEvent.newCoordinate) {
        if (Math.round(event.newCoordinate.x) == Math.round(lastEvent.newCoordinate.x) && Math.round(event.newCoordinate.y) == Math.round(lastEvent.newCoordinate.y)) {
          return true;
        }
      }
      else if (event.newParent && lastEvent.newParent) {
        if (event.newParent.id == lastEvent.newParent.id) {
          return true;
        }
      }
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