class Subscription < ApplicationRecord
  belongs_to :user
  belongs_to :subplan, foreign_key: 'sub_plan_id'
  belongs_to :plan
  belongs_to :service
  belongs_to :schedule
  has_one :location
  has_many :subscription_extra_services

  attr_accessor :sub_plan_id_temp, :service_id_temp
  accepts_nested_attributes_for :location
  accepts_nested_attributes_for :subscription_extra_services
  validates_presence_of :sub_plan_id, :plan_id 
  
  def get_total_price
    price.to_f + processing_fee.to_f + recurring_fee.to_f + (extra_service_price.to_f rescue 0)
  end
end
