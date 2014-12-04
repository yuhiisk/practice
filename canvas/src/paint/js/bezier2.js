/*!
 * canvas paint
 *
 **/
(function(win, doc) {

  'use strict';

  /**
   * Variables
   */
  var lineWidth = 2.5,
    lineHeight = 1,
    drawCount = -1,
    points = [],
    history = [],
    oldX = 0,
    oldY = 0;


  doc.addEventListener('DOMContentLoaded', init, false);


  function init() {

    var resetButton = doc.getElementById('reset'),
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
     */
    canvas.addEventListener('mousedown', onMouseDownHandler, false);
    canvas.addEventListener('mouseup', onMouseUpHandler, false);

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

    function drawStaticLine() {
      var base = {
        x: 100,
        y: 100
      };

      ctx.lineWidth = lineWidth;

      // straight line
      ctx.strokeStyle = 'rgba(122, 122, 122, .6)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(150, 150);
      ctx.lineTo(100, 200);
      ctx.lineTo(50, 250);
      ctx.lineTo(100, 300);
      ctx.lineTo(150, 350);
      ctx.lineTo(100, 400);
      ctx.lineTo(50, 450);
      ctx.lineTo(100, 500);
      ctx.lineTo(150, 550);
      ctx.lineTo(ctx.canvas.width, ctx.canvas.height);

      ctx.stroke();

      // bezier
      ctx.strokeStyle = 'rgba(255, 0, 0, 1)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      // ctx.moveTo(ctx.canvas.width / 2, ctx.canvas.height / 2);
      ctx.quadraticCurveTo(150, 150, 100, 200);
      ctx.quadraticCurveTo(50, 250, 100, 300);
      ctx.quadraticCurveTo(150, 350, 100, 400);
      ctx.quadraticCurveTo(50, 450, 100, 500);
      ctx.quadraticCurveTo(150, 550, ctx.canvas.width, ctx.canvas.height);
      ctx.stroke();

    }
    drawStaticLine();

    function draw(e) {
      var x = e.clientX - canvasPos.left,
        y = e.clientY - canvasPos.top;

        // 描画位置を保存しておく
        points.push({ x: x, y: y });

        if (points.length < 2) { return; }

        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(points[points.length - 2].x, points[points.length - 2].y);
        ctx.quadraticCurveTo(points[points.length - 2].x, points[points.length - 2].y, points[points.length - 1].x, points[points.length - 1].y);

        ctx.stroke();

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
