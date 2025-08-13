# Setup

https://guides.rubyonrails.org/install_ruby_on_rails.html#install-ruby-on-ubuntu

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

## getting started

https://guides.rubyonrails.org/getting_started.html

```sh
rails new store
```

## ディレクトリ構成

翻訳

| ファイル/フォルダ | 目的                                                                                                                                                                                                                                     |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| App               | アプリケーションのコントローラ、モデル、ビュー、ヘルパー、メーラー、ジョブ、およびアセットを格納します。このガイドでは主にこのフォルダに焦点を当てます                                                                                   |
| bin               | アプリケーションを起動する Rails スクリプトと、アプリケーションのセットアップ、更新、デプロイ、実行に使用するその他のスクリプトを格納します                                                                                              |
| config            | アプリケーションのルーティング、データベースなどの設定を格納します。これについては、「[Configuring Rails Applications](https://guides.rubyonrails.org/configuring.html)」で詳しく説明されています                                        |
| config.ru         | アプリケーションを起動するために使用される Rack ベースのサーバーの Rack 設定                                                                                                                                                             |
| db                | 現在のデータベーススキーマとデータベースマイグレーションを格納します                                                                                                                                                                     |
| Dockerfile        | Docker の設定ファイル                                                                                                                                                                                                                    |
| Gemfile           | Rails アプリケーションに必要な gem の依存関係を指定できるファイルです。これらのファイルは Bundler gem によって使用されます                                                                                                               |
| Gemfile.lock      | アプリケーションの拡張モジュール                                                                                                                                                                                                         |
| lib               | アプリケーションのログファイル                                                                                                                                                                                                           |
| log               | 静的ファイルとコンパイル済みアセットを格納します。アプリケーションが実行中の場合、このディレクトリはそのまま公開されます                                                                                                                 |
| public            | コマンドラインから実行できるタスクを特定し、読み込みます。タスクの定義は Rails のコンポーネント全体で定義されています。Rakefile を変更する代わりに、lib/tasks ディレクトリにファイルを追加することで独自のタスクを追加する必要があります |
| README.md         | アプリケーションの簡単な取扱説明書です。このファイルを編集して、アプリケーションの機能、セットアップ方法などを他の人に伝えます                                                                                                           |
| script            | 一時的または汎用的なスクリプトとベンチマークを格納します                                                                                                                                                                                 |
| storage           | SQLite データベースと Disk Service 用の Active Storage ファイルを格納します。これについては、「[Active Storage Overview](https://guides.rubyonrails.org/active_storage_overview.html)」で詳しく説明されています                          |
| test              | 単体テスト、フィクスチャ、その他のテスト器具。これらは「[Testing Rails Applications](https://guides.rubyonrails.org/testing.html)」で詳しく説明されています                                                                              |
| tmp               | 一時ファイル（キャッシュや PID ファイルなど）                                                                                                                                                                                            |
| vendor            | すべてのサードパーティコードの置き場所。一般的な Rails アプリケーションでは、vendored gems が含まれます                                                                                                                                  |
| rubocop.yml       | RuboCop の設定が含まれるファイルです                                                                                                                                                                                                     |
| .ruby-version     | デフォルトの Ruby バージョンが含まれるファイルです                                                                                                                                                                                       |
