const getAwsService = require("./get-aws-service.js");
const listAwsServices = require("./list-aws-service.js");
const insertAwsService = require("./insert-aws-service.js");

const awsServiceDao = {
  get: getAwsService,
  list: listAwsServices,
  insert: insertAwsService,
};
module.exports = awsServiceDao;
