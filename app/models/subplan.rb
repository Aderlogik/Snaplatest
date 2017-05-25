class Subplan < ApplicationRecord
	
  def get_sub_plan_month
    if name == "Monthly"
      1
    elsif name == "Quaterly"
      3
    elsif name == "Half Yearly"
      6
    end
  end
end
