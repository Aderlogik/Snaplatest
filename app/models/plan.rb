class Plan < ApplicationRecord
  has_many :subplans
  
  def self.get_formatted_today
    "#{Date.today.strftime("%b")} #{Date.today.strftime("%d").to_i.ordinalize}"
  end
  
  def self.get_formatted_next_month
    "#{(Date.today + 1.month).strftime("%b")} #{Date.today.strftime("%d").to_i.ordinalize}"
  end
end
