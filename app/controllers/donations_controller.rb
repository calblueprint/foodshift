class DonationsController < ApplicationController

  # GET /donate
  def new
  end

  # POST /donations
  def create
    donationForm = DonationForm.new(donation_params)
    donationForm.donor_id = current_user if user_signed_in?
    respond_to do |format|
        if donationForm.create_objects
            format.html { redirect_to root_path, notice: "Donation was successfully created." }
        else
            format.html { render donations_new_path }
        end
    end
  end

  private

  def donation_params
      params.require(:donation).permit(
          :donor_id,
          {food_type: []},
          :quantity,
          :address,
          :latitude,
          :longitude,
          :date,
          :start_time,
          :end_time,
          :person,
          :organization,
          :email,
          :phone,
          :refrigeration,
          :additional_info,
      )
  end
end
