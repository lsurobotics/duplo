
var rename_variable_callback;   //stores the callback reference for the variable prompt
var renameVariableWorkspace;    //stores workspace id that variable is being renamed in. comes from dropdowncreate function

/**
 * Wrapper to window.prompt() that app developers may override to provide
 * alternatives to the modal browser window. Built-in browser prompts are
 * often used for better text input experience on mobile device. We strongly
 * recommend testing mobile when overriding this.
 * @param {string} message The message to display to the user.
 * @param {string} defaultValue The value to initialize the prompt with.
 * @param {!function(?string)} callback The callback for handling user response.
 */
Blockly.prompt = function(message, defaultValue, callback) {

  //if it is a Rename variable prompt use this modal else use default prompt
  if(message.includes("Rename")){
    $('#variable-prompt-modal').modal('show'); //show teach position modal
    $("#variable-prompt-modal-warning").html("Name your location:").css("color", "black");
    $("#variable-name-input").val(defaultValue);
    $("#variable-name-input").focus();
    rename_variable_callback = callback;  //store reference to callback for later use
  }else{
    callback(prompt(message, defaultValue));
  }
  
};

/**
   * Event listener for variable prompt modal cancel button
   */
 document.getElementById("variable-prompt-modal-cancel-button").addEventListener("click", canceledModal);
 function canceledModal() {
   rename_variable_callback(null);
 };

 /**
  * Event listener for variable prompt modal confirm rename button
  */
 document.getElementById("variable-prompt-modal-confirm-button").addEventListener("click", confirmedModal);
 function confirmedModal() {
    var workspaceVariables;
    var inputVal = $("#variable-name-input").val(); //get form input

    //get all variables within the workspace that the dropdown was created in
    if (renameVariableWorkspace == leftWorkspace.id) workspaceVariables = leftWorkspace.getAllVariables();
    else if(renameVariableWorkspace == rightWorkspace.id) workspaceVariables = rightWorkspace.getAllVariables();

    //if user is trying to overwrite an already named variable do not close modal and allow them to do it
    if(workspaceVariables.find(o => o.name.toLowerCase() === inputVal.toLowerCase())){
        $("#variable-prompt-modal-warning").html("Location name already exists!").css("color", "red");
        $("#variable-name-input").trigger("focus");
    } 
    else{
        $('#variable-prompt-modal').modal('hide');
        rename_variable_callback(inputVal);
    }    
 };



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
    renameVariableWorkspace = this.sourceBlock_.workspace.id;   //CHANGED! store workspace id where variable is being changed. used to check user input against workspace variables
    return options;
  };
  