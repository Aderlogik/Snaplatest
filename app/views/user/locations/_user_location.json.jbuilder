json.extract! user_location, :id, :name, :address, :city, :state, :zip, :country, :area, :acres, :created_at, :updated_at
json.url user_location_url(user_location, format: :json)
