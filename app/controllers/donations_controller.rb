class DonationsController < ApplicationController

  # GET /donate
  def new
  end

  # POST /donations
  def create
    donation_form = DonationForm.new(donation_params)
    donation_form.donor_id = current_user if user_signed_in?
    respond_to do |format|
      if donation_form.create_objects
        format.html { redirect_to root_path, notice: "Donation was successfully created." }
      else
        format.html { render donations_new_path }
      end
    end
  end

  private

  def donation_params
    params.require(:donation).permit(
      { food_type: [] },
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
