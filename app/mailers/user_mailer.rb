class UserMailer < ActionMailer::Base
  default from: "foodshift.testing.email@gmail.com"

  def donation_available(recipients)
  	mail(to: recipients, subject: 'Donation Available!')
  end

  def recipient_match(recipients)
  	mail(to: recipients, subject: 'Your donation has found a recipient!')
  end

  def coordinator_email(recipients)
  	mail(to: recipients, subject: 'Donation Posted!')
  end
 end
