var rightHandButton = document.getElementById('right-hand-switch-button');

rightHandButton.onclick = function(event) {
  const leftHandNoOp = "MODULE MainModule\nPROC main()\nSetLeadThrough \\On \\NoStopMove;\nENDPROC\nENDMODULE";

  var rightHandOpen = "MODULE MainModule\n";
  rightHandOpen += CameraServoGripper;
  rightHandOpen += "PROC main()\n";
  rightHandOpen += "Var bool isCalibrated := FALSE;\n";
  rightHandOpen += "SetLeadThrough \\On \\NoStopMove;\n";
  rightHandOpen += "isCalibrated := g_IsCalibrated();\n";
  rightHandOpen += "IF isCalibrated = FALSE THEN\n";
  rightHandOpen += "g_Init \\Calibrate;\n";
  rightHandOpen += "ENDIF\n";
  rightHandOpen += "g_GripOut;\n";
  rightHandOpen += "g_Stop;\n";
  rightHandOpen += "ENDPROC\n";
  rightHandOpen += "ENDMODULE\n";

  //if robot is not already moving
  if(controllerState != controllerExecutionState.RUNNING){

      if (rightHandButton.value == "open-hand") {        
      //logic to open right hand gripper
      /* Submit the code for the left hand */
      //window.chrome.webview.postMessage('T_ROB_L');
      window.chrome.webview.postMessage('T_ROB_R'); //inverted due to arm/workspace inversion
      window.chrome.webview.postMessage(leftHandNoOp);
      /* Submit the code for the right hand */
      //window.chrome.webview.postMessage('T_ROB_R');
      window.chrome.webview.postMessage('T_ROB_L'); //inverted due to arm/workspace inversion
      window.chrome.webview.postMessage(rightHandOpen);

      $("#right-hand-switch-button").text("Close Right");
      rightHandButton.value = "close-hand";
      //if both the same value then set both gripper button to match
      if(leftHandButton.value == "close-hand"){
          $("#left-right-hand-switch-button").text("Close Both");
          bothHandsButton.value = "close-hand";
      }
    } else if(rightHandButton.value == "close-hand"){        
      //logic to close right hand gripper
      /* Submit the code for the left hand */
      //window.chrome.webview.postMessage('T_ROB_L');
      window.chrome.webview.postMessage('T_ROB_R'); //inverted due to arm/workspace inversion
      window.chrome.webview.postMessage(leftHandNoOp);
      /* Submit the code for the right hand */
      //window.chrome.webview.postMessage('T_ROB_R');
      window.chrome.webview.postMessage('T_ROB_L'); //inverted due to arm/workspace inversion
      //change right hand open logic so that gripper is closed
      var rightHandClose = rightHandOpen.replace("g_GripOut;\ng_Stop;\n", "g_GripIn;\n");;
      window.chrome.webview.postMessage(rightHandClose);

      $("#right-hand-switch-button").text("Open Right");
      rightHandButton.value = "open-hand";
      //if both the same value then set both gripper button to match
      if(leftHandButton.value == "open-hand"){
          $("#left-right-hand-switch-button").text("Open Both");
          bothHandsButton.value = "open-hand";
      }
    }
    /* Start execution */
    window.chrome.webview.postMessage('START_EXEC');
  }      
}