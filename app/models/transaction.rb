class Transaction < ActiveRecord::Base
  belongs_to :donation
  belongs_to :recipient
  belongs_to :coordinator
end
