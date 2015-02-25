# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  created_at             :datetime
#  updated_at             :datetime
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  reset_password_token   :string(255)
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string(255)
#  last_sign_in_ip        :string(255)
#  type                   :string(255)
#  subscribed             :boolean          default(TRUE)
#  admin                  :boolean          default(FALSE)
#  secret_token           :string(255)
#

class Donor < User
  has_one :donor_profile, class_name: "DonorProfile"

  after_create :create_donor_profile
  def self.model_name
    User.model_name
  end
end
