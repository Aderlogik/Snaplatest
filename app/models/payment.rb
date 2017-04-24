class Payment < ApplicationRecord
	belongs_to :location
	belongs_to :subscription
end
