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