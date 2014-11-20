class DonationsController < ApplicationController
  before_action :set_donation, only: [:show, :edit, :update, :destroy]

  # GET /donations
  # GET /donations.json
  def index
    @donations = Donation.all
  end

  # GET /donations/1
  # GET /donations/1.json
  def show
  end

  # GET /donations/new
  def new
    @donation = Donation.new
  end

  # GET /donations/1/edit
  def edit
  end

  # POST /donations
  # POST /donations.json
  def create
    donationForm = DonationForm.new(donation_params)
    donationForm.donor_id = current_user if user_signed_in?
    respond_to do |format|
        if donationForm.create_objects
            format.html { redirect_to donationForm.donation, notice: "Donation was successfully created." }
            format.json { render :show, status: :created, location: donationForm.donation }
        else
            format.html { render donate_path }
            format.json { render json: donationForm.donation.errors, status: :unprocessable_entity }
        end
    end
  end

  # PATCH/PUT /donations/1
  # PATCH/PUT /donations/1.json
  def update
    respond_to do |format|
      if @donation.update(donation_params)
        format.html { redirect_to @donation, notice: "Donation was successfully updated." }
        format.json { render :show, status: :ok, location: @donation }
      else
        format.html { render :edit }
        format.json { render json: @donation.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /donations/1
  # DELETE /donations/1.json
  def destroy
    @donation.destroy
    respond_to do |format|
      format.html { redirect_to donations_url, notice: "Donation was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_donation
    @donation = Donation.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def donation_params
      params.require(:donation).permit(
          :donor_id,
          {food_type: []},
          :quantity,
          :address,
          :date,
          :start_time,
          :end_time,
          :person,
          :organization,
          :email,
          :phone,
          :refrigeration,
          :additional_info
      )
  end
end
