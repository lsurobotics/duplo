'use strict';

goog.provide('Blockly.Rapid.run');
goog.require('Blockly.Rapid');


Blockly.Rapid['custom_start'] = function (block) {
    // The run block represents the main function of the program.
    // However, the function's statements are siblings of the block, rather than children.
    // The scrub_ method in the generator needs an exception for this block, or else the sibling
    // blocks will be included twice.

    /**
     * Procedure to check for proper calibration of the gripper needs to be included at 
     * the top of the module, so it is added in here.
     */
    const enableLeadThrough = "SetLeadThrough \\On \\NoStopMove;\n";    //command to enable lead through when execution is halted
    const leftArmPos = "VAR robtarget LeftArmPos;\n"; //used to find current position of left arm
    const rightArmPos = "VAR robtarget RightArmPos;\n";   //used to find current position of right arm

    var CalibrateGripper = "Var bool isCalibrated := FALSE;\n";
    CalibrateGripper    += "isCalibrated := g_IsCalibrated();\n";
    CalibrateGripper    += "IF isCalibrated = FALSE THEN\n";
    CalibrateGripper    += "  g_Init \\Calibrate;\n";
    CalibrateGripper    += "ENDIF\n";

    return "PROC main()\n" + leftArmPos + rightArmPos + enableLeadThrough;// + CalibrateGripper;
};
