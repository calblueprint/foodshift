# == Schema Information
#
# Table name: interests
#
#  id           :integer          not null, primary key
#  created_at   :datetime
#  updated_at   :datetime
#  donation_id  :integer
#  recipient_id :integer
#
# Indexes
#
#  index_interests_on_donation_id   (donation_id)
#  index_interests_on_recipient_id  (recipient_id)
#

class Interest < ActiveRecord::Base
  belongs_to :donation
  belongs_to :recipient
end
