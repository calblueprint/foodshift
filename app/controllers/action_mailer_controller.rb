class ActionMailerController < ApplicationController

	def index
		@recipients = Recipient.all
		@coordinators = Coordinator.all
		@donors = Donor.all
		@donations = Donation.all
	end

	def notify_recipient
		@donation = Donation.find(params[:id])
		@recipients = Recipient.pluck(:email)
		UserMailer.donation_available(@recipients, @donation).deliver
	end

	def notify_donor
		@donors = Donor.pluck(:email)
		UserMailer.recipient_match(@donors).deliver
	end

	def notify_coordinator
		@donation = Donation.find(params[:id])
		@coordinators = Coordinator.pluck(:email)
		UserMailer.coordinator_email(@coordinators, @donation).deliver
	end

end
