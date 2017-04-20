class Subscription < ApplicationRecord
  belongs_to :user
  belongs_to :sub_plan
  belongs_to :plan
  belongs_to :service
  belongs_to :schedule
  has_one :location

  attr_accessor :sub_plan_id_temp, :service_id_temp
  accepts_nested_attributes_for :location
  validates_presence_of :sub_plan_id, :plan_id 
end
