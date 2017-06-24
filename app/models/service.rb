class Service < ApplicationRecord
	belongs_to :subscription	
  has_many :service_season
  
  def self.get_edging_service_id
    Service.where(:service_name => "Edging of shrub & plant beds to maintain neat appearance").first.id
  end
  
  def self.get_mulching_service_id
    Service.where(:service_name => "Mulching").first.id
  end
end
