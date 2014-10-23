class UserMailer < ActionMailer::Base
  default from: "foodshift.testing.email@gmail.com"

  def welcome_email(emails)
  	@generatedURL = 'http://foodshift.net/query&value&passthisin'
  	mail(to: emails, subject: 'Welcome')
  end
 end
