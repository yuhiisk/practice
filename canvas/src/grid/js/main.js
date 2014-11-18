/*! canvas grid */
(function(win, doc) {
	'use strict';

  /**
   * DOMContentLoaded
   */
	doc.addEventListener('DOMContentLoaded', function() {

    var canvas = doc.getElementById('canvas'),
      ctx = canvas.getContext('2d');

    function drawGrid(ctx, color, stepx, stepy) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.5;

      for (var i = stepx + 0.5, l = ctx.canvas.width; i < l; i += stepx) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, ctx.canvas.height);
        ctx.stroke();
      }

      for (var i = stepy + 0.5, l = ctx.canvas.height; i < l; i += stepy) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(ctx.canvas.width, i);
        ctx.stroke();
      }

    }

    drawGrid(ctx, 'lightgray', 10, 10);

	}, false);

})(this, this.document);
