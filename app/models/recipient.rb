class Recipient < User
  has_one :recipient_profile, class_name: "RecipientProfile"

  def self.model_name
    User.model_name
  end
end
