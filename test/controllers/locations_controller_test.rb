require 'test_helper'

class LocationsControllerTest < ActionController::TestCase
  setup do
    @user = users(:one)
    @location = locations(:one)
  end

  test "should get index" do
    get :index, params: { user_id: @user }
    assert_response :success
  end

  test "should get new" do
    get :new, params: { user_id: @user }
    assert_response :success
  end

  test "should create location" do
    assert_difference('Location.count') do
      post :create, params: { user_id: @user, location: @location.attributes }
    end

    assert_redirected_to user_location_path(@user, Location.last)
  end

  test "should show location" do
    get :show, params: { user_id: @user, id: @location }
    assert_response :success
  end

  test "should get edit" do
    get :edit, params: { user_id: @user, id: @location }
    assert_response :success
  end

  test "should update location" do
    put :update, params: { user_id: @user, id: @location, location: @location.attributes }
    assert_redirected_to user_location_path(@user, Location.last)
  end

  test "should destroy location" do
    assert_difference('Location.count', -1) do
      delete :destroy, params: { user_id: @user, id: @location }
    end

    assert_redirected_to user_locations_path(@user)
  end
end
