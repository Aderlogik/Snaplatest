class Payment < ApplicationRecord
	belongs_to :location
	belongs_to :subscription
	has_many :payment_methods
end
