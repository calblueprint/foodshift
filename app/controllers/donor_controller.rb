class DonorController < ApplicationController
  load_and_authorize_resource
  helper_method :find_transaction, :find_transaction_coordinator, :find_transaction_recipient

  # GET /profile
  def profile
    @user = current_user
    @donations = Donation.where("donor_id = ?", current_user.id)
    @pending_donations = @donations.where(status: 'Pending')
    @inprogress_donations = @donations.where(status: 'In Progress')
    @completed_donations = @donations.where(status: 'Completed')
  end

  # POST /profile
  def edit_profile
    profile = DonorProfile.where(donor_id: current_user.id).first
    DonorProfile.update(profile.id,
      reason_for_surplus: params[:reason_for_surplus],
      serves_organic_food: params[:serves_organic_food],
      frequency_of_surplus: params[:frequency_of_surplus],
      typical_food_types_served: params[:typical_food_types_served],
      typical_quantity_of_donation: params[:typical_quantity_of_donation],
      pounds_per_week_donated: params[:pounds_per_week_donated],
      aware_of_good_samaritan_food_act: params[:aware_of_good_samaritan_food_act],
      donated_before: params[:donated_before]
    )
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
end
