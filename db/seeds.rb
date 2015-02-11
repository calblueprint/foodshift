# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

def create_donors
  1.upto(5) do |n|
    donor = Donor.find_or_initialize_by(email: "donor#{n}@foodshift.net")
    donor.password = "password"
    donor.subscribed = "true"
    donor.type = "Donor"
    donor.save!

    donor_profile = DonorProfile.find_or_initialize_by(donor_id: donor.id)
    donor_profile.reason = Faker::Lorem.sentence(2)
    donor_profile.organic = [true, false].sample
    donor_profile.frequency_of_surplus = Faker::Lorem.sentence(2)
    donor_profile.food_types = Faker::Lorem.sentence(2)
    donor_profile.quantity = Faker::Lorem.sentence(2)
    donor_profile.donated_in_past = Faker::Lorem.sentence(2)
    donor_profile.pounds_per_week = Faker::Number.number(2)
    donor_profile.good_samaritan = true
    donor_profile.save!
  end

  donor = Donor.find_or_initialize_by(email: "donor@donor.com")
  donor.password = "password"
  donor.subscribed = "true"
  donor.type = "Donor"
  donor.save!
end

def create_recipients
  1.upto(5) do |n|
    recipient = Recipient.find_or_initialize_by(email: "recipient#{n}@foodshift.net")
    recipient.password = "password"
    recipient.subscribed = "true"
    recipient.type = "Recipient"
    recipient.save!

    recipient_profile = RecipientProfile.find_or_initialize_by(recipient_id: recipient.id)
    recipient_profile.organization = Faker::Company.name
    recipient_profile.address = Faker::Address.street_address
    recipient_profile.org501c3 = Faker::Number.number(5)
    recipient_profile.person = Faker::Name.name
    recipient_profile.phone = Faker::PhoneNumber.phone_number
    recipient_profile.operation = Faker::Lorem.word
    recipient_profile.num_people_serve = Faker::Number.number(3)
    recipient_profile.kitchen = [true, false].sample
    recipient_profile.refrigeration = [true, false].sample
    recipient_profile.notfications = [true, false].sample
    recipient_profile.population = Faker::Lorem.paragraph
    recipient_profile.days_serve = Faker::Lorem.word
    recipient_profile.food_types_wanted = Faker::Lorem.sentence(3)
    recipient_profile.food_types_unwanted = Faker::Lorem.sentence(3)
    recipient_profile.challenges = Faker::Lorem.paragraph
    recipient_profile.longitude = Faker::Address.longitude
    recipient_profile.latitude = Faker::Address.latitude
    recipient_profile.save!
  end

  recipient = Recipient.find_or_initialize_by(email: "recipient@recipient.com")
  recipient.password = "password"
  recipient.subscribed = "true"
  recipient.type = "Recipient"
  recipient.save!
end

def create_coordinators
  1.upto(5) do |n|
    coordinator = Coordinator.find_or_initialize_by(email: "coordinator#{n}@foodshift.net")
    coordinator.password = "password"
    coordinator.subscribed = "true"
    coordinator.type = "Coordinator"
    coordinator.save!
  end

  coordinator = Coordinator.find_or_initialize_by(email: "coordinator@coordinator.com")
  coordinator.password = "password"
  coordinator.subscribed = "true"
  coordinator.type = "Coordinator"
  coordinator.save!
end

def create_donations
  1.upto(5) do
    Donation.create!(
    organization: Faker::Company.name,
    address: Faker::Address.street_address,
    person: Faker::Name.name,
    phone: Faker::PhoneNumber.phone_number,
    email: Faker::Internet.email,
    refrigeration: [true, false].sample,
    quantity: Faker::Number.number(2),
    window_start: Faker::Date.between(2.days.ago, 1.days.ago),
    window_end: Faker::Date.between(1.days.ago, Date.today),
    food_type: ["Bread", "Bulk", "Dairy", "Juice", "Mixed", "Meat", "Prepared", "Produce"].sample,
    longitude: Faker::Address.longitude,
    latitude: Faker::Address.latitude)
  end
end

create_donors
create_recipients
create_coordinators
create_donations
