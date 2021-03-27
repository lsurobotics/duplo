/**
 * @fileoverview Generates RAPID for sync blocks.
 */
'use strict';

goog.provide('Blockly.Rapid.sync');
goog.require('Blockly.Rapid');
goog.require('Blockly.constants');

Blockly.Rapid.sync.syncArray = [];  //array to hold sync variables

Blockly.Rapid['custom_wait'] = function (block) {  
  var syncVariable = "VAR syncident sync" + Blockly.Rapid.makeRapidName(block.id) + ";\n";  //compile all of the sync variables
  if (Blockly.Rapid.sync.syncArray.indexOf(syncVariable) === -1) Blockly.Rapid.sync.syncArray.push(syncVariable); //only push to syncArray if variable not already there
  var code = "WaitSyncTask sync" + Blockly.Rapid.makeRapidName(block.id) + ", task_list;\n";
  return code;
};

/**
 * This block will always be in the right workspace and thus
 * attached to the right arm.
 */
Blockly.Rapid['custom_follow'] = function(block) {
  var blockId = Blockly.Rapid.makeRapidName(block.id);
  var syncMoveOnVariable = `VAR syncident syncON${blockId};\n`;  //compile all of the sync variables
  var syncMoveOffVariable = `VAR syncident syncOFF${blockId};\n`;  //compile all of the sync variables
  if (Blockly.Rapid.sync.syncArray.indexOf(syncMoveOnVariable) === -1) Blockly.Rapid.sync.syncArray.push(syncMoveOnVariable); //only push to syncArray if variable not already there
  if (Blockly.Rapid.sync.syncArray.indexOf(syncMoveOffVariable) === -1) Blockly.Rapid.sync.syncArray.push(syncMoveOffVariable); //only push to syncArray if variable not already there
  var code = `SyncMoveOn syncON${blockId}, task_list;\n`;
  code += "LeftArmPos := CRobT(\\TaskName:=\"T_ROB_L\");\n";  //get left arms current position
  code += "RightArmPos := CRobT(\\TaskName:=\"T_ROB_R\");\n"; //get right arms current position

  var sharedRobTarget = Blockly.Rapid.robotArm.sharedTargetNames[block.id].target;  //get the name of the shared robtarget variable
  var targetSpeed = Blockly.Rapid.robotArm.sharedTargetNames[block.id].speed;  //get the name of the shared robtarget variable
  //trans for current right arm position so that it matches the movement of the left arm
  code += `RightArmPos.trans.x := RightArmPos.trans.x + (${sharedRobTarget}.trans.x - LeftArmPos.trans.x);\n`;
  code += `RightArmPos.trans.y := RightArmPos.trans.y + (${sharedRobTarget}.trans.y - LeftArmPos.trans.y);\n`;
  code += `RightArmPos.trans.z := RightArmPos.trans.z + (${sharedRobTarget}.trans.z - LeftArmPos.trans.z);\n`;
  code += `MoveL RightArmPos\\ID:=10, ${targetSpeed}, fine, Servo;\n`;
  code += `SyncMoveOff syncOFF${blockId};\n`;
  delete Blockly.Rapid.robotArm.sharedTargetNames[block.id];  //clean object out
  return code;
};

/**
 * This block will always be in the right workspace and thus
 * attached to the right arm.
 */
 Blockly.Rapid['custom_mirror'] = function(block) {
  var blockId = Blockly.Rapid.makeRapidName(block.id);
  var syncMoveOnVariable = `VAR syncident syncON${blockId};\n`;  //compile all of the sync variables
  var syncMoveOffVariable = `VAR syncident syncOFF${blockId};\n`;  //compile all of the sync variables
  if (Blockly.Rapid.sync.syncArray.indexOf(syncMoveOnVariable) === -1) Blockly.Rapid.sync.syncArray.push(syncMoveOnVariable); //only push to syncArray if variable not already there
  if (Blockly.Rapid.sync.syncArray.indexOf(syncMoveOffVariable) === -1) Blockly.Rapid.sync.syncArray.push(syncMoveOffVariable); //only push to syncArray if variable not already there
  var code = `SyncMoveOn syncON${blockId}, task_list;\n`;
  code += "LeftArmPos := CRobT(\\TaskName:=\"T_ROB_L\");\n";  //get left arms current position
  code += "RightArmPos := CRobT(\\TaskName:=\"T_ROB_R\");\n"; //get right arms current position

  var sharedRobTarget = Blockly.Rapid.robotArm.sharedTargetNames[block.id].target;  //get the name of the shared robtarget variable
  var targetSpeed = Blockly.Rapid.robotArm.sharedTargetNames[block.id].speed;  //get the name of the shared robtarget variable
  //trans for current right arm position so that it matches the movement of the left arm
  code += `RightArmPos.trans.x := RightArmPos.trans.x - (${sharedRobTarget}.trans.x - LeftArmPos.trans.x);\n`;
  code += `RightArmPos.trans.y := RightArmPos.trans.y - (${sharedRobTarget}.trans.y - LeftArmPos.trans.y);\n`;
  code += `RightArmPos.trans.z := RightArmPos.trans.z - (${sharedRobTarget}.trans.z - LeftArmPos.trans.z);\n`;
  code += `MoveL RightArmPos\\ID:=10, ${targetSpeed}, fine, Servo;\n`;
  code += `SyncMoveOff syncOFF${blockId};\n`;
  delete Blockly.Rapid.robotArm.sharedTargetNames[block.id];  //clean object out
  return code;
};


Blockly.Rapid['custom_sync'] = function(block) {
  var statements_begin_sync = Blockly.Rapid.statementToCode(block, 'BEGIN SYNC');
  // TODO: Assemble Rapid into code variable.
  console.log(statements_begin_sync);
  console.log(block.getDescendants(true));  //get ordered list of all blocks inside the statement, begins with statement block itself
  var code = '...;\n';
  return code;
};