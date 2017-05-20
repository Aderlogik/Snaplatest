class PaymentMethodsController < ApplicationController
	def new
		@payment_method = PaymentMethod.new
	end
  
  def edit
    @payment_method = PaymentMethod.find(params[:id])
  end

	def create 
    require "stripe"
    Stripe.api_key = "sk_test_1pi6OyXmiHrPyIyq3PNF3oFY"
    token = Stripe::Token.create(:card => {:number => params[:payment_method][:card_number],:exp_month => params[:payment_method][:exp_month], :exp_year => params[:payment_method][:exp_year],:cvc => params[:payment_method][:cvc]})


    customer = Stripe::Customer.create(
      email: "prashant@example.com",
      source: token
    )
    
    @payment_method = PaymentMethod.new(payment_method_params)
    @payment_method.user_id = current_user.id

    respond_to do |format|
      if @payment_method.save
        format.html { redirect_to payments_path, notice: 'Payment method was successfully created.' }
        format.json { render :show, status: :created, location: @payment_method }
      else
        format.html { render :new }
        format.json { render json: @payment_method.errors, status: :unprocessable_entity }
      end
    end
	end
  
  def update
    respond_to do |format|
      @payment_method = PaymentMethod.find(params[:id])
      if @payment_method.update(payment_method_params)
        format.html { redirect_to payments_path, notice: 'Payment method was successfully updated.' }
        format.json { render :show, status: :ok, location: @payment_method }
      else
        format.html { render :edit }
        format.json { render json: @payment_method.errors, status: :unprocessable_entity }
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
    params.require(:payment_method).permit(:card_number, :card_holder_name, :cvc, :exp_month, :exp_year )
  end
end

