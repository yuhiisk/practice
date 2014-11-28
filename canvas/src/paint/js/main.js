/*!
 * canvas paint
 *
 **/
(function(win, doc) {

  'use strict';

  /**
   * Variables
   */
  var lineWidth = 1,
    lineHeight = 1,
    drawCount = -1,
    history = [],
    oldX = 0,
    oldY = 0;


  doc.addEventListener('DOMContentLoaded', init, false);


  function init() {

    var undoButton = doc.getElementById('undo'),
      redoButton = doc.getElementById('redo'),
      resetButton = doc.getElementById('reset'),
      saveButton = doc.getElementById('save'),
      canvas = doc.getElementById('canvas'),
      ctx = canvas.getContext('2d'),
      canvasPos = canvas.getBoundingClientRect();

    ctx.strokeStyle = 'rgba(255, 0, 0, 1)';
    ctx.savePrevData = function() {
      drawCount++;
      history.push(this.getImageData(0, 0, this.canvas.width, this.canvas.height));
    };

    /**
     * Event handler
     **/
    canvas.addEventListener('mousedown', onMouseDownHandler, false);

    canvas.addEventListener('mouseup', onMouseUpHandler, false);

    undoButton.addEventListener('mousedown', undo, false);
    redoButton.addEventListener('mousedown', redo, false);

    resetButton.addEventListener('click', reset, false);
    saveButton.addEventListener('click', save, false);

    /**
     * Funtion
     */

    function onMouseDownHandler(e) {
      oldX = e.clientX - canvasPos.left;
      oldY = e.clientY - canvasPos.top;

      if (drawCount < history.length) {
        history.splice(drawCount, history.length);
      }

      ctx.savePrevData();
      canvas.addEventListener('mousemove', draw, true);
    }

    function onMouseUpHandler(e) {
      console.log(drawCount);
      canvas.removeEventListener('mousemove', draw, true);
    }

    function draw(e) {
      var x = e.clientX - canvasPos.left,
        y = e.clientY - canvasPos.top;

        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(oldX, oldY);
        ctx.lineTo(x, y);
        ctx.stroke();
        oldX = x;
        oldY = y;
    }

    function undo(e) {
      if (drawCount < 0) { return; } // 0だったらクリア
      drawCount--;
      console.log(drawCount, history);
      ctx.putImageData(history[drawCount], 0, 0);
    }

    // TODO:bugfix
    function redo(e) {
      if (drawCount >= history.length) { return; }
      drawCount++;
      console.log(drawCount, history);
      ctx.putImageData(history[drawCount], 0, 0);
    }

    function reset() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function save() {
      var data = canvas.toDataURL('image/png');
      data.replace('image/png', 'image/octet-stream');
      win.open(data, 'save');
    }

  }

})(this, this.document);
