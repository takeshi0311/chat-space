$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="main-message__left-box">
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
      var html = `<div class="main-message__left-box">
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
    })
  })
})