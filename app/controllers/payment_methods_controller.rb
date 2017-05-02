class PaymentMethodsController < ApplicationController
	def new
		@payment_method = PaymentMethod.new
	end

  def index
     @payment_methods = PaymentMethod.all
  end

	def create 
	 begin
     @amount = 500
    require "stripe"
    Stripe.api_key = "sk_test_1pi6OyXmiHrPyIyq3PNF3oFY"
    token = Stripe::Token.create(:card => {:number => params[:payment_method][:card_number],:exp_month => params[:payment_method][:exp_month], :exp_year => params[:payment_method][:exp_year],:cvc => params[:payment_method][:cvc]})


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
    @payment_method = PaymentMethod.new(payment_method_params)

    respond_to do |format|
      if @payment_method.save
        format.html { redirect_to payment_methods_path, notice: 'payment_method was successfully created.' }
        format.json { render :show, status: :created, location: @payment_method }
      else
        format.html { render :new }
        format.json { render json: @payment_method.errors, status: :unprocessable_entity }
      end
    end
   rescue Exception => e
     respond_to do |format|
      format.html { redirect_to payment_methods_path, alert: '#{e.message}' }
     end
   end
   
	end
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_payment_method
      @payment_method = PaymentMethod.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def payment_method_params
      params.require(:payment_method).permit(:card_number, :card_holder_name, :cvv, :exp_month, :exp_year )
    end
end

