class Donor < User
  has_one :donor_profile, class_name: "DonorProfile"

  after_create :create_donor_profile
  def self.model_name
    User.model_name
  end
end
