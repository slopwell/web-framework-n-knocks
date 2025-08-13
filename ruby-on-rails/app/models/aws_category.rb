class AwsCategory < ApplicationRecord
  self.table_name = "aws_category"

  has_many :aws_services, foreign_key: :category, primary_key: :name

  validates :name, presence: true, uniqueness: true
end
