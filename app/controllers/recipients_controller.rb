class RecipientsController < ApplicationController
  # GET /receive
  def new
  end

  # POST /receive
  def create
    recipient_form = RecipientForm.new(recipient_params)
    recipient_form.donor_id = current_user if user_signed_in?
    respond_to do |format|
      if recipient_form.create_objects
        format.html {
          redirect_to root_path,
          notice: "You have been successfully registered."
        }
      else
        format.html { render recipients_new_path }
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
