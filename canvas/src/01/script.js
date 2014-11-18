;(function(win, doc) {

    'use strict';

    win.onload = function() {
        var canvas = doc.getElementById('canvas'),
            ctx = canvas.getContext('2d');

    };

  window.onload = function() {
    var text = 'Hello Canvas';
    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d');

    ctx.font = '38px Arial';
    ctx.fillStyle = 'cornflowerblue';
    ctx.strokeStyle = 'blue';

    ctx.fillText(text, canvas.width / 2 - 150, canvas.height / 2 + 15);
    ctx.strokeText(text, canvas.width / 2 - 150, canvas.height / 2 + 15);
  };

})(this, this.document);
