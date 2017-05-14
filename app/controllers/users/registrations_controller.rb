class Users::RegistrationsController < Devise::RegistrationsController
  # before_action :configure_sign_up_params, only: [:create]
 before_action :configure_account_update_params, only: [:update]
 before_action :configure_user_create_params, only: [:create]
 layout false, only: [:new]

  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
   def create
     super
     
     Rails.logger.debug resource.errors.details
     resource.skip_confirmation!
     resource.user_role = true
     if resource.save
       #update user for newly created subscription
       @subscription = Subscription.find(params["subcription_id"])
       @subscription.update(:user_id => resource.id)
       @subscription.location.update(:user_id => resource.id)
       #payment
        @amount = 500
        require "stripe"
        Stripe.api_key = "sk_test_1pi6OyXmiHrPyIyq3PNF3oFY"
        token = Stripe::Token.create(:card => {:number => params["card_number"],:exp_month => params["exp_month"], :exp_year => params["exp_year"],:cvc => params["cvc"]})


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

        @payment = Payment.new({:card_number => params["card_number"], :card_holder_name => params["card_holder_name"],:exp_month => params["exp_month"], :exp_year => params["exp_year"],:cvc => params["cvc"]})
        @payment.user_id = resource.id
        @payment.subscription = @subscription        
        @payment.save
     end
   end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  # end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end

  protected

   def configure_account_update_params
     devise_parameter_sanitizer.permit(:account_update, keys: [:phone, :secondary_phone, :personal_email])
   end
   
   def configure_user_create_params
     devise_parameter_sanitizer.permit(:user, keys: [:email, :first_name, :last_name, :phone])
   end
  
  def after_update_path_for(resource)
    edit_user_registration_path
  end 

  def update_resource(resource, params)
    if params[:password].nil?
      resource.update_without_password(params)
    else
       @user = User.find(current_user.id)
      if @user.update_attributes(params)
        # Sign in the user by passing validation in case their password changed
        bypass_sign_in(@user)
      else
      end
    end
  end
end
