json.extract! payment, :id, :card_number, :card_holder_name, :cvv, :subscription_id, :location_id, :user_id, :created_at, :updated_at
json.url payment_url(payment, format: :json)
