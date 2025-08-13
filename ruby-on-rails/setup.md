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

| ファイル/フォルダ | 目的                                                                                                       |
| :---------------- | :--------------------------------------------------------------------------------------------------------- |
| App               | App のコントローラ、モデル、ビューなどを格納します。                                                       |
| bin               | App を起動する Rails スクリプトなどその他のスクリプトを格納します                                          |
| config            | App のルーティング、データベースなどの設定を格納します。                                                   |
| config.ru         | App を起動するために使用される Rack ベースのサーバーの Rack 設定                                           |
| db                | 現在のデータベーススキーマとデータベースマイグレーションを格納します                                       |
| Dockerfile        | Docker の設定ファイル                                                                                      |
| Gemfile           | Rails App に必要な gem の依存関係を指定できるファイルです。                                                |
| Gemfile.lock      |                                                                                                            |
| lib               | App の拡張モジュール                                                                                       |
| log               | App のログファイル                                                                                         |
| public            | 静的ファイルとコンパイル済みアセットを格納します。App が実行中の場合、このディレクトリはそのまま公開される |
| Rakefile          | Rails のコンポーネント全体で定義されているタスクを読み込み、コマンドラインから実行できるようにします。     |
| README.md         | README                                                                                                     |
| script            | 一時的または汎用的なスクリプトとベンチマークを格納します                                                   |
| storage           | SQLite データベースと Disk Service 用の Active Storage ファイルを格納します。                              |
| tmp               | 一時ファイル（キャッシュや PID ファイルなど）                                                              |
| vendor            | すべてのサードパーティコードの置き場所。一般的な Rails App では、vendored gems が含まれます                |
| rubocop.yml       | RuboCop の設定が含まれるファイルです                                                                       |
| .ruby-version     | デフォルトの Ruby バージョンが含まれるファイルです                                                         |
