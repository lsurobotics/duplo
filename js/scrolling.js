/**
 * This contains the overrided functions which account
 * for scrolling adjustments. E.g. when one workspace is 
 * scrolled, it's movement is calculated and the other workspace's
 * vertical scrollbar is set to match.
 */

/**
 * Release the scrollbar handle and reset state accordingly.
 * @private
 */
 Blockly.Scrollbar.prototype.onMouseUpHandle_ = function() {
  scrollTogether(this.workspace_);  //this function added. ONLY CHANGE!

  // Tell the workspace to clean up now that the workspace is done moving.
  this.workspace_.resetDragSurface();
  Blockly.Touch.clearTouchIdentifier();
  this.cleanUp_();
};


/**
 * Scroll by one pageful.
 * Called when scrollbar background is clicked.
 * @param {!Event} e Mouse down event.
 * @private
 */
Blockly.Scrollbar.prototype.onMouseDownBar_ = function(e) {
  this.workspace_.markFocused();
  Blockly.Touch.clearTouchIdentifier();  // This is really a click.
  this.cleanUp_();
  if (Blockly.utils.isRightButton(e)) {
    // Right-click.
    // Scrollbars have no context menu.
    e.stopPropagation();
    return;
  }
  var mouseXY = Blockly.utils.mouseToSvg(e,
      this.workspace_.getParentSvg(),
      this.workspace_.getInverseScreenCTM());
  var mouseLocation = this.horizontal_ ? mouseXY.x : mouseXY.y;

  var handleXY = Blockly.utils.getInjectionDivXY_(this.svgHandle_);
  var handleStart = this.horizontal_ ? handleXY.x : handleXY.y;
  var handlePosition = this.handlePosition_;

  var pageLength = this.handleLength_ * 0.95;
  if (mouseLocation <= handleStart) {
    // Decrease the scrollbar's value by a page.
    handlePosition -= pageLength;
  } else if (mouseLocation >= handleStart + this.handleLength_) {
    // Increase the scrollbar's value by a page.
    handlePosition += pageLength;
  }

  this.setHandlePosition(this.constrainHandle_(handlePosition));

  this.onScroll_();
  e.stopPropagation();
  e.preventDefault();

  scrollTogether(this.workspace_);  //this function added. ONLY CHANGE!
};


/**
 * Function for setting the scroll bar handles of one workspace
 * relative to another.
 */
function scrollTogether(thisWorkspace) {
  var otherWorkspace = workspace(thisWorkspace == rightWorkspace);

  var yourMetrics = thisWorkspace.getMetrics();
  var otherMetrics = otherWorkspace.getMetrics();

  var newScrollX = (yourMetrics.viewLeft - otherMetrics.contentLeft); //adjust x scroll to match
  var newScrollY = (yourMetrics.viewTop - otherMetrics.contentTop);   //adjust y scroll to match

  otherWorkspace.scrollbar.set(newScrollX, newScrollY);
}

// Scroll along with a touch.

var lastTouch;

//Delayed setup of touch handlers, since the referenced elements aren't created until blockly is injected
function setupScrollingTouchHandlers() {
  Blockly.bindEvent_(leftDiv.querySelector(".blocklyMainBackground"), "touchstart", null, (evt) => { if (!lastTouch) lastTouch = evt.targetTouches[0]; });
  Blockly.bindEvent_(leftDiv.querySelector(".blocklyMainBackground"), "touchend", null, () => { lastTouch = null; });
  Blockly.bindEvent_(leftDiv.querySelector(".blocklyMainBackground"), "touchmove", null, (evt) => { scrollWithTouch(leftWorkspace, evt.targetTouches[0]); });
  Blockly.bindEvent_(rightDiv.querySelector(".blocklyMainBackground"), "touchstart", null, (evt) => { if (!lastTouch) lastTouch = evt.targetTouches[0]; });
  Blockly.bindEvent_(rightDiv.querySelector(".blocklyMainBackground"), "touchend", null, () => { lastTouch = null; });
  Blockly.bindEvent_(rightDiv.querySelector(".blocklyMainBackground"), "touchmove", null, (evt) => { scrollWithTouch(rightWorkspace, evt.targetTouches[0]); });

  //Hide the scrollbars
  document.body.querySelectorAll(".blocklyMainWorkspaceScrollbar").forEach((elem) => {
    elem.style.visibility = "hidden";
  });
}

function scrollWithTouch(workspace, touch) {
  if (!lastTouch) return;

  var metrics = workspace.getMetrics();
  var currentScrollX = (metrics.viewLeft - metrics.contentLeft);
  var currentScrollY = (metrics.viewTop - metrics.contentTop);

  workspace.scrollbar.set(currentScrollX - touch.clientX + lastTouch.clientX, currentScrollY - touch.clientY + lastTouch.clientY);
  scrollTogether(workspace);
  lastTouch = touch;
}