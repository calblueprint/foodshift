# == Schema Information
#
# Table name: recipient_profiles
#
#  id                  :integer          not null, primary key
#  created_at          :datetime
#  updated_at          :datetime
#  recipient_id        :integer
#  organization        :string(255)
#  address             :string(255)
#  org501c3            :integer
#  person              :string(255)
#  phone               :string(255)
#  operation           :string(255)
#  num_people_serve    :string(255)
#  kitchen             :boolean
#  refrigeration       :boolean
#  notfications        :boolean
#  population          :text
#  days_serve          :string(255)
#  food_types_wanted   :string(255)
#  food_types_unwanted :string(255)
#  challenges          :text
#  longitude           :decimal(, )
#  latitude            :decimal(, )
#

class RecipientProfile < ActiveRecord::Base
  belongs_to :recipient
  validates :recipient, presence: true
end
