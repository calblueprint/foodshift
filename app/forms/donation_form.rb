class DonationForm < Form
  DATETIME_FORMAT = "%m/%d/%Y %H:%M"

  attr_accessor(
    :donor,
    :food_type,
    :quantity,
    :address,
    :latitude,
    :longitude,
    :date,
    :start_time,
    :end_time,
    :person,
    :organization,
    :email,
    :phone,
    :refrigeration,
    :additional_info,
    :description,
    :picture,
    :can_dropoff
  )

  def save
    return false unless valid?
    if create_objects
      # TODO: Other actions when donation are created?
      true
    else
      false
    end
  end

  def create_objects
    ActiveRecord::Base.transaction do
      donation.save!
    end
    @profile = DonorProfile.find_by(donor_id: donor)
    @profile.update(
      donor_id: donor,
      organization: organization,
      address: address,
      email: email,
      person: person,
      phone: phone
    )
    rescue ActiveRecord::RecordInvalid => err
      Rails.logger.error(err.to_s)
      false
  end

  def donation
    @donation ||= Donation.new(
      description: description,
      picture: picture,
      donor_id: donor,
      refrigeration: refrigeration,
      window_start: window_start,
      window_end: window_end,
      additional_info: additional_info,
      latitude:  latitude,
      longitude: longitude,
      can_dropoff: can_dropoff,
      status: "Pending"
    )
  end

  def window_start
    DateTime.strptime("#{date} #{start_time}", DATETIME_FORMAT)
  end

  def window_end
    DateTime.strptime("#{date} #{end_time}", DATETIME_FORMAT)
  end
end
