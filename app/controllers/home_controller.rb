class HomeController < ApplicationController
  skip_before_action :authenticate_user!, :only => [:index, :book_service, :new_service, :new_service_payment]
  layout false, only: [:book_service, :new_service, :new_service_payment]
  def index
  end
  
  def book_service
    @subscription = Subscription.new
  end
  
  def new_service
    @subscription = Subscription.new(subscription_params)
    if @subscription.save
      #save extra services
      params["subcription_extra_service"].each{|id, attributes|
        SubscriptionExtraService.create!(:subscription_id => @subscription.id, :service_id => id)
      }
      redirect_to new_user_registration_path(:id =>  @subscription.id)
    end    
  end
  
  def new_service_payment
    
  end
  
  private
  # Only allow a trusted parameter "white list" through.
  def subscription_params
    params.require(:subscription).permit! #(:plan_id, :sub_plan_id, :schedule_id, :user_id, :technician_id)
  end 
end
