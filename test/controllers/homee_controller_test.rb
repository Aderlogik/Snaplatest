require 'test_helper'

class HomeeControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get homee_index_url
    assert_response :success
  end

end
