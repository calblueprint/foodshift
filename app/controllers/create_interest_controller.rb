class CreateInterestController < ApplicationController

	def create
		@recipient_id = params[:recipient_id]
		@donation_id = params[:donation_id]
		if Recipient.exists?(@recipient_id) and Donation.exists?(@donation_id)
			if Interest.exists?(recipient_id: @recipient_id) and Interest.exists?(donation_id: @donation_id)
				@result = "This recipient/donation id pair already exists"
			else
				new_interest = Interest.new
				new_interest.donation_id = @donation_id
				new_interest.recipient_id = @recipient_id
				if new_interest.save
					@result = "Succesfully created Interest Object with recipient_id #{@recipient_id} and donation_id #{@donation_id}!"
				end
			end
		else
			@result = "Invalid recipient/donation id"
		end
	end

end
