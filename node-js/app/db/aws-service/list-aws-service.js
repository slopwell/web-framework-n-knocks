const { runSql } = require("../core.js");

const listAwsServices = async (category) => {
  const sql = category
    ? "SELECT * FROM aws_service WHERE category = $1;"
    : "SELECT * FROM aws_service;";
  const params = category ? [category] : [];
  return runSql(sql, params);
};

module.exports = listAwsServices;
