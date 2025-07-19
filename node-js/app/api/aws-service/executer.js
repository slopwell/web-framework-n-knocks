const awsServiceDao = require("../../db/aws-service/index.js");

const getAwsService = async ({ pathList }) => {
  const targetService = pathList[1];
  const result = await awsServiceDao.get(targetService);
  return result;
};

const listAwsServicesByCategory = async ({ query }) => {
  const { category } = query;
  return await awsServiceDao.list(category);
};

const pushAwsService = async ({ body }) => {
  const result = await awsServiceDao.insert(body);
  return result;
};

const awsServiceExecuter = {
  list: listAwsServicesByCategory,
  get: getAwsService,
  push: pushAwsService,
};

module.exports = awsServiceExecuter;
