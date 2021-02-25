var leftArmRobTargets = {};
var rightArmRobTargets = {};
var leftArmVariableRenamed = false;
var rightArmVariableRenamed = false;
var newVariableName = "";

/**
 * Redirects variable delete and rename events.
 */
function listenForVariable(event) {  
    //redirect
    if (event.type == Blockly.Events.VAR_DELETE) variableDeleteEvent_(event);
    else if (event.type == Blockly.Events.VAR_RENAME) variableRenameEvent_(event);        
  }
 
/**
 * Called on DELETE event
 * Delete event does not get triggered if user renames a variable
 * This causes old robtargets and positions to not get deleted out of
 * RobTargets object. A simple fix probably.
 */
function variableDeleteEvent_(event) {
    if (event.workspaceId == leftWorkspace.id) delete leftArmRobTargets[event.varName];
    else if (event.workspaceId == rightWorkspace.id) delete rightArmRobTargets[event.varName];
  }

/**
 * Called on RENAME event
 */
function variableRenameEvent_(event) {
    if (event.workspaceId == leftWorkspace.id) leftArmVariableRenamed = true; //true if triggered from the left workspace
    else if (event.workspaceId == rightWorkspace.id) rightArmVariableRenamed = true; //true if triggered from the right workspace
    
    newVariableName = event.newName;  //so get position function knows which variable to put target to
    alert("Please move the arm to the desired position.");
    window.chrome.webview.postMessage('UPDATE_ARM_POSITION');
  }

  //register listener for message from host app and pass event to handler
  //receives a new robtarget for both arms from the host app when the ARMS button is pressed
  window.chrome.webview.addEventListener('message', robTargetsReceivedEvent);
  
  function robTargetsReceivedEvent(event){
    var leftArmPosition;
    var rightArmPosition;

    var arms = event.data.split('\n'); //split into left arm and right arm because host sends both arm targets as a string
    arms.forEach(function(arm) {  //parse out robtarget and assign to correct arm
      var temp = arm.split(':');
      if(temp[0]=="ROB_L") leftArmPosition = temp[1];
      else if(temp[0]=="ROB_R") rightArmPosition = temp[1]; 
    });

    if(leftArmVariableRenamed){
      leftArmRobTargets[newVariableName] = leftArmPosition;
      leftArmVariableRenamed = false;
    }else if(rightArmVariableRenamed){
      rightArmRobTargets[newVariableName] = rightArmPosition;
      rightArmVariableRenamed = false;
    }

    newVariableName = "";
  }

  