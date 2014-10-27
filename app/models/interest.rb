class Interest < ActiveRecord::Base
  belongs_to :donation
  belongs_to :recipient
end
