class ServiceSeason < ApplicationRecord
  belongs_to :service
  
  def get_season_image
    "#{name.downcase.gsub(/\s\&/, '').gsub(/\s/, '_')}.png"
  end
  
  def get_date_range_string(season_name, start_date, end_date)
    start_date = Date.parse(start_date)
    end_date = Date.parse(end_date)
    "#{season_name} - #{start_date.strftime("%b")} #{start_date.strftime("%d")} till #{end_date.strftime("%b")} #{end_date.strftime("%d")}"
  end
  
  def self.get_available_slots_for_range(season_name, selected_day, start_date, end_date)
    start_date = Date.parse(start_date)
    end_date = Date.parse(end_date)
    if start_date < Date.today && Date.today < end_date
      start_date = Date.today
    end
    available_slots = {season: season_name, days: {}}
    (start_date..end_date).to_a.group_by(&:month).each{|month, days| 
      available_formatted_days = days.select{|day| day.wday == selected_day}.map{|day| [day.week_of_month == 2, day.strftime('%d')]}
      available_slots[:days][Date::ABBR_MONTHNAMES[month]] = available_formatted_days
    }
    return available_slots
  end
end
