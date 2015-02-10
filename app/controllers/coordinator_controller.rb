class CoordinatorController < ApplicationController
  before_action :auth

  def deliver
    current_deliveries = Transaction.where(delivered_at: nil).joins(:donation, :recipient )
    gon.deliveries = current_deliveries
  end

  def schedule
    unique_interests = Interest.select(:donation_id).distinct
    donations = Donation.where(id: unique_interests.pluck(:donation_id))
    recipients = Recipient.where(id: unique_interests.pluck(:recipient_id))
    gon.donations = donations
    gon.recipients = recipients
  end

  def data
  end

  def auth
    authorize! :read, Donation
  end
end
