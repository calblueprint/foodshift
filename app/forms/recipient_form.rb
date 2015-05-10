class RecipientForm < Form
  DATETIME_FORMAT = '%Y-%m-%d %I:%M %p'

  attr_accessor(
    :recipient_id,
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
    :vehicle,
    :refrigeration,
    :kitchen,
    :contact_email
  )

  validate :email_is_unique
  validates :password, length: { minimum: 8 }

  def save
    return false unless valid?
    if create_objects
      # TODO: Other actions when donation are created?
      true
    else
      false
    end
  end

  # PUT /recipient/profile
  def create_objects
    ActiveRecord::Base.transaction do
      recipient_user.save!
      recipient_profile(recipient_user).save!
    end
    @profile.update(
      address: address,
      contact_email: email,
      contact_person: name_to_person,
      contact_person_phone: phone
    )
    rescue ActiveRecord::RecordInvalid => err
      Rails.logger.error(err.to_s)
      false
  end

  def recipient_user
    @recipient_user ||= Recipient.new(
      email: email,
      password: password,
      secret_token: SecureRandom.hex(20)
    )
  end

  def recipient_profile(recipient_user)
    # TODO: Add more of the fields listed in the client doc
    @profile ||= RecipientProfile.new(
      recipient: recipient_user,
      organization: organization_name,
      address: address,
      org501c3: organization_number,
      contact_person: name_to_person,
      contact_person_phone: phone,
      contact_email: email,
      latitude: latitude,
      longitude: longitude,
      vehicle: vehicle,
      refrigeration: refrigeration,
      kitchen: kitchen
    )
  end

  def name_to_person
    "#{first_name} #{last_name}"
  end

  def email_is_unique
    unless RecipientUser.where(email: email).count == 0
      errors.add(:error, "User with this email already exists.")
    end
  end
end
