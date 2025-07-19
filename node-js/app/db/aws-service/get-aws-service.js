const { runSql } = require("../core.js");

const getAwsService = async (name) => {
  const query = `
    SELECT
      s.*,
      c.name
    FROM
      aws_service as s
    LEFT JOIN aws_category as c
      ON s.category = c.name
    WHERE s.name = $1
    ;`;
  const result = await runSql(query, [name]);
  return result;
};

module.exports = getAwsService;
