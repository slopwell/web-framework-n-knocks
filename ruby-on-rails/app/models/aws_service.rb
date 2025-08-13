class AwsService < ApplicationRecord
  self.table_name = "aws_service"

  belongs_to :aws_category, foreign_key: :category, primary_key: :name

  validates :name, presence: true, uniqueness: true
  validates :category, presence: true
  validates :description, presence: true
end
