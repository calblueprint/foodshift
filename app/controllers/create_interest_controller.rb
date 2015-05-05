class CreateInterestController < ApplicationController
  def create
    @recipient_id = params[:recipient_id]
    @donation_id = params[:donation_id]
    # check to see if it the id's are valid

    if not (Recipient.exists?(@recipient_id) && Donation.exists?(@donation_id))
      @result = "Invalid recipient/donation ID."
      return
    end
    if params[:authentication] != Recipient.find(@recipient_id).encrypted_password.tr('/.', '')
      @result = "Unauthorized user."
      return
    end
    if Interest.exists?(recipient_id: @recipient_id) && Interest.exists?(donation_id: @donation_id)
      @result = "This recipient/donation pair already exists!"
      return
    end
    if Donation.find(@donation_id).status == Donation.type_in_progress
      @result = "This donation has already been matched with another recipient."
      return
    end
    if Donation.find(@donation_id).status == Donation.type_canceled
      @result = "This donation has been canceled."
      return
    end
    if Donation.find(@donation_id).status == Donation.type_completed
      @result = "This donation has already been completed."
      return
    end

    new_interest = Interest.new
    new_interest.donation_id = @donation_id
    new_interest.recipient_id = @recipient_id
    if new_interest.save
      Donation.find(donation_id).update_attributes(status: Donation.type_pending)
      @result = "Succesfully created Interest Object with recipient_id #{@recipient_id} and donation_id #{@donation_id}!"
    end
  end
end
