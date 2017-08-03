class ServicesController < ApplicationController
  skip_before_action :authenticate_user!, :only => [:get_available_slots_for_service]
  skip_before_action :verify_authenticity_token
  
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
    params["season_ids"].each{|season_id|
      season = ServiceSeason.find(season_id)
      if season
        season_name = season.name
        if season_name.include?("&")
          season_name.split("&").each_with_index{|season_name, index|
            season_date_range = (index == 0 ? season.start_date : season.end_date)
            start_date, end_date = season_date_range.split(" - ")
            season_range << season.get_date_range_string(season_name, start_date, end_date)
            available_days << ServiceSeason.get_available_slots_for_range(season, season_name, params["selected_day"].to_i, 
              start_date, end_date)
          }
        else
          season_range << season.get_date_range_string(season_name, season.start_date, season.end_date)
          available_days << ServiceSeason.get_available_slots_for_range(season, season_name, params["selected_day"].to_i, 
            season.start_date, season.end_date)
        end
      end
    }
    render :json => {available_days:  available_days, season_range: season_range.join(" & ")}
  end
  
  def refresh_location_service
    location = Location.find(params["location_id"])
    subscription = Subscription.find(location.subscription_id)
    extra_service_ids = SubscriptionExtraService.where(:subscription_id => location.subscription_id).map(&:service_id)
    render :json => {area_in_feet: location.area_in_feet, area_in_acres: location.area_in_acres,
                     plan_id: subscription.plan_id, sub_plan_id: subscription.sub_plan_id,
                     schedule_id: subscription.schedule_id, extra_service_ids: extra_service_ids
    }
  end
end
