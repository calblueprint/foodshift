# == Schema Information
#
# Table name: recipient_profiles
#
#  id                     :integer          not null, primary key
#  created_at             :datetime
#  updated_at             :datetime
#  recipient_id           :integer
#  organization           :string(255)
#  address                :string(255)
#  org501c3               :integer
#  contact_person         :string(255)
#  contact_person_phone   :string(255)
#  hrs_of_operation       :string(255)
#  num_people_served      :string(255)
#  vehicle                :boolean
#  refrigeration          :boolean
#  notfications           :boolean
#  population_description :text
#  days_of_operation      :string(255)
#  food_types_wanted      :string(255)
#  food_types_unwanted    :string(255)
#  challenges             :text
#  longitude              :decimal(, )
#  latitude               :decimal(, )
#  contact_email          :string(255)
#  logo                   :string(255)
#
# Indexes
#
#  index_recipient_profiles_on_recipient_id  (recipient_id)
#

class RecipientProfile < ActiveRecord::Base
  belongs_to :recipient
  validates :recipient, presence: true

  # Image uploader using carrierwave
  mount_uploader :logo, LogoUploader
end
