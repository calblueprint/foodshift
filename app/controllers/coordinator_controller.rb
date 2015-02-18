class CoordinatorController < ApplicationController
  before_action :auth

  def deliver
    current_deliveries = Transaction.includes({recipient: [:recipient_profile]}, :donation).where(delivered_at: nil)
    gon.deliveries = current_deliveries.as_json({include: [{recipient: {include: [:recipient_profile]}}, :donation]})
  end

  def schedule
    gon.donations = []
    gon.recipients = []
    Interest.includes({recipient: [:recipient_profile]}, :donation).group_by(&:donation).each do |donation, interests|
        gon.donations << donation
        interests.each do |interest|
            gon.recipients << interest.as_json({include: {recipient: {include: [:recipient_profile]}}})
        end
    end
  end

  def data
  end

  def auth
    authorize! :read, Donation
  end
end
