class DonationsController < ApplicationController
  before_action :set_donation, only: [:show, :edit, :update, :destroy]

  # GET /donate
  def new
    gon.isSignedInOnLoad = !current_user.nil?
  end

  # POST /donate
  def create
    donation_form = DonationForm.new(donation_params)
    donation_form.donor = current_user.id # this should never be nil
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
        format.html { redirect_to root_path, alert: "Donation failed because of unsupported file type." }
        format.json { render json: {}, status: :unprocessable_entity }
      end
    end
  end

  # GET /donation/cancel
  def cancel
    donation = Donation.find_by id: params[:format]
    donation.update_attributes status: Donation.type_canceled
    redirect_to donor_profile_path
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
