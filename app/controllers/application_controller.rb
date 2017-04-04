class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  # load_and_authorize_resource
  layout :layout_by_resource

  def after_sign_in_path_for(resource)
    if resource.user_role?
      user_services_path(resource)
    else
      admin_dashboard_path(resource)
    end
  end

  def after_sign_out_path_for(resource)
    root_path
  end

  private

  def layout_by_resource
    if params[:controller] == "devise/sessions" || params[:controller] == "users/sessions"
      "landing"
    elsif params[:controller] == "users/passwords"
      "register"
    else
      "application"
    end
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:user) { |u| u.permit(:email, :password, :password_confirmation, :current_password)}
  end
end
