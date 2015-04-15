class DonorController < ApplicationController
  load_and_authorize_resource
  helper_method :find_transaction,
                :find_transaction_coordinator,
                :find_transaction_recipient,
                :find_recipient_profile

  # GET /donor/profile
  def profile
    @user = current_user
    @profile = DonorProfile.find_by(donor_id: current_user.id)
    @donations = Donation.where(donor_id: current_user.id).includes(
      food_transaction: [{ recipient: :recipient_profile }, :coordinator]
    )

    @pending_donations = @donations.where(status: Donation.type_pending)
    @inprogress_donations = @donations.where(status: Donation.type_in_progress)
    @completed_donations = @donations.where(status: Donation.type_completed)

    gon.donations = @donations.as_json(
      include: [{ food_transaction: {
        include: [{ recipient: {
          include: [:recipient_profile] } }, :coordinator]
      } }]
    )
  end

  # PUT /donor/profile
  def change_profile
    request.format = :json # unsure why i have to coerce it to json...
    profile = DonorProfile.find_by(donor_id: current_user.id)
    respond_to do |format|
      format.json { respond_with_bip(profile) }
    end
  end

  # PATCH /donor/profile
  def upload_logo
    puts request

    profile = DonorProfile.find_by(donor_id: current_user.id)
    profile.update(logo: params['donor_profile']['logo'])
    redirect_to donor_profile_path
  end

  def find_transaction(donation_id)
    transactions = Transaction.where(donation_id: donation_id)
    if !transactions.nil?
      transactions.first
    end
  end

  def find_recipient_profile(recipient_id)
    profiles = RecipientProfile.where(recipient_id: recipient_id)
    if !profiles.nil?
      profiles.first
    end
  end

  def find_transaction_coordinator(donation_id)
    @transaction = Transaction.where(donation_id: donation_id).first
    @coord_id = @transaction.coordinator_id
    Coordinator.find(@coord_id)
  end

  def find_transaction_recipient(donation_id)
    @transaction = Transaction.where(donation_id: donation_id).first
    @recipient_id = @transaction.recipient_id
    Recipient.find(@recipient_id)
  end

  private

  def profile_params
    params.require(:donor_profile).permit(
      :person,
      :email,
      :address,
      :phone,
      :serves_organic_food,
      :frequency_of_surplus,
      :typical_food_types_served,
      :typical_quantity_of_donation,
      :pounds_per_week_donated,
      :aware_of_good_samaritan_act
    )
  end
end
