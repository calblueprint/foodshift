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

class Interest < ActiveRecord::Base
  belongs_to :donation
  belongs_to :recipient
end
