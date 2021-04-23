'use strict';

goog.provide('Blockly.Rapid.robotArm');
goog.require('Blockly.Rapid');
goog.require('robtarget');

Blockly.Rapid.robotArm.sharedTargetNames = {};  //robtarget instructions that must be shared across tasks
Blockly.Rapid.robotArm.leftArmRobTargetsScrubbed = {}; //these are the scrubbed robot targets that match those scrubbed in the generator
Blockly.Rapid.robotArm.rightArmRobTargetsScrubbed = {}; //these are the scrubbed robot targets that match those scrubbed in the generator

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

  //check to ensure that the user has actually taught a position into the block. If not then set warning and return
  if (block.getField('LOCATION').variable_.name == block.getField('LOCATION').defaultVariableName) {
    block.setWarningText("Block should have a teach position selected!"); //warn user they need to set the variable name of this block
    return "!ERROR!\n"; //block does not generate code, return !ERROR!
  }

  var target = Blockly.Rapid.variableDB_.getName(block.getFieldValue('LOCATION'), Blockly.Variables.NAME_TYPE); //returns the scrubbed variable name
  var unscrubbedTargetName = block.getField('LOCATION').variable_.name; //get the unscrubbed variable name for replacing of the key in the unscrubbed robot target object

  //match the scrubbed variable name with the unscrubbed one and then add robtarget position to the scrubbed variable name for code generation
  if(block.workspace.id == leftWorkspace.id){    
    target = `${target}_L`;  //in left workspace so append _L to target for move instruction
    Blockly.Rapid.robotArm.leftArmRobTargetsScrubbed[target] = leftArmRobTargets[unscrubbedTargetName];  //reassign object key so target definitions match with move instruction targets
  } 
  else if(block.workspace.id == rightWorkspace.id){
    target = `${target}_R`;  //in right workspace so append _R to target for move instruction
    Blockly.Rapid.robotArm.rightArmRobTargetsScrubbed[target] = rightArmRobTargets[unscrubbedTargetName];  //reassign object key so target definitions match with move instruction targets
  } 

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
   * This means that a custom follow or custom mirror block was mirrored to the right workspace.
   * Therefore a wait sync instruction should be inserted at the top of the code
   * for custom_follow/custom_mirror implementation. This implementation only works if
   * left arm code is generated BEFORE right arm code in index.html
   */
  var otherBlock = workspace(block.workspace == rightWorkspace).getBlockById(block.id);
  if((block.workspace.id == leftWorkspace.id) && (otherBlock != null)){    
    //I am in the left workspace AND found a mirrored block on right
    //create your wait sync instruction and matching sync variable
    var blockId = Blockly.Rapid.makeRapidName(block.id);
    var syncMoveOnVariable = `VAR syncident syncON${blockId};\n`;  //compile all of the sync variables
    var syncMoveOffVariable = `VAR syncident syncOFF${blockId};\n`;  //compile all of the sync variables
    if (Blockly.Rapid.sync.syncArray.indexOf(syncMoveOnVariable) === -1) Blockly.Rapid.sync.syncArray.push(syncMoveOnVariable); //only push to syncArray if variable not already there
    if (Blockly.Rapid.sync.syncArray.indexOf(syncMoveOffVariable) === -1) Blockly.Rapid.sync.syncArray.push(syncMoveOffVariable); //only push to syncArray if variable not already there
    var code = `SyncMoveOn syncON${blockId}, task_list;\n`;
    //create your target instruction
    //code += `ConfL \\Off;\n`;
    code += `MoveL ${target}\\ID:=10, ${speed}, fine, Servo;\n`;  //MoveL because arms will move together
    //code += `ConfL \\On;\n`;
    code += `SyncMoveOff syncOFF${blockId};\n`;
    //push shared target name into object so that mirrored custom_follow block on right can find it
    //so that right workspace custom_follow blocks can check their id against the obj keys and get target name and speed
    Blockly.Rapid.robotArm.sharedTargetNames[block.id] = {"target":target, "speed":speed};        
  }else { 
    //I am either in the left workspace but did NOT find a mirrored block on right OR I am in the right workspace
    //and mirroring doesn't matter to me
    code = `MoveJ ${target}, ${speed}, fine, Servo;\n`;
  }

  return code;
};
