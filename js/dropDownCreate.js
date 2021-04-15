/**
 * This function is contained in blockly/core/field_variable.js
 * It creates the field variable dropdown and the function is being
 * adjusted for the YUMI use case here.
 */

/**
 * Return a sorted list of variable names for variable dropdown menus.
 * Include a special option at the end for creating a new variable name.
 * @return {!Array.<!Array>} Array of variable names/id tuples.
 * @this {Blockly.FieldVariable}
 */
 Blockly.FieldVariable.dropdownCreate = function() {
    if (!this.variable_) {
      throw Error('Tried to call dropdownCreate on a variable field with no' +
          ' variable selected.');
    }
    var name = this.getText();  //gets the currently selected variable within the block
    var variableModelList = [];
    if (this.sourceBlock_ && this.sourceBlock_.workspace) {
      var variableTypes = this.getVariableTypes_();
      // Get a copy of the list, so that adding rename and new variable options
      // doesn't modify the workspace's list.
      for (var i = 0; i < variableTypes.length; i++) {
        var variableType = variableTypes[i];
        var variables =
          this.sourceBlock_.workspace.getVariablesOfType(variableType);
        variableModelList = variableModelList.concat(variables);
      }
    }
    variableModelList.sort(Blockly.VariableModel.compareByName);
  
    var options = [];
    for (var i = 0; i < variableModelList.length; i++) {
      // Set the UUID as the internal representation of the variable.
      options[i] = [variableModelList[i].name, variableModelList[i].getId()];
    }
    options.push([Blockly.Msg['RENAME_VARIABLE'], Blockly.RENAME_VARIABLE_ID]); //will be "Reteach Location"
    if (Blockly.Msg['DELETE_VARIABLE']) {
      options.push(
          [
            Blockly.Msg['DELETE_VARIABLE'].replace('%1', name),
            Blockly.DELETE_VARIABLE_ID
          ]
      );
    }

    /*
    THE FOR LOOP IS WHAT HAS BEEN CHANGED IN THIS FUNCTION!
    If a new block is deployed then the default variable name will be contained in the dropdown list.
    this loop searches through the elements of the dropdown list looking for a match with the default. 
    if found, it removes that element from the drop down. It also removes the delete option so that if
    the selected variable name matches the default variable name. This means it is a new block and the
    user should only see a prompt for creating a 'New Location' within the variable dropdown
    */
    for(var i = 0; i < options.length; i++){
      if(options[i][0] == this.defaultVariableName){
        options.splice(i, 1); //splice out default variable name from list
        //if the default variable is selected you know block was just deployed so adjust dropdown accordingly
        if(name == this.defaultVariableName){
          for(var j = 0; j < options.length; j++){
            if(options[j][1] == Blockly.DELETE_VARIABLE_ID) options.splice(j, 1); //delete "delete variable option"
            else if(options[j][1] == Blockly.RENAME_VARIABLE_ID) options[j][0] = Blockly.Msg['RENAME_VARIABLE'].replace('Reteach', "New");
          }
        }
        break;      
      }
    } 
  
    return options;
  };
  