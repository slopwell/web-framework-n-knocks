# Ruby on rails とは？

Rails とは、プログラミング言語「Ruby」で書かれた Web アプリケーションフレームワークです。Rails は、あらゆる開発者が Web アプリケーション開発で必要となる作業やリソースを事前に想定することで、Web アプリケーションをより手軽に開発できるように設計されています。

https://railsguides.jp/getting_started.html

## 思想

Rails の哲学には、以下の 2 つの主要な基本理念があります。

### 繰り返しを避けよ（Don't Repeat Yourself: DRY）

DRY はソフトウェア開発上の原則であり、「システムを構成する知識のあらゆる部品は、常に単一であり、明確であり、信頼できる形で表現されていなければならない」というものです。
同じコードを繰り返し書くことを徹底的に避けることで、コードが保守しやすくなり、容易に拡張できるようになり、バグも減らせます。

### 設定より規約が優先（Convention Over Configuration）

Rails では、Web アプリケーションの機能を実現する最善の方法が明確に示されており、Web アプリケーションの各種設定についても従来の経験や慣習を元に、それらのデフォルト値を定めています。
デフォルト値が決まっているおかげで、開発者の意見をすべて取り入れようとした自由過ぎる Web アプリケーションのように、開発者が大量の設定ファイルを設定せずに済みます。

ここまでがリファレンスのコピペ

---

ここからハンズオン

# セットアップ

ruby と rails のセットアップを実行する
各ツールはよくわからないので、各々調べてください。

```sh
sudo apt-get update
sudo apt install build-essential rustc libssl-dev libyaml-dev zlib1g-dev libgmp-dev

curl https://mise.run | sh
echo 'eval "$(~/.local/bin/mise activate bash)"' >> ~/.bashrc
source ~/.bashrc
mise use -g ruby@3

ruby --version
gem install rails
```

下記のコマンドを実行し、テンプレアプリを作成する

```sh
rails new store
```

## ディレクトリ構成

App/config/Gemfile あたりを気にすれば良さそう
規約優先ということもあり、ガチガチに決まっている雰囲気

| ファイル/フォルダ | 目的                                                        |
| :---------------- | :---------------------------------------------------------- |
| App               | App のコントローラ、モデル、ビューなどを格納します。        |
| config            | App のルーティング、データベースなどの設定を格納します。    |
| Gemfile           | Rails App に必要な gem の依存関係を指定できるファイルです。 |

:::details 全 Dir 構成
| ファイル/フォルダ | 目的 |
| :---------------- | :--------------------------------------------------------------------------------------------------------- |
| App | App のコントローラ、モデル、ビューなどを格納します。 |
| bin | App を起動する Rails スクリプトなどその他のスクリプトを格納します |
| config | App のルーティング、データベースなどの設定を格納します。 |
| config.ru | App を起動するために使用される Rack ベースのサーバーの Rack 設定 |
| db | 現在のデータベーススキーマとデータベースマイグレーションを格納します |
| Dockerfile | Docker の設定ファイル |
| Gemfile | Rails App に必要な gem の依存関係を指定できるファイルです。 |
| Gemfile.lock | |
| lib | App の拡張モジュール |
| log | App のログファイル |
| public | 静的ファイルとコンパイル済みアセットを格納します。App が実行中の場合、このディレクトリはそのまま公開される |
| Rakefile | Rails のコンポーネント全体で定義されているタスクを読み込み、コマンドラインから実行できるようにします。 |
| README.md | README |
| script | 一時的または汎用的なスクリプトとベンチマークを格納します |
| storage | SQLite データベースと Disk Service 用の Active Storage ファイルを格納します。 |
| tmp | 一時ファイル（キャッシュや PID ファイルなど） |
| vendor | すべてのサードパーティコードの置き場所。一般的な Rails App では、vendored gems が含まれます |
| rubocop.yml | RuboCop の設定が含まれるファイルです |
| .ruby-version | デフォルトの Ruby バージョンが含まれるファイルです |
:::

## 用語

- puma.rb : ruby の高速な Web サーバ
- .erb : JSP/EJS/Thymeleaf 的な

## 簡単な API 書き方

### ルーティング

`config/routes.rb` に API のルーティングを追加する

- namespace で API の構造を明示的に定義できる
- 文法は `{method} {path}, to: {controller}#{action}`
  - `post("path", to: "controller#action")` の省略記法

```ruby
Rails.application.routes.draw do
  namespace :api do
    get "health", to: "health#show"

    get "aws-service/aws-services", to: "aws_service/aws_services#index"
    get "aws-service/aws-service-id/:service_name", to: "aws_service/aws_service_id#show"
    post "aws-service/aws-service-id", to: "aws_service/aws_service_id#create"
  end
```

### ルーティング先の書き方

```ruby:全部まとめ
class Api::HealthController < Api::BaseController
  def show
    begin
      # データベース接続チェック
      ActiveRecord::Base.connection.execute("SELECT 1")
      render_json_success({ status: "ok" })
    rescue => e
      Rails.logger.error "Health check failed: #{e.message}"
      render_internal_server_error({ status: "error", message: e.message })
    end
  end
end

class Api::AwsService::AwsServiceIdController < Api::BaseController
  def create
    begin # try
      # Bodyから入力値の取得
      service_params = params.permit(:name, :category, :description)
      # -----------
      # 処理
      # -----------
      render_json_success(result)

    rescue => e #catch
      render_json_error(e.message)
  end

  def show
    # パスパラメータからサービス名を取得 クエリパラメータも同じ方法で取得可能
    service_name = params[:service_name]
    # ...
  end
end

class Api::AwsService::AwsServicesController < Api::BaseController
  def index
    # ...
  end
end
```

コントローラはすべて BaseController を継承し DRY にする

```ruby
class Api::BaseController < ApplicationController
  # API共通の設定
  skip_before_action :verify_authenticity_token

  private

  def render_json_success(data = {})
    render json: data, status: :ok
  end

  def render_json_error(message, status = :bad_request)
    render json: { error: message }, status: status
  end

  def render_method_not_allowed
    render json: { error: "Method Not Allowed" }, status: :method_not_allowed
  end

  def render_internal_server_error(message = "Internal Server Error")
    render json: { error: message }, status: :internal_server_error
  end
end

class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
end

```

## DB 操作

`/models` と `config/database.yml` を編集することで、DB の設定を行う

```yaml:database.yaml
default: &default
  adapter: postgresql
  encoding: unicode
  host: <%= ENV.fetch("DB_HOST") { "DUMMY" } %>
  port: <%= ENV.fetch("DB_PORT") { 5432 } %>
  username: <%= ENV.fetch("POSTGRES_USER") { "DUMMY" } %>
  password: <%= ENV.fetch("POSTGRES_PASSWORD") { "DUMMY" } %>
  database: <%= ENV.fetch("POSTGRES_DB") { "DUMMY" } %>
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>

development:
  <<: *default
```

モデル `AwsService` に対してコントローラから操作できる

- 検索: `AwsService.where(category: category)` or `AwsService.all`
- 取得: `AwsService.find_by(name: service_name)`
- 登録: `AwsService.create(aws_service_params)`
- 更新: `AwsService.find_by(name: service_name).update(aws_service_params)`
- 削除: `AwsService.find_by(name: service_name).destroy`

```ruby:models
# 親玉
# --------------------------------------------
class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class
end

# 子ども
# --------------------------------------------
class AwsService < ApplicationRecord
  self.table_name = "aws_service"

  belongs_to :aws_category, foreign_key: :category, primary_key: :name

  validates :name, presence: true, uniqueness: true
  validates :category, presence: true
  validates :description, presence: true
end
```

# 所感

色々な言語を触っていても、文法がわかってない言語に対していきなり FW での実装は難しかった。
基本文法を学んでから手を出したほうがいい。
