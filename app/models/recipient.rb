class Recipient < User
	has_one :recipient_profile, class_name: "RecipientProfile"

	after_create :create_recipient_profile
  def self.model_name
    User.model_name
  end
end
