class Api::BaseController < ApplicationController
  # API共通の設定
  skip_before_action :verify_authenticity_token

  private

  def render_json_success(data = {})
    render json: data, status: :ok
  end

  def render_json_error(message, status = :bad_request)
    render json: { error: message }, status: status
  end

  def render_method_not_allowed
    render json: { error: "Method Not Allowed" }, status: :method_not_allowed
  end

  def render_internal_server_error(message = "Internal Server Error")
    render json: { error: message }, status: :internal_server_error
  end
end
