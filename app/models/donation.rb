# == Schema Information
#
# Table name: donations
#
#  id              :integer          not null, primary key
#  created_at      :datetime
#  updated_at      :datetime
#  donor_id        :integer
#  refrigeration   :boolean          default(FALSE)
#  window_start    :datetime         not null
#  window_end      :datetime         not null
#  additional_info :text
#  latitude        :decimal(, )
#  longitude       :decimal(, )
#  picture         :string(255)
#  description     :text
#  can_dropoff     :boolean
#  status          :string(255)
#
# Indexes
#
#  index_donations_on_donor_id  (donor_id)
#

class Donation < ActiveRecord::Base
  belongs_to :donor
  nilify_blanks

  # Image uploader using carrierwave
  mount_uploader :picture, DonationUploader
end
