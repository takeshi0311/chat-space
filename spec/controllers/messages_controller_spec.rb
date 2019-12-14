require 'rails_helper'

describe MessagesController do
  # describe:基本的にテスト対象を書く。
  # context:テスト対象のメソッドをどういう条件で実行するかを記載する
  # it：テスト実行時の期待値を記載する。

  #  letを利用してテスト中使用するインスタンスを定義
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do

    context 'log in' do
      before do
  # beforeブロックの内部に記述された処理は、各exampleが実行される直前に、毎回実行されます。
        login user
  # deviseを用いて「ログインをする」ためのloginメソッドは、「support/controller_macros.rb」で定義済み
  # 上記のlogin user = login(user)　一緒の意味→文法の書き方
        get :index, params: { group_id: group.id }
  # 擬似的にindexアクションを動かすリクエストを行う」ために、getメソッドを利用しています→なぜparams: { group_id: group.id }なのか
  # { group_id: group.id }のgroup.idはFactoryBotの内で生成したインスタンスのidであり、中間テーブルのgroup_idカラムとは全然別物
      end

      it 'assigns @message' do
        expect(assigns(:message)).to be_a_new(Message)
  # assignsメソッド：コントローラーのテスト時、アクションで定義しているインスタンス変数をテストするためのメソッド。
  # 引数に、直前でリクエストしたアクション内で定義されているインスタンス変数をシンボル型で取ります。
  # 通常はexpectメソッドの引数として利用します。良く利用するので、是非覚えておきましょう。

  # be_a_newマッチャ：対象が引数で指定したクラスのインスタンスかつ未保存のレコードであるかどうか確かめることができます
      end

      it 'assigns @group' do
        expect(assigns(:group)).to eq group
  # @groupはeqマッチャを利用してassigns(:group)とgroupが同一であることを確かめることでテストできます。→なぜeqなのか
      end

      it 'renders index' do
        expect(response).to render_template :index
  # example内でリクエストが行われた後の遷移先のビューの情報を持つインスタンス
      end
    end

    context 'not log in' do
      before do
        get :index, params: { group_id: group.id }
      end

      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe '#create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }
    # letを利用してテスト中使用するインスタンスを定義
    # letメソッドを用いてparamsを定義。これは、擬似的にcreateアクションをリクエストする際に、引数として渡すためのものです
    # attributes_for：FactoryBotによって定義されるメソッド。オブジェクトを生成せずにハッシュを生成する。

    context 'log in' do
      before do
        login user
      end

      context 'can save' do
        subject {
          post :create,
          params: params
          # 必要なパラメーターが存在する場合は、各パラメーターをハッシュ形式で渡す
          # getの場合、get :show, params: {  id: 1 }
        }

        it 'count up message' do
          expect{ subject }.to change(Message, :count).by(1)
          # createアクションのテストを行う際にはchangeマッチャを利用
          # change(Message, :count).by(1)と記述することによって、Messageモデルのレコードの総数が1個増えたかどうかを確かめる。
        end

        it 'redirects to group_messages_path' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context 'can not save' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, text: nil, image: nil) } }

        subject {
          post :create,
          params: invalid_params
        }

        it 'does not count up' do
          expect{ subject }.not_to change(Message, :count)
        end

        it 'renders index' do
          subject
          expect(response).to render_template :index
          # response:example内でリクエストが行われた後の遷移先のビューの情報を持つインスタンスです。
          # render_templateマッチャ:引数(ひきすう)にシンボル型でアクション名を取ります。
          # 引数で指定したアクションがリクエストされた時に自動的に遷移するビューを、返します
        end
      end
    end

    context 'not log in' do

      it 'redirects to new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end