# == Schema Information
#
# Table name: donor_profiles
#
#  id                               :integer          not null, primary key
#  created_at                       :datetime
#  updated_at                       :datetime
#  donor_id                         :integer
#  reason_for_surplus               :string(255)
#  serves_organic_food              :boolean
#  frequency_of_surplus             :string(255)
#  typical_food_types_served        :string(255)
#  typical_quantity_of_donation     :string(255)
#  pounds_per_week_donated          :integer
#  aware_of_good_samaritan_food_act :boolean
#  donated_before                   :boolean
#  organization                     :string(255)
#  address                          :string(255)
#  person                           :string(255)
#  phone                            :string(255)
#  email                            :string(255)
#
# Indexes
#
#  index_donor_profiles_on_donor_id  (donor_id)
#

class DonorProfile < ActiveRecord::Base
  belongs_to :donor
end
