class ServicesController < ApplicationController
  before_action :authenticate_user!
  
  def index
  end

  def create
  end

  def new
  end

  def show
  end
  
  def get_available_slots_for_service
    Rails.logger.debug params
    available_days = []
    season_range = []
    season = ServiceSeason.find(params["season_id"])
    if season
      season_name = season.name
      if season_name.include?("&")
        season_name.split("&").each_with_index{|_season, index|
          season_range << season.get_date_range_string(_season, season.start_date, season.end_date)
          season_date_range = (index == 0 ? season.start_date : season.end_date)
          start_date, end_date = season_date_range.split(" - ")
          available_days << ServiceSeason.get_available_slots_for_range(_season, params["selected_day"].to_i, 
                                                                        start_date, end_date)
        }
      else
        season_range << season.get_date_range_string(season_name, season.start_date, season.end_date)
        available_days << ServiceSeason.get_available_slots_for_range(season_name, params["selected_day"].to_i, 
                                                                      season.start_date, season.end_date)
      end
    end
    render :json => {service_id: season.service_id, available_days:  available_days, season_range: season_range.join(" & ")}
  end
end
