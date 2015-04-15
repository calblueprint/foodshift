class UserMailer < ActionMailer::Base
  default from: "Food Shift <" + ENV["EMAIL_USERNAME"] + ">"

  def donation_available(recipient_ids, donation)
    @donation = donation
    @profile = DonorProfile.find_by donor_id: donation.donor_id
    recipient_ids.each do |r|
      @recipient = Recipient.find(r)
      @email = @recipient.email
      puts("emailing " + @email + "\n\n")
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
end
