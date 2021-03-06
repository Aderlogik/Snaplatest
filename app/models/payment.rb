class Payment < ApplicationRecord
	belongs_to :location
	belongs_to :subscription
  belongs_to :user
  
  def get_total_price
    price.to_f + processing_fee.to_f + recurring_fee.to_f + (extra_service_price.to_f rescue 0)
  end  
end
