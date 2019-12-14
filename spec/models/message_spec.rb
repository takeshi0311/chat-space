require 'rails_helper'

RSpec.describe Message, type: :model do
  # describe:基本的にテスト対象を書く。
  # context:テスト対象のメソッドをどういう条件で実行するかを記載する
  # it：テスト実行時の期待値を記載する。
  describe '#create' do
    context 'can save' do
      # 1. メッセージがあれば保存できる
      it "メッセージがあれば保存できる" do
        # buildメソッド：引数にシンボル型で取ったクラス名のインスタンスを、factory_botの記述をもとに作成
        # expect(X).to eq Y→→xの部分に入れた式の値がYの部分の値と等しければ、テストが成功
        expect(build(:message, image: nil)).to be_valid
        # be_validマッチャ：expectの引数にしたインスタンスが全てのバリデーションをクリアする場合にパスするマッチャです。
        # →buildで生成したインスタンスは一度モデルのバリデーションにかかって、それをbe_validマッチャで評価していく流れなのか
      end

      # 2. 画像があれば保存できる
      it "画像があれば保存できる" do
        expect(build(:message, text: nil)).to be_valid
      end

      # 3. メッセージと画像があれば保存できる
      it "メッセージと画像があれば保存できる" do
        expect(build(:message)).to be_valid
      end
    end

    context 'can not save' do
      # 4. メッセージも画像も無いと保存できない
      it "メッセージも画像も無いと保存できない" do
        message = build(:message, text: nil, image: nil)
        message.valid?
        # valid?メソッド：インスタンスを保存する際に「バリデーションにより保存ができない状態であるか」を確かめる
        expect(message.errors[:text]).to include("を入力してください")
        # errorsメソッド：valid?メソッドを利用したインスタンス対してerrorsメソッドを利用すると、バリデーションにより保存ができない理由を確認する
      end

        # 5. group_idが無いと保存できない
        it "group_idが無いと保存できない" do
          message = build(:message, group_id: nil)
          message.valid?
          expect(message.errors[:group]).to include("を入力してください")
        end

        # 6. user_idが無いと保存できない
        it "user_idが無いと保存できない" do
          message = build(:message, user_id: nil)
          message.valid?
          expect(message.errors[:user]).to include("を入力してください")
        end
      end
  end
end
# works→不動産の会社