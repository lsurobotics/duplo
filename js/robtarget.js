'use strict';

goog.provide('robtarget');

var leftHomePosition = "[[420.32,227.3,254.83],[0.182073,0.917623,0.347217,0.0652473],[0,-2,0,5],[-121.253,9E9,9E9,9E9,9E9,9E9]]";
var rightHomePosition = "[[430.31,-234.88,249.53],[0.0681575,0.324735,0.925899,0.180592],[0,0,0,4],[121.995,9E9,9E9,9E9,9E9,9E9]]";

var leftArmRobTargets = {"Home Position" : leftHomePosition};
var rightArmRobTargets = {"Home Position" : rightHomePosition};
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
    /**
     * NOTE! <somewhere> is hard coded. It is the defaultVariableName. This is the fastest way to do this.
     * The teach position modal should popup if a new block is deployed, meaning default variable name is
     * triggering the rename event. Otherwise this event is just a rename on an already named variable and
     * the teach modal should not pop up. The reteach modal is used for already named variable position alterations.
     */
    if(event.oldName == "<somewhere>"){      
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
      $('#position-modal').attr('data-value', 'new-position');
      $("#position-modal-warning").html(`Please move <b>${arm}</b> arm to the desired position.`)
    }else{  //adjust key to new variable name
      if (event.workspaceId == leftWorkspace.id){
        leftArmRobTargets[event.newName] = leftArmRobTargets[event.oldName];
        delete leftArmRobTargets[event.oldName];  //delete old variable name from rob targets object
      } 
      else if (event.workspaceId == rightWorkspace.id){
        rightArmRobTargets[event.newName] = rightArmRobTargets[event.oldName];
        delete rightArmRobTargets[event.oldName];  //delete old variable name from rob targets object      
      } 
    }    
  }

  /**
   * Event listener for teach position modal cancel button
   */
  document.getElementById("position-modal-cancel-button").addEventListener("click", canceledModal);
  function canceledModal() {
    if($('#position-modal').attr('data-value') == "new-position"){
      var arm;
      const options = {once : true};
      if (leftArmVariableRenamed) arm = "LEFT";
      else if (rightArmVariableRenamed) arm = "RIGHT";
      alert(`WARNING: ${newVariableName} location may move robot to an unwanted position. Consider deleting or reteaching!`);
      //register listener for message from host app and pass event to handler
      //receives a new robtarget for both arms from the host app when the Ok button is pressed
      window.chrome.webview.addEventListener('message', robTargetsReceivedEvent, options);    
      window.chrome.webview.postMessage(`UPDATE_${arm}_ARM_POSITION`);  //still need a robtarget to go with variable name
    }
  };

  /**
   * Event listener for teach position modal confirm teach position button
   */
  document.getElementById("position-modal-confirm-button").addEventListener("click", confirmedModal);
  function confirmedModal() {
    if($('#position-modal').attr('data-value') == "new-position"){
      var arm;
      const options = {once : true};
      if (leftArmVariableRenamed) arm = "LEFT";
      else if (rightArmVariableRenamed) arm = "RIGHT";     
      $('#position-modal').modal('hide');
      //register listener for message from host app and pass event to handler
      //receives a new robtarget for both arms from the host app when the Ok button is pressed
      window.chrome.webview.addEventListener('message', robTargetsReceivedEvent, options);
      window.chrome.webview.postMessage(`UPDATE_${arm}_ARM_POSITION`);
    }else if($('#position-modal').attr('data-value') == "reteach-position"){
      var arm;
      const options = {once : true};
      if (renameVariableWorkspace == leftWorkspace.id) arm = "LEFT";
      else if (renameVariableWorkspace == rightWorkspace.id) arm = "RIGHT";     
      $('#position-modal').modal('hide');
      //register listener for message from host app and pass event to handler
      //receives a new robtarget for both arms from the host app when the Ok button is pressed
      window.chrome.webview.addEventListener('message', reteachRobTargetsReceivedEvent, options);
      window.chrome.webview.postMessage(`UPDATE_${arm}_ARM_POSITION`);
    }    
  };

  //callback function for receiving of arm positions as robot targets
  //called when user requests a new position teach and position modal data-attribute is set to "new-position" 
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


  //callback function for receiving of arm positions as robot targets
  //called when user requests a reteach and position modal data-attribute is set to "reteach-position" 
  function reteachRobTargetsReceivedEvent(event){    
    if(event.data !== ""){  //if message received is empty string then an error occurred so leave position alone. Otherwise adjust
      if(renameVariableWorkspace == leftWorkspace.id) leftArmRobTargets[selectedVariable] = event.data;     //selectedVariable comes from variablePrompt.js   
      else if(renameVariableWorkspace == rightWorkspace.id) rightArmRobTargets[selectedVariable] = event.data;   //selectedVariable comes from variablePrompt.js        
    }
  }