/**
 * constructor pattern
 */

;(function(win, doc, undefined) {
    "use strict";

    function Human(name) {
        this.name = name;
        this.age  = 20;

        this.say = function(txt) {
            console.log("Hello world! " + txt);
        }
    }

    var human = new Human("John");
    human.say();

})(this, this.documnet);

