class DonorController < ApplicationController
	helper_method :find_transaction, :find_transaction_coordinator, :find_transaction_recipient

	def profile
		@user = current_user
		@donations = Donation.where("donor_id = ?", current_user.id)
		@pending_donations = @donations.where("status = ?", 'Pending')
		@inprogress_donations = @donations.where("status = ?", 'In Progress')
		@completed_donations = @donations.where("status = ?", 'Completed')
	end

	def find_transaction(donation_id)
		return Transaction.where("donation_id = ?", donation_id).first
	end

	def find_transaction_coordinator(donation_id)
		@transaction = Transaction.where("donation_id = ?", donation_id).first
		@coord_id = @transaction.coordinator_id
		return Coordinator.find(@coord_id)
	end

	def find_transaction_recipient(donation_id)
		@transaction = Transaction.where("donation_id = ?", donation_id).first
		@recipient_id = @transaction.recipient_id
		return Recipient.find(@recipient_id)
	end
end
