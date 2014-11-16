(function(win, doc) {
  'use strict';
  var Bubble, canvas, circle, circles, ctx, posX, radius, stage, tick;
  canvas = null;
  stage = null;
  ctx = null;
  circle = null;
  circles = [];
  radius = 10;
  posX = 0;
  Bubble = (function() {
    function Bubble() {
      this.init();
    }

    Bubble.prototype.init = function() {
      circle = new createjs.Shape();
      circle.graphics.beginFill('lightblue').drawCircle(0, 0, Math.random() * radius + 5);
      circle.x = Math.random() * (stage.canvas.width / 2);
      circle.y = Math.random() * (stage.canvas.height + radius);
      circle.alpha = 0.5;
      circles.push(circle);
      return stage.addChild(circle);
    };

    return Bubble;

  })();
  doc.addEventListener('DOMContentLoaded', function() {
    var i, _i;
    canvas = doc.getElementById('canvas');
    stage = new createjs.Stage(canvas);
    for (i = _i = 0; _i <= 10; i = ++_i) {
      new Bubble();
    }
    stage.update();
    createjs.Ticker.addEventListener('tick', tick);
  }, false);
  tick = function(e) {
    var _i, _len;
    for (_i = 0, _len = circles.length; _i < _len; _i++) {
      circle = circles[_i];
      circle.y -= 10;
      circle.x = (Math.sin(posX += 0.6) * 8 + 8) + 320;
      if (circle.y <= -100) {
        circle.y = stage.canvas.height + radius;
      }
    }
    return stage.update(e);
  };
})(this, this.document);
