class RecipientProfilesController < ApplicationController
  def show
  	@user = current_user
  	@profile = RecipientProfile.find_by(recipient_id: current_user.id)  
  	@received_donations = Transaction.where(recipient_id: current_user.id)
  	@requested_donations = Interest.where(recipient_id: current_user.id)
  end
end
