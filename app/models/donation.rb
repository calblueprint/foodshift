class Donation < ActiveRecord::Base
  belongs_to :donor
  nilify_blanks
end
