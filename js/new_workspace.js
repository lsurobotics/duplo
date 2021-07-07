var resetButton = document.getElementById('reload-button');

resetButton.onclick = function() {
  window.chrome.webview.postMessage("CLEAR_LOGS");
  location.reload();
}