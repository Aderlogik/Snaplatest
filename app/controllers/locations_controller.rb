class LocationsController < ApplicationController
  before_action :set_locations
  before_action :set_location, only: [:show, :edit, :update, :destroy]

  # GET users/1/locations
  def index
    @locations = @user.locations
  end

  # GET users/1/locations/1
  def show
  end

  # GET users/1/locations/new
  def new
    @location = @user.locations.build
  end

  # GET users/1/locations/1/edit
  def edit
  end

  # POST users/1/locations
  def create
    @location = @user.locations.build(location_params)

    if @location.save
      redirect_to([@location.user, @location], notice: 'Location was successfully created.')
    else
      render action: 'new'
    end
  end

  # PUT users/1/locations/1
  def update
    if @location.update_attributes(location_params)
      redirect_to([@location.user, @location], notice: 'Location was successfully updated.')
    else
      render action: 'edit'
    end
  end

  # DELETE users/1/locations/1
  def destroy
    @location.destroy

    redirect_to user_locations_url(@user)
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_locations
    @user = User.find(params[:user_id])
  end

  def set_location
    @location = @user.locations.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def location_params
    params.require(:location).permit(:name, :address, :city, :state, :zip, :country, :area, :acres)
  end
end
