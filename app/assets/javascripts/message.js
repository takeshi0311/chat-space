$(function(){
    function buildHTML(message){
      if (message.image) {
        var html = `<div class="main-message__left-box" data-message-id= "${message.id}">
                      <div class="main-message__left-box__name">
                      ${message.name}
                      </div>
                      <div class="main-message__left-box__date">
                      ${message.created_at}
                      </div>
                      <div class="main-message__left-box__message">
                      ${message.text}
                      </div>
                      <img class="lower-message__image" src="${message.image}" alt="P1043463">
                    </div>`
      } else {
        var html = `<div class="main-message__left-box" data-message-id= "${message.id}">
                      <div class="main-message__left-box__name">
                      ${message.name}
                      </div>
                      <div class="main-message__left-box__date">
                      ${message.created_at}
                      </div>
                      <div class="main-message__left-box__message">
                      ${message.text}
                      </div>
                    </div>`
      }
      return html
    }
    $('#new_message').on('submit', function(e){
      e.preventDefault()
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url, 
        type: 'POST', 
        data: formData,  
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.main-message').append(html);
        $('.main-message').animate({ scrollTop: $('.main-message')[0].scrollHeight});
        $('#new_message')[0].reset( );
        $('.submit-btn').prop('disabled', false);
      })
      .fail(function(){
        alert('error');
        $('.submit-btn').prop('disabled', false);
      })
    })
    var reloadMessages = function() {
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      last_message_id = $('.main-message__left-box:last').data("message-id");
      $.ajax({
        //ルーティングで設定した通りのURLを指定
        url: "api/messages",
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          // ここの文法をしっかり復習すること！！！
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.main-message').append(insertHTML);
        $('.main-message').animate({ scrollTop: $('.main-message')[0].scrollHeight});
      }
      })
      .fail(function() {
        alert('error');
      });
    };
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 7000);
    }
})
