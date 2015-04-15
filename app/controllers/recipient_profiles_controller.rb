class RecipientProfilesController < ApplicationController
  helper_method :find_requested_donation

  def show
  	@user = current_user
  	@profile = RecipientProfile.find_by(recipient_id: current_user.id)  
  	@received_donations = Transaction.where(recipient_id: current_user.id)
  	@requested_donations = Interest.where(recipient_id: current_user.id)
  	@total_count = @received_donations.count + @requested_donations.count
  end

  def find_requested_donation(donation_id)
  	puts("\n FOUND REQUESTED DONATION \n")
    @interest_id = Interest.where(id: donation_id).first.donation_id
    @donation = Donation.where(id: @interest_id).first
  	@donation
  end
end
