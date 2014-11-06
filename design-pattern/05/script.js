/*
 * observer
 */
'use strict';

function ObserverList() {
    this.observerList = [];
}

ObserverList.prototype.Add = function(obj) {
    return this.observerList.push( obj );
};

ObserverList.prototype.Empty = function() {
    this.observerList = [];
};

ObserverList.prototype.Count = function() {
    return this.observerList.length;
};

ObserverList.prototype.Get = function( index ) {
    if ( index > -1 && index < this.observerList.length ) {
        return this.observerList[ index ];
    }
};

ObserverList.prototype.Insert = function( obj, index ) {
    var pointer = -1;

    if ( index === 0 ) {
        this.observerList.unshift( obj );
        pointer = index;
    } else if ( index === this.observerList.length ) {
        this.observerList.push( obj );
        pointer = index;
    }

    return pointer;
};

ObserverList.prototype.IndexOf = function( obj, startIndex ) {
    var i = startIndex, pointer = -1;

    while ( i < this.observerList.length ) {
        if ( this.observerList[i] === obj ) {
            pointer = i;
        }
        i++;
    }

    return pointer;
};

ObserverList.prototype.RemoveIndexAt = function( index ) {
    if ( index === 0 ) {
        this.observerList.shift();
    } else if ( index === this.observerList.length -1 ) {
        this.observerList.pop();
    }
};



// extensionでオブジェクトを拡張
function extend( obj, extension ) {
    for ( var key in obj ) {
        extension[key] = obj[key];
    }
}



function Subject() {
    this.observers = new ObserverList();
}

Subject.prototype.AddObserver = function( observer ) {
    this.observers.Add( observer );
};

Subject.prototype.RemoveObserver = function( observer ) {
    this.observers.RemoveIndexAt( this.observers.IndexOf( observer, 0 ));
};

Subject.prototype.Notify = function( context ) {
    var observerCount = this.observers.Count();
    for (var i = 0; i < observerCount; i++) {
        this.observers.Get(i).Update( context );
    }
};



// オブザーバ
function Observer() {
    this.Update = function() {
        // ...
    };
}


;(function(win) {

    var init = function() {

        // DOMの参照を保存
        var controlCheckbox = document.getElementById('mainCheckbox'),
            addBtn = document.getElementById('addNewObserver'),
            container = document.getElementById('observersContainer');


        // 具象サブジェクト

        // 制御用チェックボックスをサブジェクトクラスで拡張
        extend( new Subject(), controlCheckbox );

        // チェックボックスをクリックするとオブザーバに通知する。
        // controlCheckbox.onclick = new Function('controlCheckbox.Notify(controlCheckbox.checked)');
        controlCheckbox.onclick = function() {
            controlCheckbox.Notify(controlCheckbox.checked);
        };

        addBtn.onclick = AddNewObserver;


        // 具象オブザーバ

        function AddNewObserver() {
            // 追加するチェックボックスを新たに作成
            var check = document.createElement('input');
            check.type = 'checkbox';

            // オブザーバクラスでチェックボックスを拡張
            extend(new Observer(), check);

            // カスタム更新動作でオーバーライド
            check.Update = function(value) {
                this.checked = value;
            };

            // メインサブジェクトのオブザーバのリストに新しいオブザーバを追加する
            controlCheckbox.AddObserver(check);

            // コンテナに項目を追加
            container.appendChild(check);
        }

    };



    win.onload = init;

})(this);
