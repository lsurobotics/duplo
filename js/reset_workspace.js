var resetButton = document.getElementById('home-button');    

resetButton.onclick = function() {
  
  //rightHome and leftHome are inverted to account for inverted workspace
  var rightHome = leftHomePosition;  //home position defined in robtarget.js
  var leftHome = rightHomePosition;  //defined in robtarget.js

  var leftArmReset = "MODULE MainModule\n";
  leftArmReset += `CONST robtarget home:=${leftHome};\n`;
  leftArmReset += ServoGripper;
  leftArmReset += "PROC main()\n";
  leftArmReset += "Var bool isCalibrated := FALSE;\n";
  leftArmReset += "SetLeadThrough \\On \\NoStopMove;\n";
  leftArmReset += "isCalibrated := g_IsCalibrated();\n";
  leftArmReset += "IF isCalibrated = FALSE THEN\n";
  leftArmReset += "g_Init \\Calibrate;\n";
  leftArmReset += "ENDIF\n";      
  leftArmReset += "g_GripOut;\n";
  leftArmReset += "g_Stop;\n";
  leftArmReset += "MoveJ home, v100, fine, Servo;\n"
  leftArmReset += "ENDPROC\n";
  leftArmReset += "ENDMODULE\n";

  //if robot is not already moving
  if(controllerState != controllerExecutionState.RUNNING){
    /* Submit the code for the left hand */
    window.chrome.webview.postMessage('T_ROB_L');
    window.chrome.webview.postMessage(leftArmReset.replace(ServoGripper, CameraServoGripper));  //left arm has camera gripper
    /* Submit the code for the right hand */
    var rightArmReset = leftArmReset.replace(leftHome, rightHome);
    window.chrome.webview.postMessage('T_ROB_R');
    window.chrome.webview.postMessage(rightArmReset);
    
    /* Start execution */
    window.chrome.webview.postMessage('START_EXEC');

    //set both gripper buttons to close since the grippers are opened on reset
    $("#left-hand-switch-button").text("Close Left");
    leftHandButton.value = "close-hand";
    $("#right-hand-switch-button").text("Close Right");
    rightHandButton.value = "close-hand";
    $("#left-right-hand-switch-button").text("Close Both");
    bothHandsButton.value = "close-hand";
  }      
}