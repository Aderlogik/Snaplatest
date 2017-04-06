json.extract! user_subscription, :id, :plan_id, :sub_plan_id, :schedule_id, :user_id, :technician_id, :created_at, :updated_at
json.url user_subscription_url(user_subscription, format: :json)
