//enum for the controller state
const controllerExecutionState = {
    RUNNING: "Running",
    STOPPED: "Stopped",
    UNKNOWN: "Unknown"
};
Object.freeze(controllerExecutionState);

var controllerState = controllerExecutionState.UNKNOWN; //on program start initialize controller state to unknown

//an event listener for the execution state of the robot controller
window.chrome.webview.addEventListener('message', executionStatusChangedEvent);

//handler for the execution state listener. Sets the state of the controller contained
//in the controllerState variable which the buttons will check before registering a user press.
//function also ensures that the execution button state always matches the robots state
function executionStatusChangedEvent(event){
    var executionButton;
    
    if(event.data == controllerExecutionState.RUNNING){
        controllerState = controllerExecutionState.RUNNING;
        //if start button is visible then change to stop
        executionButton = document.getElementById('execution-button');
        if(executionButton.value == "start-execution"){
            executionButton.value = "stop-execution";
            $("#execution-button").removeClass("btn-success").addClass("btn-danger");
            $("#execution-button").text("Stop");
        } 
    } 
    else if(event.data == controllerExecutionState.STOPPED){
        controllerState = controllerExecutionState.STOPPED;
        //if stop button is visible then change to start
        executionButton = document.getElementById('execution-button');
        if(executionButton.value == "stop-execution"){
            executionButton.value = "start-execution";
            $("#execution-button").removeClass("btn-danger").addClass("btn-success");
            $("#execution-button").text("Start"); 
        }
    }
    else if(event.data == controllerExecutionState.UNKNOWN){
        controllerState = controllerExecutionState.UNKNOWN;
        alert("Controller execution status unknown. Please examine.");
    } 
  } 