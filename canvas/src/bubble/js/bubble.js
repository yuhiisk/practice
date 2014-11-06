/*! canvas bubble */
(function() {
  (function(win, doc) {
    'use strict';
    var canvas, circle, ctx, posX, radius, stage, tick;
    canvas = null;
    stage = null;
    ctx = null;
    circle = null;
    radius = 30;
    posX = 0;
    doc.addEventListener('DOMContentLoaded', function() {
      canvas = doc.getElementById('cv');
      stage = new createjs.Stage(canvas);
      circle = new createjs.Shape();
      circle.graphics.beginFill('lightblue').drawCircle(0, 0, radius);
      circle.x = stage.canvas.width / 2;
      circle.y = stage.canvas.height + radius;
      circle.alpha = 0.5;
      stage.addChild(circle);
      stage.update();
      createjs.Ticker.addEventListener('tick', tick);
    }, false);
    tick = function(e) {
      circle.y -= 10;
      circle.x = (Math.sin(posX += 0.6) * 8 + 8) + 320;
      if (circle.y <= -100) {
        circle.y = 740;
      }
      return stage.update(e);
    };
  })(this, this.document);

}).call(this);
