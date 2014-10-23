require 'test_helper'

class RegistrationControllerTest < ActionController::TestCase
  test "should get donor" do
    get :donor
    assert_response :success
  end

  test "should get recipient" do
    get :recipient
    assert_response :success
  end

end
