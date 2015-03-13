class CoordinatorController < ApplicationController
  load_and_authorize_resource

  def deliver
    current_deliveries = Transaction.includes(
      { recipient: [:recipient_profile] }, :donation).where(delivered_at: nil)
    gon.deliveries = current_deliveries.as_json(
      { include: [{ recipient: { include: [:recipient_profile] } },
                  :donation] })
  end

  def confirm
    transaction = Transaction.find_by(id: confirm_params[:transaction_id])
    transaction.picked_up_at = js_timestamp_to_time(
      confirm_params[:picked_up_at]) if confirm_params[:picked_up_at]
    transaction.delivered_at = js_timestamp_to_time(
      confirm_params[:delivered_at]) if confirm_params[:delivered_at]
    respond_to do |format|
      if transaction.save
        format.json { render json: {}, status: :created }
      else
        format.json { render json: {}, status: :unprocessable_entity }
      end
    end
  end

  def confirm_params
    params.permit([:transaction_id, :picked_up_at, :delivered_at])
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
    respond_to do |format|
      begin
        ActiveRecord::Base.transaction do
          Interest.destroy_all(donation_id: match_params[:donation_id])
          Transaction.create(donation_id: match_params[:donation_id],
                             recipient_id: match_params[:recipient_id])
        end
        format.json { render json: {}, status: :created }
      rescue ActiveRecord::ActiveRecordError
        # TODO: What to do to handle this
        format.json { render json: {}, status: :unprocessable_entity }
      end
    end
  end

  def match_params
    params.permit([:interest_id, :donation_id, :recipient_id])
  end

  def data
  end

  def auth
  end
end
