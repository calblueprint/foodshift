class ActionMailerController < ApplicationController

	def index
		@emails = ["ericayin@berkeley.edu", "ericayin831@gmail.com"]
	end

	def create
		@emails = ["ericayin@berkeley.edu", "ericayin831@gmail.com"]
		UserMailer.welcome_email(@emails).deliver
	end

end
