class Api::AwsService::AwsServicesController < Api::BaseController
  def index
    begin
      category = params[:category]

      if category.present?
        # カテゴリ指定ありの場合
        services = AwsService.where(category: category)
      else
        # カテゴリ指定なしの場合はすべて取得
        services = AwsService.all
      end

      result = services.map do |service|
        {
          id: service.id,
          name: service.name,
          category: service.category,
          description: service.description
        }
      end

      render_json_success(result)
    rescue => e
      Rails.logger.error "Error fetching AWS services: #{e.message}"
      render_internal_server_error(e.message)
    end
  end
end
