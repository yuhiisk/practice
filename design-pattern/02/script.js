/**
 * module pattern
 */

;(function(win, doc, undefined) {
    "use strict";

    var testModule = (function() {
        // カウンタ変数
        var counter = 0;

        function privateFunc() {
            //...
        }

        function privateFunc2() {
            //...
        }

        return {

            // カウンタをインクリメント
            increment: function() {
                return ++counter;
            },

            // カウンタをリセット
            reset: function() {
                console.log("リセット前の値: " + counter);
                counter = 0;
            },

            // プライベート関数をパブリックに公開
            publicFunc: privateFunc

        };

    })();

    testModule.increment();
    testModule.reset(); // リセット前の値: 1
    // counter => 0

})(this, this.documnet);

