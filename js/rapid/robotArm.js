'use strict';

goog.provide('Blockly.Rapid.robotArm');
goog.require('Blockly.Rapid');

Blockly.Rapid.robotArm.sharedTargetNames = {};  //robtarget instructions that must be shared across tasks

Blockly.Rapid['error_action'] = function (block) {
    var code = block.getFieldValue('HANDLE')
    return [code, Blockly.Rapid.ORDER_ATOMIC];
}

Blockly.Rapid['error_signal'] = function (block) {
    var code = block.getFieldValue('SIGNAL')
    return [code, Blockly.Rapid.ORDER_ATOMIC];
}

Blockly.Rapid['error_rewind'] = function (block) {
    var code = block.getFieldValue('STEPS')
    return [code, Blockly.Rapid.ORDER_ATOMIC];
}

Blockly.Rapid['continue'] = function (block) {
    return ["ignore error!", Blockly.Rapid.ORDER_ATOMIC];
}

Blockly.Rapid['custom_move'] = function (block) {
  var target = "";
  var code = "";

  var move_speed = block.getFieldValue('SPEED');
  var speed = "v100";
  switch (move_speed) {
    case "QUICK":
      speed = "v1000";
      break;
    case "MODERATE":
      speed = "v500";
      break;
    case "SLOW":
      speed = "v100";
      break;
    default:
      break;
  }

  /**
   * If the move block is located in the left workspace, this conditional
   * determines if there is a block in the right workspace with its same block.id.
   * This means that a custom follow block was mirrored to the right workspace.
   * Therefore a wait sync instruction should be inserted at the top of the code
   * for custom_follow implementation.
   */
  var otherBlock = workspace(block.workspace == rightWorkspace).getBlockById(block.id);
  if((block.workspace.id == leftWorkspace.id) && (otherBlock != null)){    
    //I am in the left workspace AND found a mirrored block on right
    //create your wait sync instruction and matching sync variable
    var syncVariable = "VAR syncident sync" + Blockly.Rapid.makeRapidName(block.id) + ";\n";  //compile all of the sync variables
    if (Blockly.Rapid.sync.syncArray.indexOf(syncVariable) === -1) Blockly.Rapid.sync.syncArray.push(syncVariable); //only push to syncArray if variable not already there
    code = "WaitSyncTask sync" + Blockly.Rapid.makeRapidName(block.id) + ", task_list;\n";
    //create your target instruction
    target = Blockly.Rapid.variableDB_.getName(block.getFieldValue('LOCATION'), Blockly.Variables.NAME_TYPE);
    code += `MoveL ${target}, ${speed}, fine, Servo;\n`;  //MoveL because arms will move together
    //push shared target name into object so that mirrored custom_follow block on right can find it
    //so that right workspace custom_follow blocks can check their id against the obj keys and get target name and speed
    Blockly.Rapid.robotArm.sharedTargetNames[block.id] = {"target":target, "speed":speed};        
  }else { 
    //I am either in the left workspace but did NOT find a mirrored block on right OR I am in the right workspace
    //and mirroring doesn't matter to me
    target = Blockly.Rapid.variableDB_.getName(block.getFieldValue('LOCATION'), Blockly.Variables.NAME_TYPE);
    code = `MoveJ ${target}, ${speed}, fine, Servo;\n`;
  }

  return code;
};
