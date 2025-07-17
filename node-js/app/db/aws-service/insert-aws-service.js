const { runSql } = require("../core.js");

const insertAwsService = async (awsService, description, category) => {
  // 1つのクエリで以下をチェック:
  // - categoryがaws_categoryテーブルに存在するか
  // - nameが既存のaws_serviceと衝突しないか
  const validationSql = `
    WITH category_check AS (
      SELECT COUNT(*) as category_exists
      FROM aws_category
      WHERE name = $3
    ),
    name_check AS (
      SELECT COUNT(*) as name_exists
      FROM aws_service
      WHERE name = $1
    )
    SELECT
      category_check.category_exists,
      name_check.name_exists
    FROM category_check, name_check;
  `;

  const validationResult = await runSql(validationSql, [
    awsService,
    description,
    category,
  ]);
  const { category_exists, name_exists } = validationResult.rows[0];

  // バリデーションチェック
  if (parseInt(category_exists) === 0) {
    throw new Error(
      `Category '${category}' does not exist in aws_category table`
    );
  }

  if (parseInt(name_exists) > 0) {
    throw new Error(`AWS service name '${awsService}' already exists`);
  }

  // バリデーションが通った場合のみINSERTを実行
  const insertSql = `
    INSERT INTO aws_service (name, description, category)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const params = [awsService, description, category];
  return runSql(insertSql, params);
};

module.exports = insertAwsService;
