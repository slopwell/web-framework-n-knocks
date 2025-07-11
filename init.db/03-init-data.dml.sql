INSERT INTO aws_category (name) VALUES
   ('compute')
  ,('storage')
  ,('database')
  ,('networking')
  ,('security')
  ,('analytics')
  ,('machine-learning')
  ,('application-integration')
  ,('developer-tools')
  ,('management-tools')
  ,('mobile-services')
  ,('customer-engagement')
  ,('game-tech')
;


INSERT INTO aws_service (name, category, description) VALUES
   ('ec2', 'compute', 'Elastic Compute Cloud')
  ,('s3', 'storage', 'Simple Storage Service')
  ,('rds', 'database', 'Relational Database Service')
  ,('lambda', 'compute', 'Serverless Compute Service')
;
