class Service < ApplicationRecord
	belongs_to :subscription	
  has_many :service_season
end
