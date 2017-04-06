require 'test_helper'

class SubscriptionsControllerTest < ActionController::TestCase
  setup do
    @user = users(:one)
    @subscription = subscriptions(:one)
  end

  test "should get index" do
    get :index, params: { user_id: @user }
    assert_response :success
  end

  test "should get new" do
    get :new, params: { user_id: @user }
    assert_response :success
  end

  test "should create subscription" do
    assert_difference('Subscription.count') do
      post :create, params: { user_id: @user, subscription: @subscription.attributes }
    end

    assert_redirected_to user_subscription_path(@user, Subscription.last)
  end

  test "should show subscription" do
    get :show, params: { user_id: @user, id: @subscription }
    assert_response :success
  end

  test "should get edit" do
    get :edit, params: { user_id: @user, id: @subscription }
    assert_response :success
  end

  test "should update subscription" do
    put :update, params: { user_id: @user, id: @subscription, subscription: @subscription.attributes }
    assert_redirected_to user_subscription_path(@user, Subscription.last)
  end

  test "should destroy subscription" do
    assert_difference('Subscription.count', -1) do
      delete :destroy, params: { user_id: @user, id: @subscription }
    end

    assert_redirected_to user_subscriptions_path(@user)
  end
end
