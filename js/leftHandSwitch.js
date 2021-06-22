var leftHandButton = document.getElementById('left-hand-switch-button');

leftHandButton.onclick = function(event) {
  const rightHandNoOp = "MODULE MainModule\nPROC main()\nSetLeadThrough \\On \\NoStopMove;\nENDPROC\nENDMODULE";

  var leftHandOpen = "MODULE MainModule\n";
  leftHandOpen += ServoGripper;
  leftHandOpen += "PROC main()\n";
  leftHandOpen += "Var bool isCalibrated := FALSE;\n";
  leftHandOpen += "SetLeadThrough \\On \\NoStopMove;\n";
  leftHandOpen += "isCalibrated := g_IsCalibrated();\n";
  leftHandOpen += "IF isCalibrated = FALSE THEN\n";
  leftHandOpen += "g_Init \\Calibrate;\n";
  leftHandOpen += "ENDIF\n";
  leftHandOpen += "g_GripOut;\n";
  leftHandOpen += "g_Stop;\n";
  leftHandOpen += "ENDPROC\n";
  leftHandOpen += "ENDMODULE\n";

  //if robot is not already moving
  if(controllerState != controllerExecutionState.RUNNING){

    if (leftHandButton.value == "open-hand") {
    //logic to open left hand gripper
    /* Submit the code for the left hand */
    //window.chrome.webview.postMessage('T_ROB_L');
    window.chrome.webview.postMessage('T_ROB_R'); //inverted due to workspace/arm inversion
    window.chrome.webview.postMessage(leftHandOpen);
    /* Submit the code for the right hand */
    //window.chrome.webview.postMessage('T_ROB_R');
    window.chrome.webview.postMessage('T_ROB_L'); //inverted due to workspace/arm inversion
    window.chrome.webview.postMessage(rightHandNoOp);

    $("#left-hand-switch-button").text("Close Left");
    leftHandButton.value = "close-hand";
    //if both the same value then set both gripper button to match
    if(rightHandButton.value == "close-hand"){
      $("#left-right-hand-switch-button").text("Close Both");
      bothHandsButton.value = "close-hand";
    }
  }
  else if(leftHandButton.value == "close-hand"){
    //logic to close left hand gripper
    /* Submit the code for the left hand */
    //window.chrome.webview.postMessage('T_ROB_L');
    window.chrome.webview.postMessage('T_ROB_R'); //inverted due to workspace/arm inversion
    //change left hand open logic so that gripper is closed
    var leftHandClose = leftHandOpen.replace("g_GripOut;\ng_Stop;\n", "g_GripIn;\n");
    window.chrome.webview.postMessage(leftHandClose);
    /* Submit the code for the right hand */
    //window.chrome.webview.postMessage('T_ROB_R');
    window.chrome.webview.postMessage('T_ROB_L'); //inverted due to workspace/arm inversion
    window.chrome.webview.postMessage(rightHandNoOp);

    $("#left-hand-switch-button").text("Open Left");
    leftHandButton.value = "open-hand";
    //if both the same value then set both gripper button to match
    if(rightHandButton.value == "open-hand"){
      $("#left-right-hand-switch-button").text("Open Both");
      bothHandsButton.value = "open-hand";
    }
  }
  /* Start execution */
  window.chrome.webview.postMessage('START_EXEC');
  }      
}