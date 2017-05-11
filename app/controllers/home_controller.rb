class HomeController < ApplicationController
  skip_before_action :authenticate_user!, :only => [:index, :book_service]
  layout false, only: [:book_service]
  def index
  end
  
  def book_service
    @subscription = Subscription.new
  end
end
