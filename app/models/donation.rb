# == Schema Information
#
# Table name: donations
#
#  id              :integer          not null, primary key
#  created_at      :datetime
#  updated_at      :datetime
#  donor_id        :integer
#  organization    :string(255)      not null
#  address         :string(255)      not null
#  person          :string(255)      not null
#  phone           :string(255)      not null
#  email           :string(255)      not null
#  refrigeration   :boolean          default(FALSE)
#  window_start    :datetime         not null
#  window_end      :datetime         not null
#  additional_info :text
#  latitude        :decimal(, )
#  longitude       :decimal(, )
#  picture         :string(255)
#  description     :text
#

class Donation < ActiveRecord::Base
  belongs_to :donor
  nilify_blanks

  # Image uploader using carrierwave
  mount_uploader :picture, DonationUploader
end
