class DonorController < ApplicationController
	def profile
		@user = current_user
		@donations = Donation.where("donor_id = ?", current_user.id)
		@pending_donations = @donations.where("status = ?", 'Pending')
		@inprogress_donations = @donations.where("status = ?", 'In Progress')
		@completed_donations = @donations.where("status = ?", 'Complete')
	end
end
