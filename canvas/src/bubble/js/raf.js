/**
 * requestAnimationFrame
 */
;(function(win) {
  'use strict';

  if (!win.requestAnimationFrame) {

    win.requestAnimationFrame = (function() {

      return win.webkitRequestAnimationFrame ||
        win.mozRequestAnimationFrame ||
        win.oRequestAnimationFrame ||
        win.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

          window.setTimeout( callback, 1000 / 60 );

        };

    })();

  }
})(this);

