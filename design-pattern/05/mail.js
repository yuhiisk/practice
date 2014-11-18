/*
 * observer - simple mail
 */
'use strict';

// 受信したメッセージの数
var mailCounter = 0;

// 「inbox/newMessage」という名前で受信待ちをしているサブスクライバを初期化する。

// 新規メッセージのプレビューを表示
var subscriber1 = subscribe('inbox/newMessage', function(topic, data) {

    // デバッグのためにtopicをログ出力
    console.log('A new message was received: ', topic);

    // サブジェクトから渡されたデータを利用してユーザに向けてメッセージプレビューを表示する
    $('.messageSender').html(data.sender);
    $('.messagePreview').html(data.body);

});

// 以下は同じデータを使って異なるタスクを行うサブスクライバ

// カウンタを更新し、パブリッシャから受け取った新着メッセージの数を表示する。

var subscriber2 = subscribe('inbox/newMessage', function(topic, data) {

    $('.newMessageCounter').html(mailCounter++);

});

publish('inbox/newMessage', [{
    sender: 'hello@google.com',
    body: 'Hey there! How are you doing today?'
}]);

// 次のようにして、後でサブスクライバがトピック通知の受信を止めることができる
// unsubscribe(subscriber1);
// unsubscribe(subscriber2);
//
