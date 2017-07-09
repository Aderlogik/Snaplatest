  class ServiceSeason < ApplicationRecord
  belongs_to :service
  
  def get_season_image
    if is_season_passed
      "#{name.downcase.gsub(/\s\&/, '').gsub(/\s/, '_')}_off.png"
    else
      "#{name.downcase.gsub(/\s\&/, '').gsub(/\s/, '_')}.png"
    end
  end
  
  def is_season_passed
    if name.include?("&")
      Date.parse(end_date.split(" - ")[1]) < Date.today
    else
      Date.parse(end_date) < Date.today
    end
  end
  
  def get_date_range_string(season_name, start_date, end_date)
    start_date = Date.parse(start_date)
    end_date = Date.parse(end_date)
    "#{season_name} - #{start_date.strftime("%b")} #{start_date.strftime("%d")} till #{end_date.strftime("%b")} #{end_date.strftime("%d")}"
  end
  
  def self.get_available_slots_for_range(season, season_name, selected_day, start_date, end_date)
    start_date = Date.parse(start_date)
    end_date = Date.parse(end_date)
    if start_date < Date.today && Date.today < end_date
      start_date = Date.today
    end
    available_slots = {season: season_name, days: {}}
    is_default_added = false
    (start_date..end_date).to_a.group_by(&:month).each{|month, days| 
      available_formatted_days = days.select{|day| day.wday == selected_day}.map{|day| 
        is_day_passed = day < Date.today
        is_default = false
        if !is_day_passed
          if(season.service.frequency == 1 && is_default_added)
          else
            is_default = day.week_of_month == season.service.default_week
            is_default_added = true if is_default
          end
        end
        [is_day_passed, is_default, day]
      }
      available_slots[:days][Date::ABBR_MONTHNAMES[month]] = available_formatted_days if available_formatted_days.size > 0
    }
    return available_slots
  end
end
