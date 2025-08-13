class Api::AwsService::AwsServiceIdController < Api::BaseController
  def show
    begin
      service_name = params[:service_name]

      if service_name.blank?
        return render_json_error("Service name is required")
      end

      service = AwsService.find_by(name: service_name)

      if service.nil?
        return render json: { error: "Service not found" }, status: :not_found
      end

      result = {
        id: service.id,
        name: service.name,
        category: service.category,
        description: service.description
      }

      render_json_success(result)
    rescue => e
      Rails.logger.error "Error fetching AWS service: #{e.message}"
      render_internal_server_error(e.message)
    end
  end

  def create
    begin
      service_params = params.permit(:name, :category, :description)

      # バリデーション
      if service_params[:name].blank?
        return render_json_error("Name is required")
      end

      if service_params[:category].blank?
        return render_json_error("Category is required")
      end

      if service_params[:description].blank?
        return render_json_error("Description is required")
      end

      # カテゴリの存在確認
      unless AwsCategory.exists?(name: service_params[:category])
        return render_json_error("Category does not exist")
      end

      # サービスの作成
      service = AwsService.new(service_params)

      if service.save
        result = {
          id: service.id,
          name: service.name,
          category: service.category,
          description: service.description
        }
        render_json_success(result)
      else
        render_json_error(service.errors.full_messages.join(", "))
      end
    rescue => e
      Rails.logger.error "Error creating AWS service: #{e.message}"
      render_internal_server_error(e.message)
    end
  end
end
