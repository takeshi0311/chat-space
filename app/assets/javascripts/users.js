$(function(){
  function addUser(user) {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addDeleteUser(name, id) {
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
  }

  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }
  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      // なぜfunctionの引数がusersとなるのか→どこのデータを引数に取っているのか分からない→jbuilderからのデータならば@usersとインスタンス変数となるべきなのではないか
      $("#user-search-result").empty();
      // emptyメソッド：指定したDOM要素の子要素のみを削除するメソッド

      if (users.length !== 0) {
        users.forEach(function(user) {
          // forEachメソッド：forEachは、与えられた関数を配列に含まれる各要素に対して一度ずつ呼び出す
          addUser(user);
          // cosole/log(html)をどこに記載すれば良いのか
        });
      } else if (input.length == 0) {
        return false;
      } else {
        addNoUser();
      }
    })
    .fail(function() {
      alert("通信エラーです。ユーザーが表示できません。");
    });
  });
  $(document).on("click", ".chat-group-user__btn--add", function() {
// $(document).onすることで常に最新のHTMLの情報を取得することができます。
// $(document).onを用いることで、Ajax通信で作成されたHTMLの情報を取得することができます。
// 動的な要素に対して、常に最新のHTMLを取得することができる→動的な要素である(".chat-group-user__btn--add")に対して、clickイベントが発火したら、設定した関数が実行される
    console.log
    const userName = $(this).attr("data-user-name");
// this:イベントで設定したfunction内でthisを利用した場合は、イベントが発生したノード要素を指します。
// ノード：
// attr:要素が持つ指定属性の値を返す。今回はイベントが発生した要素のdata-user-name属性の値を取得している。
    const userId = $(this).attr("data-user-id");
    $(this).parent().remove();
// クリックした子要素と親要素の両方を削除する場合.parent().remove();を使用→クリックした子要素のみ削除する場合.remove();を使用
    addDeleteUser(userName, userId);
    addMember(userId);
  });
  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this)
      .parent()
      .remove();
  });
});