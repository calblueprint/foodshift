class ActionMailerController < ApplicationController

	def index
		@recipients = Recipient.all
		@coordinators = Coordinator.all
		@donors = Donor.all
	end

	def notify_recipient
		@recipients = Recipient.pluck(:email)
		UserMailer.donation_available(@recipients).deliver
	end

	def notify_donor
		@donors = Donor.pluck(:email)
		UserMailer.recipient_match(@donors).deliver
	end

	def notify_coordinator
		@coordinators = Coordinator.pluck(:email)
		UserMailer.coordinator_email(@coordinators).deliver
	end

end
