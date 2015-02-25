# == Schema Information
#
# Table name: donor_profiles
#
#  id                   :integer          not null, primary key
#  created_at           :datetime
#  updated_at           :datetime
#  donor_id             :integer
#  reason               :string(255)
#  organic              :boolean
#  frequency_of_surplus :string(255)
#  food_types           :string(255)
#  quantity             :string(255)
#  donated_in_past      :string(255)
#  pounds_per_week      :integer
#  good_samaritan       :boolean
#

class DonorProfile < ActiveRecord::Base
  belongs_to :donor
end
