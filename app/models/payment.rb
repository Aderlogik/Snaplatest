class Payment < ApplicationRecord
	belongs_to :location
	belongs_to :subscription
  belongs_to :user
	has_many :payment_methods
end
