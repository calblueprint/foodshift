class UserMailer < ActionMailer::Base
  default from: "from@example.com"

  def welcome_email(user)
  	@user = user
  	@url = 'http://fakeurl.com'
  	mail(to: @user.email, subject: 'Welcome')
  end
 end
