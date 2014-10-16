class UserMailer < ActionMailer::Base
  default from: "foodshift.testing.email@gmail.com"

  def welcome_email(emails)
  	mail(to: "ericayin@berkeley.edu", subject: 'Welcome')
  end
 end
