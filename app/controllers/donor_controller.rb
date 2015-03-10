class DonorController < ApplicationController
	def profile
		@user = current_user
		@donations = Donation.where("donor_id = ?", current_user.id)
	end
end
