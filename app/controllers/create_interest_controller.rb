class CreateInterestController < ApplicationController
  def create
    @recipient_id = params[:recipient_id]
    @donation_id = params[:donation_id]
    # check to see if it the id's are valid
    
    if not (Recipient.exists?(@recipient_id) && Donation.exists?(@donation_id))
      @result = "Invalid recipient/donation ID"
      return
    end
    if params[:authentication] != Recipient.find(@recipient_id).encrypted_password.tr('/.', '')
      @result = "Unauthorized User"
      return
    end
    if Interest.exists?(recipient_id: @recipient_id) && Interest.exists?(donation_id: @donation_id)
      @result = "This recipient/donation pair already exists"
      return
    end

    new_interest = Interest.new
    new_interest.donation_id = @donation_id
    new_interest.recipient_id = @recipient_id
    if new_interest.save
      @result = "Succesfully created Interest Object with recipient_id #{@recipient_id} and donation_id #{@donation_id}!"
    end
  end
end
