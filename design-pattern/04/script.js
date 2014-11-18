/*
 * singleton
 */
'use strict';

// var mySingleton = (function() {
//
// 	// シングルトンへの参照を保存
// 	var instance;
//
// 	function init() {
//
// 		// シングルトン
//
// 		// プライベートなメソッドと変数
// 		function privateMethod() {
// 			console.log('I am private');
// 		}
//
// 		var privateVariable = 'I am also private';
//
// 		return {
//
// 			// パブリックなメソッドと変数
// 			publicMethod: function() {
// 				console.log('The public can see me!');
// 			},
//
// 			publicProperty: 'I am also public'
// 		};
// 	}
//
// 	return {
//
// 		// 既に存在していればシングルトンインスタンスを取得する
// 		// 存在していなければ作成する
// 		getInstance: function() {
//
// 			if (!instance) {
// 				instance = init();
// 			}
//
// 			return instance;
// 		}
// 	};
//
// })();
//
// mySingleton.getInstance = function() {
// 	if (this._instance == null) {
// 		if (isFoo()) {
// 			this._instance = new FooSingleton();
// 		} else {
// 			this._instance = new BasicSingleton()
// 		}
// 	}
// 	return this._instance;
// }
//
// var singleA = mySingleton;
// var singleB = mySingleton;
// console.log(singleA === singleB);


// var SingletonTester = (function() {
//
// 	// optionsはシングルトンの設定オプションを含むオブジェクト
// 	// 例：var options = { name: 'test', pointX: 5 };
// 	function Singleton(options) {
//
// 		// 引数で受け取ったオプションがあればoptionsに設定する。
// 		// なければoptionsには空オブジェクトを設定する。
// 		options = options || {};
//
// 		// シングルトンのプロパティを設定する
// 		this.name = 'SingletonTester';
//
// 		this.pointX = options.pointX || 6;
//
// 		this.pointY = options.pointY || 10;
//
// 	}
//
// 	// インスタンスの保存場所
// 	var instance;
//
// 	// 静的な変数やメソッドの列挙
// 	var _static = {
//
// 		name: 'SingletonTester',
//
// 		// インスタンスを取得するメソッド
// 		// シングルトンオブジェクトのインスタンスを返す。
// 		getInstance: function(options) {
//
// 			if (instance === undefined) {
// 				instance = new Singleton(options);
// 			}
//
// 			return instance;
//
// 		}
// 	};
//
// 	return _static;
// })();
//
// var singletonTest = SingletonTester.getInstance({
// 	pointX: 5
// });
//
// // pointXの値が正しいかを確認するためのログ出力
// // 出力5
// console.log(singletonTest.pointX);


var watch = (function() {

    function Watch() {
        this.date = null;
        this.timer = null;

        this._init();
    }

    Watch.prototype._init = function() {
        var self = this;
        this.week = ['日', '月', '火', '水', '木', '金', '土'];

        this.update();
        this.timer = setInterval(function() {
            self.update();
        }, 1000);
    };

    Watch.prototype.update = function() {
        this.date = new Date();
        this.render(this.formatter(this.date));
    };

    Watch.prototype.render = function(format) {
        console.log(format);
    };

    Watch.prototype.formatter = function(date) {
        var month = date.getMonth() + 1,
            day = date.getDate(),
            weekday = this.week[date.getDay()],
            after = date.getHours() < 12 ? '午前' : '午後',
            hour = date.getHours() > 12 ?
                ('0' + (date.getHours() - 12)).slice(-2) :
                ('0' + date.getHours()).slice(-2),
            minutes = ('0' + date.getMinutes()).slice(-2),
            seconds = ('0' + date.getSeconds()).slice(-2);

        return month + '月' + day + '日(' + weekday + ') ' + after + hour + ':' + minutes + ':' + seconds;
    };

	// インスタンスの保存場所
	var instance;

	// 静的な変数やメソッドの列挙
	var _static = {

		name: 'Watch',

		// インスタンスを取得するメソッド
		// シングルトンオブジェクトのインスタンスを返す。
		getInstance: function(options) {

			if (instance === undefined) {
				instance = new Watch();
			}

			return instance;

		}
	};

	return _static;

})();

watch.getInstance().update();
