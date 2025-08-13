# Rails AWS Service API

このプロジェクトは、Node.js で作成された AWS Service API を Ruby on Rails で再実装したものです。

## API エンドポイント

### ヘルスチェック

- `GET /api/health` - アプリケーションとデータベースの状態確認

### AWS サービス管理

- `GET /api/aws_service/aws-services` - 全 AWS サービス一覧取得
- `GET /api/aws_service/aws-services?category=compute` - カテゴリ別 AWS サービス一覧取得
- `GET /api/aws_service/aws-service-id/:service_name` - 特定の AWS サービス情報取得
- `POST /api/aws_service/aws-service-id` - 新しい AWS サービス追加

## セットアップ

### 1. 依存関係のインストール

```bash
bundle install
```

### 2. データベースのセットアップ

```bash
# PostgreSQLを起動
docker compose up -d db

# データベースの準備（初期データは既にPostgreSQLコンテナで実行済み）
bundle exec rails db:create
```

### 3. アプリケーションの起動

```bash
# Dockerを使用する場合
docker compose up

# ローカルで実行する場合
bundle exec rails server
```

## API 使用例

### ヘルスチェック

```bash
curl http://localhost:3000/api/health
```

### 全 AWS サービス一覧

```bash
curl http://localhost:3000/api/aws_service/aws-services
```

### カテゴリ別サービス一覧

```bash
curl "http://localhost:3000/api/aws_service/aws-services?category=compute"
```

### 特定サービス取得

```bash
curl http://localhost:3000/api/aws_service/aws-service-id/ec2
```

### 新しいサービス追加

```bash
curl -X POST http://localhost:3000/api/aws_service/aws-service-id \
  -H "Content-Type: application/json" \
  -d '{
    "name": "dynamodb",
    "category": "database",
    "description": "NoSQL Database Service"
  }'
```

## 技術スタック

- Ruby on Rails 8.0.2
- PostgreSQL
- Docker & Docker Compose

## 環境変数

- `DATABASE_HOST` - データベースホスト (デフォルト: localhost)
- `DATABASE_PORT` - データベースポート (デフォルト: 5432)
- `DATABASE_USERNAME` - データベースユーザー (デフォルト: postgres)
- `DATABASE_PASSWORD` - データベースパスワード (デフォルト: password)
- `DATABASE_NAME` - データベース名 (デフォルト: webframe)
