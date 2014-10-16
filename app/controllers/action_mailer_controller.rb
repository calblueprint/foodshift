class ActionMailerController < ApplicationController

	def index
		@emails = ["ericayin@berkeley.edu"]
	end

	def create
		@emails = ["ericayin@berkeley.edu"]
		UserMailer.welcome_email(@emails).deliver
		
	end

end
