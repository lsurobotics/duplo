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
 */
function variableDeleteEvent_(event) {
    if (event.workspaceId == leftWorkspace.id) delete leftArmRobTargets[event.varName];
    else if (event.workspaceId == rightWorkspace.id) delete rightArmRobTargets[event.varName];
  }

/**
 * Called on RENAME event
 */
function variableRenameEvent_(event) {
    var arm = "";

    if (event.workspaceId == leftWorkspace.id){
      leftArmVariableRenamed = true; //true if triggered from the left workspace
      arm = "LEFT";
      delete leftArmRobTargets[event.oldName];  //delete old variable name from rob targets array
    } 
    else if (event.workspaceId == rightWorkspace.id){
      rightArmVariableRenamed = true; //true if triggered from the right workspace
      arm = "RIGHT";
      delete rightArmRobTargets[event.oldName];  //delete old variable name from rob targets array
    } 
    
    newVariableName = event.newName;  //so get position function knows which variable to put target to
    alert(`Please move ${arm} arm to the desired position.`);
    window.chrome.webview.postMessage(`UPDATE_${arm}_ARM_POSITION`);
  }

  //register listener for message from host app and pass event to handler
  //receives a new robtarget for both arms from the host app when the Ok button is pressed
  window.chrome.webview.addEventListener('message', robTargetsReceivedEvent);
  
  function robTargetsReceivedEvent(event){
    
    if(event.data === ""){  //if message received is empty string then an error occurred so delete varName
      if(leftArmVariableRenamed) delete leftArmRobTargets[newVariableName];        
      else if(rightArmVariableRenamed) delete rightArmRobTargets[newVariableName];          
    }else{  //else set robtarget to specified variable name
      if(leftArmVariableRenamed) leftArmRobTargets[newVariableName] = event.data;        
      else if(rightArmVariableRenamed) rightArmRobTargets[newVariableName] = event.data;       
    }
    //clear everything
    leftArmVariableRenamed = false;
    rightArmVariableRenamed = false;
    newVariableName = "";
  } 