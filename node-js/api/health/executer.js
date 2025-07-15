const getHealthStatus = () => {
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "ok" }),
  };
};

const healthExecuter = {
  get: getHealthStatus,
};

module.exports = healthExecuter;
