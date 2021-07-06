var bothHandsButton = document.getElementById('left-right-hand-switch-button');

bothHandsButton.onclick = function(event) {

  var openHand = "MODULE MainModule\n";
  openHand += ServoGripper;
  openHand += "PROC main()\n";
  openHand += "Var bool isCalibrated := FALSE;\n";
  openHand += "SetLeadThrough \\On \\NoStopMove;\n";
  openHand += "isCalibrated := g_IsCalibrated();\n";
  openHand += "IF isCalibrated = FALSE THEN\n";
  openHand += "g_Init \\Calibrate;\n";
  openHand += "ENDIF\n";
  openHand += "g_GripOut;\n";
  openHand += "g_Stop;\n";
  openHand += "ENDPROC\n";
  openHand += "ENDMODULE\n";

  //if robot is not already moving
  if(controllerState != controllerExecutionState.RUNNING){      

    if (bothHandsButton.value == "open-hand") {        
      //logic to open grippers
      /* Submit the code for the left hand */
      window.chrome.webview.postMessage('T_ROB_L');
      window.chrome.webview.postMessage(openHand.replace(ServoGripper, CameraServoGripper));  //left arm has camera gripper
      /* Submit the code for the right hand */
      window.chrome.webview.postMessage('T_ROB_R');
      window.chrome.webview.postMessage(openHand);

      $("#left-right-hand-switch-button").text("Close Both");
      bothHandsButton.value = "close-hand";
      $("#left-hand-switch-button").text("Close Left");
      leftHandButton.value = "close-hand";
      $("#right-hand-switch-button").text("Close Right");
      rightHandButton.value = "close-hand";          
  } else if(bothHandsButton.value == "close-hand"){
      var closeHand = openHand.replace("g_GripOut;\ng_Stop;\n", "g_GripIn;\n");       
      //logic to close grippers
      /* Submit the code for the left hand */
      window.chrome.webview.postMessage('T_ROB_L');
      window.chrome.webview.postMessage(closeHand.replace(ServoGripper, CameraServoGripper)); //left arm has camera gripper
      /* Submit the code for the right hand */
      window.chrome.webview.postMessage('T_ROB_R');        
      window.chrome.webview.postMessage(closeHand);

      $("#left-right-hand-switch-button").text("Open Both");
      bothHandsButton.value = "open-hand";
      $("#left-hand-switch-button").text("Open Left");
      leftHandButton.value = "open-hand";
      $("#right-hand-switch-button").text("Open Right");
      rightHandButton.value = "open-hand";          
  }
  /* Start execution */
  window.chrome.webview.postMessage('START_EXEC');
  }      
}