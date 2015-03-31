class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << :type
  end

  def after_sign_in_path_for(user)
    return donor_profile_path if user.type == User.type_donor
    return recipient_profile_path if user.type == User.type_recipient
    return coordinator_schedule_path if user.type == User.type_coordinator
    root_path
  end

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_url, alert: exception.message
  end

  # Converts a string that represents a UNIX timestamp in milliseconds (the
  # default in Javascript) to a Ruby Time object
  def js_timestamp_to_time(timestamp)
    Time.at(timestamp.to_i / 1000)
  end
end
