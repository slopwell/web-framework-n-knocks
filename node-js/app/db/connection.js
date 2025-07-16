const { Pool } = require("pg");

const config = {
  host: process.env.DB_HOST ?? "db",
  port: process.env.DB_PORT ?? 5432,
  database: process.env.POSTGRES_DB ?? "mydatabase",
  user: process.env.POSTGRES_USER ?? "myuser",
  password: process.env.POSTGRES_PASSWORD ?? "mypassword",
  max: 20, // 最大接続数
  idleTimeoutMillis: 30000, // アイドル時間
  connectionTimeoutMillis: 2000, // 接続タイムアウト
};

console.log("DB Config: %o", config);

// コネクションプールの作成
const pool = new Pool(config);

pool.on("error", (err) => {
  console.error("new Pool error", err);
  process.exit(-1);
});

const getConnectionPool = () => {
  return pool;
};

module.exports = {
  getConnectionPool,
};
