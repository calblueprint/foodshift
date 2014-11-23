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
    :kitchen,
    :refrigeration
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
      recipient_user.save!
      # TODO: Add when schema gets updated for this
      #recipient_profile.save!
    end
    rescue ActiveRecord::RecordInvalid => err
      logger.error(err.to_s)
      false
  end

  def recipient_user
    @recipient_user ||= User.new(
        email: email,
        password: password,
        # TODO: Fix when schema gets updated for this
        #type: User::TYPE_RECIPIENT
    )
  end

  def recipient_profile
    # TODO: Add when schema gets updated for this
    # @recipient_profile ||= RecipientProfile.new()
  end
end
