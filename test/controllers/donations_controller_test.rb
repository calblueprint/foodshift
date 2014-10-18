require 'test_helper'

class DonationsControllerTest < ActionController::TestCase
  setup do
    @donation = donations(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:donations)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create donation" do
    assert_difference('Donation.count') do
      post :create, donation: { address: @donation.address, company: @donation.company, donor_id: @donation.donor_id, email: @donation.email, food_type: @donation.food_type, person: @donation.person, phone: @donation.phone, pickup_time_window: @donation.pickup_time_window, quantity: @donation.quantity, refrigeration: @donation.refrigeration }
    end

    assert_redirected_to donation_path(assigns(:donation))
  end

  test "should show donation" do
    get :show, id: @donation
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @donation
    assert_response :success
  end

  test "should update donation" do
    patch :update, id: @donation, donation: { address: @donation.address, company: @donation.company, donor_id: @donation.donor_id, email: @donation.email, food_type: @donation.food_type, person: @donation.person, phone: @donation.phone, pickup_time_window: @donation.pickup_time_window, quantity: @donation.quantity, refrigeration: @donation.refrigeration }
    assert_redirected_to donation_path(assigns(:donation))
  end

  test "should destroy donation" do
    assert_difference('Donation.count', -1) do
      delete :destroy, id: @donation
    end

    assert_redirected_to donations_path
  end
end
