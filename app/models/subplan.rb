class Subplan < ApplicationRecord
	belongs_to :plan
  def get_sub_plan_month
    if name == "Trial"
      1
    elsif name == "Seasonal"
      ((Date.new(2017, 11, 30) - Date.today)/30).round
    end
  end
  
  def get_date_ranges
    if name == "Trial"
      "#{Date.today.strftime("%b")} #{Date.today.strftime("%d").to_i.ordinalize} - 
       #{(Date.today + 1.month).strftime("%b")} #{Date.today.strftime("%d").to_i.ordinalize}"
    elsif name == "Seasonal"
      "#{Date.today.strftime("%b")} #{Date.today.strftime("%d").to_i.ordinalize} -
      November 30th"
    end
  end
  
  def get_committed_sevices
    if self.plan.name.downcase == "weekly"
      self.get_sub_plan_month * 4
    else
      self.get_sub_plan_month * 2
    end
  end
end
