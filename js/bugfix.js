// Extra changes in default behavior to fix bugs.

/* Only change is if (this.getCurrentBlock()). */
Blockly.BlockDragSurfaceSvg.prototype.clearAndHide = function(opt_newSurface) {
  if (opt_newSurface) {
    // appendChild removes the node from this.dragGroup_
    if (this.getCurrentBlock()) opt_newSurface.appendChild(this.getCurrentBlock());
  } else {
    this.dragGroup_.removeChild(this.getCurrentBlock());
  }
  this.SVG_.style.display = 'none';
  if (this.dragGroup_.childNodes.length) {
    throw Error('Drag group was not cleared.');
  }
  this.surfaceXY_ = null;
};


/* Only change is the try-catch statement with applyConnections. */
Blockly.BlockDragger.prototype.endBlockDrag = function(e, currentDragDeltaXY) {
  // Make sure internal state is fresh.
  this.dragBlock(e, currentDragDeltaXY);
  this.dragIconData_ = [];
  this.fireDragEndEvent_();

  Blockly.utils.dom.stopTextWidthCache();

  Blockly.blockAnimations.disconnectUiStop();

  var delta = this.pixelsToWorkspaceUnits_(currentDragDeltaXY);
  var newLoc = Blockly.utils.Coordinate.sum(this.startXY_, delta);
  this.draggingBlock_.moveOffDragSurface(newLoc);

  var deleted = this.maybeDeleteBlock_();
  if (!deleted) {
    // These are expensive and don't need to be done if we're deleting.
    this.draggingBlock_.moveConnections(delta.x, delta.y);
    this.draggingBlock_.setDragging(false);
    this.fireMoveEvent_();
    if (this.draggedConnectionManager_.wouldConnectBlock()) {
      // Applying connections also rerenders the relevant blocks.
      try { this.draggedConnectionManager_.applyConnections(); }
      catch (e) {
        this.draggingBlock_.unplug();
        this.draggingBlock_.moveTo(newLoc);
      }
    } else {
      this.draggingBlock_.render();
    }
    this.draggingBlock_.scheduleSnapAndBump();
  }
  this.workspace_.setResizesEnabled(true);

  var toolbox = this.workspace_.getToolbox();
  if (toolbox && typeof toolbox.removeStyle == 'function') {
    var style = this.draggingBlock_.isDeletable() ? 'blocklyToolboxDelete' :
        'blocklyToolboxGrab';
    toolbox.removeStyle(style);
  }
  Blockly.Events.setGroup(false);
};