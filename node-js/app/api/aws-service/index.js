const awsServiceId = require("./handler/aws-service-id.js");
const awsServices = require("./handler/aws-services.js");
const { badRequest } = require("../utils/response.js");

const awsServiceHandler = async (input) => {
  const { pathList } = input;
  switch (pathList[0]) {
    case "aws-services": {
      return awsServices(input);
    }
    case "aws-service-id": {
      return awsServiceId(input);
    }
    default: {
      return badRequest();
    }
  }
};

module.exports = awsServiceHandler;
