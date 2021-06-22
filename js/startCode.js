var executionButton = document.getElementById('start-button');

executionButton.onclick = function() {
  if (executionButton.value == "start-execution") {        
    //this task list needs to be defined for sync instructions
    const task_list = "PERS tasks task_list{2} := [ [\"T_ROB_L\"], [\"T_ROB_R\"] ];\n";
    var leftTargets = "";
    var rightTargets = "";
    /**
     * Pull code together for left arm
    */
    Blockly.Rapid.init(leftWorkspace);  //have to initialize both workspaces
    var leftCode = Blockly.Rapid.blockToCode(leftWorkspace.getBlockById("START"));  //compile blocks to Rapid
    
    //pulls the robtargets for the left arm out and add it's targets to the rightArm list
    for (const [key, value] of Object.entries(Blockly.Rapid.robotArm.leftArmRobTargetsScrubbed)) {
      leftTargets += `PERS robtarget ${key}:=${value};\n`;
      rightTargets += `PERS robtarget ${key};\n`;
    }       
    
    var leftAndRightSyncVars = Blockly.Rapid.sync.syncArray.join(''); //join syncArray variable string definitions together for code insertion (MUST BE DONE AFTER BLOCKS ARE COMPILED)
    /* Prepare the "body" of the module */
    var left_arm_code = "MODULE MainModule\n" + leftTargets + ServoGripper + task_list + leftAndRightSyncVars + leftCode + "ENDPROC\nENDMODULE";

    /**
     * Pull code together for the right arm
    */
    //have to initialize both workspaces
    Blockly.Rapid.init(rightWorkspace);
    var rightCode = Blockly.Rapid.blockToCode(rightWorkspace.getBlockById("START"));  //compile blocks to Rapid
    
    //pulls the robtargets for the right arm out
    for (const [key, value] of Object.entries(Blockly.Rapid.robotArm.rightArmRobTargetsScrubbed)) {
      rightTargets += `PERS robtarget ${key}:=${value};\n`;
    }
    
    var right_arm_code = "MODULE MainModule\n" + rightTargets + CameraServoGripper + task_list + leftAndRightSyncVars + rightCode + "ENDPROC\nENDMODULE";

    /**
     * We have to clear the sync variable array. Because the array gets rebuilt
     * each time the blocks are recompiled, this ensures that only the blocks within
     * the current workspace are included.
    */
    Blockly.Rapid.sync.syncArray.length = 0;  //clear but keep original array reference
    Blockly.Rapid.robotArm.leftArmRobTargetsScrubbed = {};
    Blockly.Rapid.robotArm.rightArmRobTargetsScrubbed = {};

    /* Submit the code for the left arm */
    window.chrome.webview.postMessage('T_ROB_L');
    //window.chrome.webview.postMessage(left_arm_code);
    window.chrome.webview.postMessage(right_arm_code);  //right arm code sent to left to account for switched workspace/arm perspectives
    
    /* Submit the code for the right arm */
    window.chrome.webview.postMessage('T_ROB_R');
    //window.chrome.webview.postMessage(right_arm_code);
    window.chrome.webview.postMessage(left_arm_code); //left arm code sent to right to account for switched workspace/arm perspectives

    /* Start execution */
    window.chrome.webview.postMessage('START_EXEC');
  } else if(executionButton.value == "stop-execution") {
    window.chrome.webview.postMessage('STOP_EXEC');
  }
};