# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

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

def create_users
  1.upto(5) do |n|
    donor = Donor.find_or_initialize_by(email: "donor#{n}@foodshift.net")
    donor.password = "password"
    donor.subscribed = "true"
    donor.type = "Donor"
    donor.save!
  end

  1.upto(5) do |n|
    recipient = Recipient.find_or_initialize_by(email: "recipient#{n}@foodshift.net")
    recipient.password = "password"
    recipient.subscribed = "true"
    recipient.type = "Recipient"
    recipient.save!
  end

  1.upto(5) do |n|
    coordinator = Coordinator.find_or_initialize_by(email: "coordinator#{n}@foodshift.net")
    coordinator.password = "password"
    coordinator.subscribed = "true"
    coordinator.type = "Coordinator"
    coordinator.save!
  end

  donor = Donor.find_or_initialize_by(email: "donor@donor.com")
  donor.password = "password"
  donor.subscribed = "true"
  donor.type = "Donor"
  donor.save!

  recipient = Recipient.find_or_initialize_by(email: "recipient@recipient.com")
  recipient.password = "password"
  recipient.subscribed = "true"
  recipient.type = "Recipient"
  recipient.save!

  coordinator = Coordinator.find_or_initialize_by(email: "coordinator@coordinator.com")
  coordinator.password = "password"
  coordinator.subscribed = "true"
  coordinator.type = "Coordinator"
  coordinator.save!
end

create_donations
create_users
