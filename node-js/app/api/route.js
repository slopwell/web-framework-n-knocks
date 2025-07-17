const healthHandler = require("./health/handler.js");
const awsServiceHandler = require("./aws-service/index.js");

const routeTable = [
  {
    path: "/api/health",
    handler: healthHandler,
  },
  {
    path: "/api/aws-service",
    handler: awsServiceHandler,
  },
];

const route = async (simpleRequest) => {
  const target = routeTable.find((route) =>
    simpleRequest.path.startsWith(route.path)
  );

  if (target) {
    const result = await target.handler(simpleRequest);
    return result;
  }
  console.warn(
    `No handler found for path: ${simpleRequest.path}, method: ${simpleRequest.method}`
  );
  return null; // ルートが見つからない場合はnullを返す
};

module.exports = route;
