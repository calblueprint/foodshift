class DonationsController < ApplicationController
  before_action :set_donation, only: [:show, :edit, :update, :destroy]

  # GET /donate
  def new
  end

  # POST /donate
  def create
    donation_form = DonationForm.new(donation_params)
    puts current_user
    puts current_user.id
    donation_form.donor = Donor.find(current_user.id) if user_signed_in?
    respond_to do |format|
      if donation_form.create_objects
        @donation = donation_form.donation
        @recipient_ids = Recipient.where(subscribed: true).collect(&:id)
        UserMailer.donation_available(@recipient_ids, @donation).deliver
        @coordinators = Coordinator.pluck(:email)
        UserMailer.coordinator_email(@coordinators, @donation).deliver
        format.html { redirect_to root_path, notice: "Donation was successfully created." }
        format.json { render json: {}, status: :created }
      else
        #format.html { render donations_new_path }
        #format.json { render json: {}, status: :unprocessable_entity }
      end
    end
  end

  private
  def donation_params
    params.require(:donation).permit(
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
      :description,
      :picture,
      :can_dropoff
    )
  end
end
