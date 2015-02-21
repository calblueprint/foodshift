class CoordinatorController < ApplicationController
  before_action :auth

  def deliver
    current_deliveries = Transaction.includes(
      { recipient: [:recipient_profile] }, :donation).where(delivered_at: nil)
    gon.deliveries = current_deliveries.as_json(
      { include: [{ recipient: { include: [:recipient_profile] } },
                  :donation] })
  end

  def schedule
    gon.donations = []
    gon.recipients = []
    Interest.includes({ recipient: [:recipient_profile] }, :donation).group_by(
      &:donation).each do |donation, interests|
      gon.donations << donation
      interests.each do |interest|
        gon.recipients << interest.as_json(
          include: { recipient: { include: [:recipient_profile] } })
      end
    end
  end

  def match
    interests = Interest.destroy_all(donation_id: match_params[:donation_id])
    transaction = Transaction.new(donation_id: match_params[:donation_id], recipient_id: match_params[:recipient_id])
    respond_to do |format|
      if transaction.save
        format.json {render json: {}, status: :created}
      else
        format.json {render json: {}, status: :unprocessable_entity}
      end
    end
  end

  def match_params
    params.permit([:interest_id, :donation_id, :recipient_id])
  end

  def data
  end

  def auth
    authorize! :read, Donation
  end
end
