class DonationForm < Form
  DATETIME_FORMAT = '%Y-%m-%d %I:%M %p'

  attr_accessor(
    :recipient_id,
    :food_type,
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
