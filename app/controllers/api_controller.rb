class ApiController < ApplicationController
  # GET /unsubscribe
  def unsubscribe
    if User.exists?(secret_token: params[:token])
      @user = User.where(secret_token: params[:token]).first
      @user.update_attributes(subscribed: false)
      redirect_to root_url, alert: "Successfully unsubscribed"
    end
  end
end
