class DonorController < ApplicationController
  load_and_authorize_resource
  helper_method :find_transaction, :find_transaction_coordinator, :find_transaction_recipient

  # GET /profile
  def profile
    @user = current_user
    @profile = DonorProfile.where(donor_id: current_user.id).first
    @donations = Donation.where(donor_id: current_user.id)
    @pending_donations = @donations.where(status: 'Pending')
    @inprogress_donations = @donations.where(status: 'In Progress')
    @completed_donations = @donations.where(status: 'Completed')
  end

  def change_profile
    request.format = :json # unsure why i have to coerce it to json...
    profile = DonorProfile.where(donor_id: current_user.id).first
    respond_to do |format|
      if profile.update_attributes(profile_params)
        format.json { respond_with_bip(profile) }
      elsif
        format.json { respond_with_bip(profile) }
      end
    end
  end

  def find_transaction(donation_id)
    Transaction.where(donation_id: donation_id).first
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
