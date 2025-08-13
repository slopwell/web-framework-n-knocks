class Api::HealthController < Api::BaseController
  def show
    begin
      # データベース接続チェック
      ActiveRecord::Base.connection.execute("SELECT 1")
      render_json_success({ status: "ok" })
    rescue => e
      Rails.logger.error "Health check failed: #{e.message}"
      render_internal_server_error({ status: "error", message: e.message })
    end
  end
end
