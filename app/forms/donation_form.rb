class DonationForm < Form
  DATETIME_FORMAT = '%Y-%m-%d %I:%M %p'

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
    :additional_info
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
    rescue ActiveRecord::RecordInvalid => err
      logger.error(err.to_s)
      false
  end

  def donation
    @donation ||= Donation.new(
      donor: donor,
      organization: organization,
      address: address,
      person: person,
      phone: phone,
      email: email,
      refrigeration: refrigeration,
      quantity: quantity,
      window_start: window_start,
      window_end: window_end,
      additional_info: additional_info,
      food_type: food_type,
      latitude:  latitude,
      longitude: longitude,
    )
  end

  def window_start
    DateTime.strptime("#{date} #{start_time}", DATETIME_FORMAT)
  end

  def window_end
    DateTime.strptime("#{date} #{end_time}", DATETIME_FORMAT)
  end
end
