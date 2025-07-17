const { testConnection } = require("../../db/core.js");

const getHealthStatus = async () => {
  const health = await testConnection();
  console.log("qaaaaaaaaaaaaaaaaaaaaaaaaaa", health);
  if (health) {
    return { status: "ok" };
  }
  return { status: "error", message: "Database connection failed" };
};

const healthExecuter = {
  get: getHealthStatus,
};

module.exports = healthExecuter;
