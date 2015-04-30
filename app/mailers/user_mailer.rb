class UserMailer < ActionMailer::Base
  default from: "Food Shift <" + ENV["EMAIL_USERNAME"] + ">"

  def donation_available(recipient_ids, donation)
    @donation = donation
    @profile = DonorProfile.find_by donor_id: donation.donor_id
    recipient_ids.each do |r|
      @recipient = Recipient.find(r)
      mail(to: @email, subject: "(Recipient) Donation Available!")
    end
  end

  def recipient_match(recipients)
    if recipients.length > 0
      mail(to: recipients, subject: "Your donation has found a recipient!")
    end
  end

  def coordinator_email(recipients, donation)
    if recipients.length > 0
      @donation = donation
      @profile = DonorProfile.find_by donor_id: donation.donor_id
      mail(to: recipients, subject: "(Coordinator) Donation Posted!")
    end
  end

  def coordinator_match(donation, donor_id, recipient_id)
    @donation = donation
    @donor_profile = DonorProfile.find_by donor_id: donor_id
    @recipient_profile = RecipientProfile.find_by recipient_id: recipient_id
    mail(to: @recipient_profile.contact_email, subject: "(Recipient) Match made!")
    mail(to: @donor_profile.email, subject: "(Donor) Match made!")
  end
end
