/*! canvas paint */
(function(win, doc) {

  'use strict';

  var lineWidth = 1,
    lineHeight = 1,
    oldX = 0,
    oldY = 0;

  doc.addEventListener('DOMContentLoaded', init, false);

  function init() {

    var resetButton = doc.getElementById('reset'),
      saveButton = doc.getElementById('save'),
      canvas = doc.getElementById('canvas'),
      ctx = canvas.getContext('2d');

    ctx.strokeStyle = 'rgba(255, 0, 0, 1)';

    canvas.addEventListener('mousedown', function(e) {
      oldX = e.clientX;
      oldY = e.clientY;
      canvas.addEventListener('mousemove', draw, true);
    }, false);
    canvas.addEventListener('mouseup', function(e) {
      canvas.removeEventListener('mousemove', draw, true);
    }, false);

    function draw(e) {

      var x = e.clientX,
        y = e.clientY;

        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(oldX, oldY);
        ctx.lineTo(x, y);
        ctx.stroke();
        oldX = x;
        oldY = y;
    }

    resetButton.addEventListener('click', _reset, false);

    function _reset() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    saveButton.addEventListener('click', _save, false);

    function _save() {
      var data = canvas.toDataURL('image/png');
      data.replace('image/png', 'image/octet-stream');
      win.open(data, 'save');
    }
  }


})(this, this.document);
