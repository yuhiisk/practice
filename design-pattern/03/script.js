/**
 * revealing module pattern
 */

;(function(win, doc, undefined) {

    "use strict";

    // var myRevealingModule = function() {

    //     var privateVar = 'Hoge',
    //         publicVar = 'Foo';

    //     function privateFunction() {
    //         console.log('Name:' + privateVar);
    //     }

    //     function publicSetName(strName) {
    //         privateName = strName;
    //     }

    //     function publicGetName() {
    //         privateFunction();
    //     }

    //     // プライベートな関数やプロパティへのポインタを公開する
    //     return {
    //         setName: publicSetName,
    //         greeting: publicVar,
    //         getName: publicGetName
    //     };

    // };

    // myRevealingModule.setName('Bar');

    var myRevealingModule = function() {

        var privateCounter = 0;

        function privateFunction() {
            privateCounter++;
        }

        function publicFunction() {
            publicIncrement();
        }

        function publicIncrement() {
            privateFunction();
        }

        function publicGetCount() {
            return privateCounter;
        }

        // プライベートな関数やプロパティへのポインタを公開する。
        return {
            start: publicFunction,
            increment: publicIncrement,
            count: publicGetCount
        };

    };

    var module = myRevealingModule();
    module.start();
    console.log(module.count());

})(this, this.documnet);

