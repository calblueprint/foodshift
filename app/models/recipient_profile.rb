class RecipientProfile < ActiveRecord::Base
  belongs_to :recipient
  validates :recipient, :presence => true
end
