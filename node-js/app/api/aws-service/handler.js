const awsServiceExecuter = require("./executer");
const { successfully, methodNotAllowed } = require("../utils/response.js");

const awsServiceHandler = async ({ method, ...rest }) => {
  switch (method) {
    case "GET": {
      const output = await awsServiceExecuter.get(rest);
      return successfully(output);
    }
    default: {
      return methodNotAllowed();
    }
  }
};

module.exports = awsServiceHandler;
