class RecipientsController < ApplicationController
  # GET /receive
  def new
  end

  # POST /receive
  def create
    recipient_form = RecipientForm.new(recipient_params)
    respond_to do |format|
      attempt = recipient_form.create_objects
      if attempt == true
        format.html { redirect_to root_path, notice: "You have been successfully registered." }
      else
        format.html { redirect_to recipients_new_path, alert: attempt }
      end
    end
  end

  def recipient_params
    params.require(:recipient).permit(
      :email,
      :password,
      :password_confirm,
      :first_name,
      :last_name,
      :phone,
      :organization_name,
      :address,
      :latitude,
      :longitude,
      :organization_number,
      :kitchen,
      :refrigeration
    )
  end
end
