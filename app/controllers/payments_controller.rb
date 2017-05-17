class PaymentsController < ApplicationController
  before_action :set_payment, only: [:show, :edit, :update, :destroy]
  before_action :set_user_and_subscription, only: [:new, :show, :create]

  # GET /payments
  # GET /payments.json
  def index
    @payments = current_user.payments
    @payment_methods = current_user.payment_methods
    
    if @payments.size > 0
      @payment = @payments.first
      @user = User.find(@payment.user_id)
      @subscription = Subscription.find(@payment.subscription_id)
      @location = @subscription.location  
    end
  end

  # GET /payments/1
  # GET /payments/1.json
  def show
    @location = @subscription.location  
  end

  # GET /payments/new
  def new
    @payment = Payment.new(:user => @user, :subscription => @subscription)
  end

  # GET /payments/1/edit
  def edit
  end

  # POST /payments
  # POST /payments.json
  def create
    @amount = 500
    require "stripe"
    Stripe.api_key = "sk_test_1pi6OyXmiHrPyIyq3PNF3oFY"
    token = Stripe::Token.create(:card => {:number => params[:payment][:card_number],:exp_month => params[:payment][:exp_month], :exp_year => params[:payment][:exp_year],:cvc => params[:payment][:cvc]})


    customer = Stripe::Customer.create(
      email: "prashant@example.com",
      source: token
    )
    
    charge = Stripe::Charge.create(
      customer: customer.id,
      amount: @amount,
      description: 'Rails Stripe customer',
      currency: 'usd'
    )
    
    # rescue Stripe::CardError => e
    # flash[:error] = e.message
    
    @payment = Payment.new(payment_params)
    @payment.user = @user
    @payment.subscription = @subscription 

    respond_to do |format|
      if @payment.save
        format.html { redirect_to payments_path, notice: 'Payment was successfully created.' }
        format.json { render :show, status: :created, location: @payment }
      else
        format.html { render :new }
        format.json { render json: @payment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /payments/1
  # PATCH/PUT /payments/1.json
  def update
    respond_to do |format|
      if @payment.update(payment_params)
        format.html { redirect_to @payment, notice: 'Payment was successfully updated.' }
        format.json { render :show, status: :ok, location: @payment }
      else
        format.html { render :edit }
        format.json { render json: @payment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /payments/1
  # DELETE /payments/1.json
  def destroy
    @payment.destroy
    respond_to do |format|
      format.html { redirect_to payments_url, notice: 'Payment was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_payment
    @payment = Payment.find(params[:id])
  end
  
  def set_user_and_subscription
    @user = User.find(params[:user_id])
    @subscription = Subscription.find(params[:subscription_id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def payment_params
    params.require(:payment).permit(:card_number, :card_holder_name, :exp_month, :exp_year, :cvc)
  end
end
