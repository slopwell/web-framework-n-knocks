const healthExecuter = require("./executer.js");
const { successfully, methodNotAllowed } = require("../utils/response.js");

const healthHandler = (path, method) => {
  switch (method) {
    case "GET": {
      const output = healthExecuter.get();
      return successfully(output);
    }
    default: {
      return methodNotAllowed();
    }
  }
};

module.exports = healthHandler;
