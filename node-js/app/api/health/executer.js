const { testConnection } = require("../../db/core.js");

const getHealthStatus = () => {
  const health = testConnection();
  if (health) {
    return { status: "ok" };
  }
  return { status: "error", message: "Database connection failed" };
};

const healthExecuter = {
  get: getHealthStatus,
};

module.exports = healthExecuter;
