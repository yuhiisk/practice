/*! canvas paint */
(function(win, doc) {

  'use strict';

  var lineWidth = 1,
    lineHeight = 1,
    drawFlag = false,
    oldX = 0,
    oldY = 0;

  doc.addEventListener('DOMContentLoaded', function() {

    var resetButton = doc.getElementById('reset'),
      saveButton = doc.getElementById('save'),
      canvas = doc.getElementById('canvas'),
      ctx = canvas.getContext('2d');

    ctx.strokeStyle = 'rgba(255, 0, 0, 1)';

    canvas.addEventListener('mousemove', draw, true);
    canvas.addEventListener('mousedown', function(e) {
      drawFlag = true;
      oldX = e.clientX;
      oldY = e.clientY;
    }, false);
    canvas.addEventListener('mouseup', function(e) {
      drawFlag = false;
    }, false);

    function draw(e) {
      if (!drawFlag) { return; }

      var x = e.clientX,
        y = e.clientY;

        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(oldX, oldY);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.closePath();
        oldX = x;
        oldY = y;
    }

    resetButton.addEventListener('click', reset, false);

    function reset() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    saveButton.addEventListener('click', save, false);

    function save() {
      var data = canvas.toDataURL('image/png');
      data.replace('image/png', 'image/octet-stream');
      win.open(data, 'save');
    }

  }, false);

})(this, this.document);
