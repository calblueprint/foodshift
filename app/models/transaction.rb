# == Schema Information
#
# Table name: transactions
#
#  id             :integer          not null, primary key
#  created_at     :datetime
#  updated_at     :datetime
#  donation_id    :integer
#  recipient_id   :integer
#  coordinator_id :integer
#  delivered_at   :datetime
#  picked_up_at   :datetime
#
# Indexes
#
#  index_transactions_on_coordinator_id  (coordinator_id)
#  index_transactions_on_donation_id     (donation_id)
#  index_transactions_on_recipient_id    (recipient_id)
#

class Transaction < ActiveRecord::Base
  belongs_to :donation
  belongs_to :recipient
  belongs_to :coordinator
end
