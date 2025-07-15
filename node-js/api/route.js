const healthHandler = require("./health/handler.js");

const route = (path, method) => {
  switch (path) {
    case "/health": {
      return healthHandler(method);
    }
    default: {
      return null; // 404を返すためにnullを返す
    }
  }
};

module.exports = route;
