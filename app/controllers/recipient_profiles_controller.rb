class RecipientProfilesController < ApplicationController
  helper_method :find_requested_donation,
                :find_received_donation,
                :find_donor_profile

  def change_profile
    request.format = :json
    profile = RecipientProfile.find_by(recipient_id: current_user.id)
    recipient = Recipient.find(current_user.id)
    respond_to do |format|
      if !params[:user].nil?
        recipient.update_attributes(
          params[:user].permit(
            :subscribed
          )
        )
        format.json { respond_with_bip(recipient) }
      end
      if !params[:recipient_profile].nil?
        profile.update_attributes(
          params[:recipient_profile].permit(
            :contact_person,
            :contact_email,
            :address,
            :contact_person_phone,
            :organization_number,
            :vehicle,
            :refrigeration,
            :kitchen,
            :population_description,
            :days_of_operation,
            :logo,
            :hrs_of_operation,
            :num_people_served,
            :org501c3
          )
        )
        if !params[:recipient_profile][:email].nil?
          current_user.update(email: params[:recipient_profile][:email])
        end
        format.json { respond_with_bip(profile) }
      end
    end
  end

  def show
    @user = current_user
    @profile = RecipientProfile.find_by(recipient_id: current_user.id)
    @received_donations = Transaction.where(recipient_id: current_user.id)
    @requested_donations = Interest.where(recipient_id: current_user.id)
    @total_count = @received_donations.count + @requested_donations.count
    @transactions = Transaction.where(recipient_id: current_user.id).includes(
      donation: { donor: :donor_profile }
    )
    gon.transactions = @transactions.as_json(
      include: [{ donation: {
        include: [{ donor: {
          include: [:donor_profile]
        } }]
      } }]
    )
  end

  def find_requested_donation(donation_id)
    @interest_id = Interest.where(id: donation_id).first.donation_id
    @donation = Donation.where(id: @interest_id).first
    @donation
  end

  def find_received_donation(donation_id)
    @transaction_id = Transaction.where(id: donation_id).first.donation_id
    @donation = Donation.where(id: @transaction_id).first
    @donation
  end

  def find_donor_profile(donation_id)
    @donor_id = Donation.where(id: donation_id).first.donor_id
    @donor = DonorProfile.where(donor_id: @donor_id).first
    @donor
  end
end
