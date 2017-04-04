class LandingController < ApplicationController
	
	def after_sign_in_path_for(resource)
		if resource.user_role?
      		user_services_path
    	else
      		admin_dashboard_path(resource)
    	end
  	end
end