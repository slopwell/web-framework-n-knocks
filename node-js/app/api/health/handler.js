const healthExecuter = require("./executer.js");
const {
  successfully,
  methodNotAllowed,
  internalServerError,
} = require("../utils/response.js");

const healthHandler = async ({ method }) => {
  console.log(`[healthHandler] method: ${method}`);
  switch (method) {
    case "GET": {
      const output = await healthExecuter.get();
      if (output.status !== "ok") {
        return internalServerError(output);
      }
      return successfully(output);
    }
    default: {
      return methodNotAllowed();
    }
  }
};

module.exports = healthHandler;
