// Makes it so that mirrored container blocks, such as loop blocks, expand to be each other's length.

// Overrides the default RenderInfo.computeBounds_ function to change the height of matching loop blocks.
var originalComputeBounds = Blockly.blockRendering.RenderInfo.prototype.computeBounds_;

// A map of loop block ids to their natural statement input heights (i.e. without unnatural stretching).
var naturalHeights = [];

Blockly.blockRendering.RenderInfo.prototype.computeBounds_ = function() {
  originalComputeBounds.apply(this);

  // (Height of empty controls_repeat block) - (height of the empty statement input)
  var BASE_HEIGHT = Math.max(this.constants_.TOP_ROW_PRECEDES_STATEMENT_MIN_HEIGHT, this.constants_.MEDIUM_PADDING + this.constants_.FIELD_TEXT_HEIGHT + this.constants_.MEDIUM_PADDING) + this.constants_.STATEMENT_BOTTOM_SPACER + this.constants_.BOTTOM_ROW_AFTER_STATEMENT_MIN_HEIGHT + this.constants_.NOTCH_HEIGHT;

  //after the bounds have been computed, add to the end of the function w/ adjustments
  if (this.block_.type == "controls_repeat") {
    var fromLeft = (this.block_.workspace == leftWorkspace);
    var otherBlock = getMirror(this.block_);
    if (otherBlock && this.inputRows[1]) {
      if (!naturalHeights[this.block_.id]) naturalHeights[this.block_.id] = { left: this.constants_.MIN_BLOCK_HEIGHT, right: this.constants_.MIN_BLOCK_HEIGHT };
      if (fromLeft) naturalHeights[this.block_.id].left = this.inputRows[1].height;
      else naturalHeights[this.block_.id].right = this.inputRows[1].height;

      this.inputRows[1].height = Math.max(naturalHeights[this.block_.id].left, naturalHeights[this.block_.id].right);

      //wait an instant for this block to render before rendering the other block - it will grow
      if (this.inputRows[1].height != otherBlock.height - BASE_HEIGHT) {
        setTimeout(function() {
          otherBlock.render();

          resolveBlocks(otherBlock.id, !fromLeft);
        }, 1);
      }
    }
  }




  // Visual correction for insertion markers of mutating move blocks (originally look too long)
  if (this.block_.type == 'custom_move' && this.isInsertionMarker) this.block_.updateShape_('null');
};


// This is from the Blockly library and is edited to calculate the size of a split stack. It is almost completely changed.
Blockly.BlockSvg.prototype.getHeightWidth = function() {
  var block = this;
  var endsInConnection;
  var width = 0;
  var heightToMirror = 0, heightSinceMirror = 0;
  var lowestMirror;
  const tabHeight = this.workspace.getRenderer().getConstants().NOTCH_HEIGHT;
  do {
    if (!lowestMirror) heightToMirror += block.height - tabHeight;
    else heightSinceMirror += block.height - tabHeight;

    if (getMirror(block)) {
      lowestMirror = block;
      heightToMirror += heightSinceMirror;
      heightSinceMirror = 0;
    }

    width = Math.max(width, block.width);

    endsInConnection = !!block.nextConnection;
    block = block.getNextBlock();
  }
  while (block);

  if (lowestMirror) {
    otherBlock = getMirror(lowestMirror);
    var betweenHeight = 0;
    while (otherBlock.getNextBlock()) {
      otherBlock = otherBlock.getNextBlock();
      if (getMirror(otherBlock)) {
        var nextStackHeightWidth = getMirror(otherBlock).getHeightWidth();
        return {height: heightToMirror + betweenHeight + nextStackHeightWidth.height, width: Math.max(width, nextStackHeightWidth.width)}
      }
      betweenHeight += otherBlock.height - tabHeight;
    }
  }

  return {height: heightToMirror + heightSinceMirror + (endsInConnection ? tabHeight : 0), width: width};
};


// Again, part of the Blockly library. Allows split stacks to render ancestors in the same way that normal stacks do.
Blockly.BlockSvg.prototype.render = function(opt_bubble) {
  if (this.renderIsInProgress_) {
    return;  // Don't allow recursive renders.
  }
  this.renderIsInProgress_ = true;
  try {
    this.rendered = true;
    Blockly.utils.dom.startTextWidthCache();

    if (this.isCollapsed()) {
      this.updateCollapsed_();
    }
    this.workspace.getRenderer().render(this);
    this.updateConnectionLocations_();

    if (opt_bubble !== false) {
      var parentBlock = this.getParent();
      if (parentBlock) {
        parentBlock.render(true);
      } else {
        // Top-most block. Fire an event to allow scrollbars to resize.
        this.workspace.resizeContents();
      }

      // var mirror = workspace(!(this.workspace == leftWorkspace)).getBlockById(this.id); // Added these
      // if (mirror) mirror.render(false);
    }

    Blockly.utils.dom.stopTextWidthCache();
    this.updateMarkers_();
  } finally {
    this.renderIsInProgress_ = false;
  }
};