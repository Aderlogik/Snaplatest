json.extract! subscription, :id, :plan_id, :sub_plan_id, :schedule_id, :user_id, :technician_id, :created_at, :updated_at
json.url subscription_url(subscription, format: :json)
