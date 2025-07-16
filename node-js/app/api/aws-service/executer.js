const awsServiceDao = require("../../db/aws-service/index.js");
const getAwsService = async ({ pathList }) => {
  const targetService = pathList[1];
  const result = await awsServiceDao.get(targetService);
  return result;
};

const listAwsServicesByCategory = () => {};
const pushAwsService = () => {};

const awsServiceExecuter = {
  list: listAwsServicesByCategory,
  get: getAwsService,
  push: pushAwsService,
};

module.exports = awsServiceExecuter;
