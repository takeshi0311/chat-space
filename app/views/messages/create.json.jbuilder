  json.id  @message.id
  json.text  @message.text
  json.image  @message.image.url
  json.user_id  @message.user.id
  json.group_id  @message.group.id
  json.name  @message.user.name
  json.created_at  @message.created_at.strftime("%Y年%m月%d日 %H時%M分")