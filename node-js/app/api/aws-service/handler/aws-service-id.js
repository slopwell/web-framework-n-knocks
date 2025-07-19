const awsServiceExecuter = require("../executer.js");
const {
  successfully,
  methodNotAllowed,
} = require("../../../utils/response.js");

const awsServiceId = async ({ method, ...rest }) => {
  switch (method) {
    case "GET": {
      const output = await awsServiceExecuter.get(rest);
      return successfully(output);
    }
    case "POST": {
      const output = await awsServiceExecuter.push(rest);
      return successfully(output);
    }
    default: {
      return methodNotAllowed();
    }
  }
};

module.exports = awsServiceId;
