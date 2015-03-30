class RegistrationsController < Devise::RegistrationsController
  respond_to :json
  before_filter :configure_permitted_parameters, :only => [:create]

  protected
    def configure_permitted_parameters
      devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:email, :password, :password_confirmation, :type) }
    end
end
