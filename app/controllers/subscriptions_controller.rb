class SubscriptionsController < ApplicationController
  before_action :set_subscriptions
  before_action :set_subscription, only: [:show, :edit, :update, :destroy]

  # GET users/1/subscriptions
  def index
    @subscriptions = @user.subscriptions
  end

  # GET users/1/subscriptions/1
  def show
  end

  # GET users/1/subscriptions/new
  def new
    @subscription = @user.subscriptions.build
    @location = Location.new(:user=>@user)
  end

  # GET users/1/subscriptions/1/edit
  def edit
  end

  # POST users/1/subscriptions
  def create
    @subscription = @user.subscriptions.build(subscription_params)
    if @subscription.save
      redirect_to new_payment_path(current_user)
    else
      render action: 'new'
    end
  end

  # PUT users/1/subscriptions/1
  def update
    if @subscription.update_attributes(subscription_params)
      redirect_to([@subscription.user, @subscription], notice: 'Subscription was successfully updated.')
    else
      render action: 'edit'
    end
  end

  # DELETE users/1/subscriptions/1
  def destroy
    @subscription.destroy

    redirect_to user_subscriptions_url(@user)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_subscriptions
      @user = User.find(params[:user_id])
    end

    def set_subscription
      @subscription = @user.subscriptions.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def subscription_params
      params.require(:subscription).permit! #(:plan_id, :sub_plan_id, :schedule_id, :user_id, :technician_id)
    end
end
