class UserMailer < ActionMailer::Base
  default from: "foodshift.testing.email@gmail.com"

  def welcome_email(recipients)
  	mail(to: recipients, subject: 'Welcome!')
  end
 end
