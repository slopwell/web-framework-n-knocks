const healthExecuter = require("./executer.js");
const { methodNotAllowed } = require("../utils/response.js");

const healthHandler = (method) => {
  switch (method) {
    case "GET": {
      return healthExecuter.get();
    }
    default: {
      return methodNotAllowed();
    }
  }
};

module.exports = healthHandler;
