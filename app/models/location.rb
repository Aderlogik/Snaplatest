class Location < ApplicationRecord
  belongs_to :user
  belongs_to :subscription
  validates_presence_of :area_in_feet, :area_in_acres
end


