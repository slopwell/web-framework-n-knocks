const healthHandler = require("./health/handler.js");
const awsServiceHandler = require("./aws-service/handler.js");

const routeTable = [
  {
    path: "/health",
    handler: healthHandler,
  },
  {
    path: "/aws-service",
    handler: awsServiceHandler,
  },
];

const route = async (path, method) => {
  const target = routeTable.find((route) => path.startsWith(route.path));

  if (target) {
    const result = await target.handler(path, method);
    return result;
  }
  console.warn(`No handler found for path: ${path}, method: ${method}`);
  return null; // ルートが見つからない場合はnullを返す
};

module.exports = route;
