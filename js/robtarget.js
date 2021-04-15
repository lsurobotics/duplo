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
      delete leftArmRobTargets[event.oldName];  //delete old variable name from rob targets object
    } 
    else if (event.workspaceId == rightWorkspace.id){
      rightArmVariableRenamed = true; //true if triggered from the right workspace
      arm = "RIGHT";
      delete rightArmRobTargets[event.oldName];  //delete old variable name from rob targets object      
    } 
    
    newVariableName = event.newName;  //so get position function knows which variable to put target to

    $('#position-modal').modal('show'); //show teach position modal
    var position_modal_warning = document.getElementById("position-modal-warning");
    position_modal_warning.innerHTML = `Please move <b>${arm}</b> arm to the desired position.`;
  }

  /**
   * Event listener for teach position modal cancel button
   */
  document.getElementById("position-modal-cancel-button").addEventListener("click", canceledModal);
  function canceledModal() {
    var arm;
    if (leftArmVariableRenamed) arm = "LEFT";
    else if (rightArmVariableRenamed) arm = "RIGHT";
    alert(`WARNING: ${newVariableName} location may move robot to an unwanted position. Consider deleting or reteaching!`);   
    window.chrome.webview.postMessage(`UPDATE_${arm}_ARM_POSITION`);  //still need a robtarget to go with variable name
  };

  /**
   * Event listener for teach position modal confirm teach position button
   */
  document.getElementById("position-modal-confirm-button").addEventListener("click", confirmedModal);
  function confirmedModal() {
    var arm;
    if (leftArmVariableRenamed) arm = "LEFT";
    else if (rightArmVariableRenamed) arm = "RIGHT";     
    $('#position-modal').modal('hide');
    window.chrome.webview.postMessage(`UPDATE_${arm}_ARM_POSITION`);
  };


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