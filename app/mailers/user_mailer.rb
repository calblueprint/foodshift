class UserMailer < ActionMailer::Base
  default from: "Food Shift <" + ENV["EMAIL_USERNAME"] + ">"

  def donation_available(recipient_ids, donation)
    @donation = donation
    @profile = DonorProfile.find_by donor_id: donation.donor_id
    recipient_ids.each do |r|
      @recipient = Recipient.find(r)
      mail(to: @recipient.email, subject: "(Recipient) Donation Available!")
    end
  end

  def coordinator_email(coordinator_ids, donation)
    @donation = donation
    @profile = DonorProfile.find_by donor_id: donation.donor_id
    if coordinator_ids.length > 0
      coordinator_ids.each do |c|
        @coordinator = Coordinator.find(c)
        mail(to: @coordinator.email, subject: "(Coordinator) Donation Posted!")
      end
    end
  end

  def coordinator_matched_donor(donation, donor_id, recipient_id)
    @donation = donation
    @donor_profile = DonorProfile.find_by donor_id: donor_id
    @recipient_profile = RecipientProfile.find_by recipient_id: recipient_id
    @donor = Donor.find donor_id
    mail(to: @donor_profile.email, subject: "(Donor) Match made!")
  end

  def coordinator_matched_recipient(donation, donor_id, recipient_id)
    @donation = donation
    @donor_profile = DonorProfile.find_by donor_id: donor_id
    @recipient_profile = RecipientProfile.find_by recipient_id: recipient_id
    @recipient = Recipient.find recipient_id
    mail(to: @recipient_profile.contact_email, subject: "(Recipient) Match made!")
  end

  
end
