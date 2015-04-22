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

  def self.type_pending
    "Pending"
  end
  def self.type_in_progress
    "In Progress"
  end
  def self.type_completed
    "Completed"
  end
  def self.type_canceled
    "Canceled"
  end
  def format_startdate
    window_start.strftime("%B %d, %Y %I:%M %p")
  end
  def format_enddate
    window_end.strftime("%B %d, %Y %I:%M %p")
  end

  # Image uploader using carrierwave
  mount_uploader :picture, DonationUploader
end
