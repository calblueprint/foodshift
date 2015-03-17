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

  def update
    user = Donor.find(params[:id])
    respond_to do |format|
      if user.update_attributes(donor_params)
        format.json { respond_with_bip(user) }
      else
        format.json { respond_with_bip(user) }
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
  def donor_params
    params.require(:user).permit(
      :subscribed
    )
  end
end
