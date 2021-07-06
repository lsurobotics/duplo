var saveButton = document.getElementById('save-button');

saveButton.onclick = function() {
  var leftWorkspace_xml = Blockly.Xml.workspaceToDom(leftWorkspace);
  var leftWorkspace_xml_text = Blockly.Xml.domToPrettyText(leftWorkspace_xml);

  var rightWorkspace_xml = Blockly.Xml.workspaceToDom(rightWorkspace);
  var rightWorkspace_xml_text = Blockly.Xml.domToPrettyText(rightWorkspace_xml);
            
  //compile all relevant info into a json object and send to cs
  var file = {
    "leftWorkspace_xml_text" : leftWorkspace_xml_text,
    "rightWorkspace_xml_text" : rightWorkspace_xml_text,
    "leftArmRobTargets" : leftArmRobTargets,
    "rightArmRobTargets" : rightArmRobTargets
  }

  //means this is a user desired save
  if($('#save-button').val() == "save-by-name"){
    file = JSON.stringify(file, undefined, 4); 
   
    window.chrome.webview.postMessage('SAVE_FILE');
    window.chrome.webview.postMessage(file);
    window.chrome.webview.postMessage('END_SAVE');
      
    const options = {once : true};
    window.chrome.webview.addEventListener('message', saveFilenameReceivedEvent, options);
  //means this is an autosave  
  }else if($('#save-button').val() == "autosave"){
    file["autosave"] = true;  //set autosave key to true so that wpf knows this is an autosave by searching for it on wpf side
    file = JSON.stringify(file, undefined, 4);

    window.chrome.webview.postMessage('SAVE_FILE');
    window.chrome.webview.postMessage(file);
    window.chrome.webview.postMessage('END_SAVE');

    $('#save-button').val("save-by-name"); //change button value back to save-by-name
  }   
}

function saveFilenameReceivedEvent(event){
  if(event.data != "SAVE_FILE_ERROR" && event.data != "SAVE_CANCELLED"){
    var filename_display = document.getElementById("workspace-filename");
    filename_display.innerHTML = `${event.data}`;
  }
}