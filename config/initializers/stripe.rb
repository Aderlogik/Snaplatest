 # Stripe.api_key =  'sk_test_1pi6OyXmiHrPyIyq3PNF3oFY'
 # STRIPE_PUBLIC_KEY = 'pk_test_pnC0tV7xxqp7xlUhMH5CmseV'

Rails.configuration.stripe = {
  :publishable_key => ENV['PUBLISHABLE_KEY'],
  :secret_key      => ENV['SECRET_KEY']
}

Stripe.api_key = Rails.configuration.stripe[:secret_key]