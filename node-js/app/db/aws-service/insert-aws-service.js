const { runSql } = require("../core.js");

const insertAwsService = async (input) => {
  const { name, description, category } = input;
  const insertSql = `
    INSERT INTO aws_service (name, description, category)
    VALUES ($1, $2, $3)
    ;
  `;
  const params = [name, description, category];
  return await runSql(insertSql, params);
};

module.exports = insertAwsService;
