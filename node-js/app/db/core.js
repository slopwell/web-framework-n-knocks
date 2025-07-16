const { getConnectionPool } = require("./connection.js");
const connectionPool = getConnectionPool();

const connectDatabase = async () => {
  try {
    const client = await connectionPool.connect();
    console.log("DB connect successfully.");
    client.release(); // テスト接続なので、すぐにリリース
  } catch (error) {
    console.error("Error DB connect", error);
  }
};

const closeDatabase = async () => {
  try {
    await connectionPool.end();
  } catch (error) {
    console.error("Error DB close", error);
  }
};

const runSql = async (sql, params = []) => {
  let client;
  try {
    client = await connectionPool.connect();
    const result = await client.query(sql, params);
    return result.rows;
  } catch (error) {
    console.error("Error executing SQL: %o", error);
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
};

const testConnection = async () => {
  let client;
  try {
    client = await connectionPool.connect();
    console.log("DB connection test successful.");
  } catch (error) {
    console.error("DB connection test failed: %o", error);
  } finally {
    if (client) {
      client.release();
    }
  }
  return client !== undefined;
};

module.exports = {
  connectDatabase,
  closeDatabase,
  testConnection,
  runSql,
};
