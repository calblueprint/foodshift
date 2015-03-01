class ApiController < ApplicationController
  # GET /unsubscribe
  def unsubscribe
    @user = User.where(:secret_token => params[:token]).first
    @user.update_attributes(:subscribed => false)
    redirect_to root_url, alert: "Successfully unsubscribed"
  end
end
