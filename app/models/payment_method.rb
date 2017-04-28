class PaymentMethod < ApplicationRecord
	belongs_to :payment
	belongs_to :subscription
end
