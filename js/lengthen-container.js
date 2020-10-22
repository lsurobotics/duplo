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
    var otherBlock = workspace(!fromLeft).getBlockById(this.block_.id);
    if (otherBlock && this.inputRows[1]) {
      if (!naturalHeights[this.block_.id]) naturalHeights[this.block_.id] = { left: this.constants_.MIN_BLOCK_HEIGHT, right: this.constants_.MIN_BLOCK_HEIGHT };
      if (fromLeft) naturalHeights[this.block_.id].left = this.inputRows[1].height;
      else naturalHeights[this.block_.id].right = this.inputRows[1].height;

      this.inputRows[1].height = Math.max(naturalHeights[this.block_.id].left, naturalHeights[this.block_.id].right);

      //wait an instant for this block to render before rendering the other block - it will grow
      if (this.inputRows[1].height != otherBlock.height - BASE_HEIGHT) {
        setTimeout(function() {
          otherBlock.render();
        }, 1);
      }
    }
  }
};