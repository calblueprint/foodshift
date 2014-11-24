class CreateInterestController < ApplicationController

	def create
		@recipient_id = params[:recipient_id]
		@donation_id = params[:donation_id]
		if Recipient.exists?(@recipient_id) and Donation.exists?(@donation_id)
			if params[:authentication] == Recipient.find(@recipient_id).encrypted_password.tr('/.', '')
				if Interest.exists?(recipient_id: @recipient_id) and Interest.exists?(donation_id: @donation_id)
					@result = "This recipient/donation pair already exists"
				else
					new_interest = Interest.new
					new_interest.donation_id = @donation_id
					new_interest.recipient_id = @recipient_id
					if new_interest.save
						@result = "Succesfully created Interest Object with recipient_id #{@recipient_id} and donation_id #{@donation_id}!"
					end
				end
			else
				@result = "Unauthorized User"
			end
		else
			@result = "Invalid recipient/donation IDs"
		end
	end

end
