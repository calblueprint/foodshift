class ActionMailerController < ApplicationController

	def index
		@recipients = Recipient.all
		@coordinators = Coordinator.all
		@donors = Donor.all
	end

	def notify_recipient
		@recipients = Recipient.pluck(:email)
		UserMailer.welcome_email(@recipients).deliver
	end

end
