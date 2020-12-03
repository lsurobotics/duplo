/**
 * @fileoverview Generates RAPID for sync blocks.
 */
'use strict';

goog.provide('Blockly.Rapid.sync');
goog.require('Blockly.Rapid');
goog.require('Blockly.constants');


Blockly.Rapid['custom_wait'] = function (block) {
  var syncident = "VAR syncident sync" + block.id + ";\n";
  var sync = "WaitSyncTask sync" + block.id + ", task_list;\n";
  return syncident + sync;
};