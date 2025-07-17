const awsServiceExecuter = require("../executer.js");
const { successfully, methodNotAllowed } = require("../../utils/response.js");

const awsServices = async ({ method, ...rest }) => {
  switch (method) {
    case "GET": {
      const output = await awsServiceExecuter.list(rest);
      return successfully(output);
    }
    default: {
      return methodNotAllowed();
    }
  }
};

module.exports = awsServices;
