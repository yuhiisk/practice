;(function(win, doc) {

  'use strict';

  window.onload = function() {
    var canvas = doc.getElementById('canvas'),
      ctx = canvas.getContext('2d'),
      repeatRadio = doc.getElementById('repeatRadio'),
      noRepeatRadio = doc.getElementById('noRepeatRadio'),
      repeatXRadio = doc.getElementById('repeatXRadio'),
      repeatYRadio = doc.getElementById('repeatYRadio'),
      image = new Image();

    function fillCanvasWithPattern(repeatString) {
      var pattern = ctx.createPattern(image, repeatString);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fill();
    }

    repeatRadio.onclick = function(e) {
      fillCanvasWithPattern('repeat');
    };

    repeatXRadio.onclick = function(e) {
      fillCanvasWithPattern('repeat-x');
    };

    repeatYRadio.onclick = function(e) {
      fillCanvasWithPattern('repeat-y');
    };

    noRepeatRadio.onclick = function(e) {
      fillCanvasWithPattern('no-repeat');
    };

    image.src = 'redball.png';
    image.onload = function(e) {
      fillCanvasWithPattern('repeat');
    };

  };

})(this, this.document);
