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
#  quantity        :string(255)      not null
#  window_start    :datetime         not null
#  window_end      :datetime         not null
#  additional_info :text
#  food_type       :string(255)      default([]), not null, is an Array
#  latitude        :decimal(, )
#  longitude       :decimal(, )
#

class Donation < ActiveRecord::Base
  belongs_to :donor
  nilify_blanks
end
