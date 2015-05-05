namespace :db do
  desc "Populate the database with fake data"
  task :populate, [:num_rows] => :environment do |task, args|
    num_rows = Integer(args[:num_rows]) rescue 5
    puts "Populating tables with #{num_rows} rows per table"
    puts "Creating donors..."
    create_donors(num_rows)
    puts "Creating recipients..."
    create_recipients(num_rows)
    puts "Creating coordinators..."
    create_coordinators(num_rows)
    puts "Creating donations and interests..."
    create_donations_and_interests(5*num_rows)
    puts "Creating transactions..."
    create_transactions(10*num_rows)
    puts "Done!"
  end
end

def create_donors(num_rows)
  1.upto(num_rows) do |n|
    donor = Donor.find_or_initialize_by(email: "donor#{n}@foodshift.net")
    donor.password = "password"
    donor.subscribed = "true"
    donor.type = "Donor"
    donor.save!

    donor_profile = DonorProfile.find_or_initialize_by(donor_id: donor.id)
    donor_profile.organization = Faker::Company.name
    donor_profile.address = Faker::Address.street_address
    donor_profile.person = Faker::Name.name
    donor_profile.phone = Faker::PhoneNumber.phone_number
    donor_profile.email = Faker::Internet.email
    donor_profile.reason_for_surplus = Faker::Lorem.sentence(2)
    donor_profile.serves_organic_food = [true, false].sample
    donor_profile.frequency_of_surplus = Faker::Lorem.sentence(2)
    donor_profile.typical_food_types_served = Faker::Lorem.sentence(2)
    donor_profile.typical_quantity_of_donation = Faker::Lorem.sentence(2)
    donor_profile.donated_before = Faker::Lorem.sentence(2)
    donor_profile.pounds_per_week_donated = Faker::Number.number(2)
    donor_profile.aware_of_good_samaritan_food_act = true
    donor_profile.save!
  end

  donor = Donor.find_or_initialize_by(email: "donor@donor.com")
  donor.password = "password"
  donor.subscribed = "true"
  donor.type = "Donor"
  donor.save!
end

def create_recipients(num_rows)
  1.upto(num_rows) do |n|
    recipient = Recipient.find_or_initialize_by(email: "recipient#{n}@foodshift.net")
    recipient.password = "password"
    recipient.subscribed = "true"
    recipient.type = "Recipient"
    recipient.secret_token = SecureRandom.hex(20)
    recipient.save!

    recipient_profile = RecipientProfile.find_or_initialize_by(recipient_id: recipient.id)
    recipient_profile.organization = Faker::Company.name
    recipient_profile.address = Faker::Address.street_address
    recipient_profile.org501c3 = Faker::Number.number(5)
    recipient_profile.contact_person = Faker::Name.name
    recipient_profile.contact_person_phone = Faker::PhoneNumber.phone_number
    recipient_profile.contact_email = Faker::Internet.email
    recipient_profile.hrs_of_operation = Faker::Lorem.word
    recipient_profile.num_people_served = Faker::Number.number(3)
    recipient_profile.vehicle = [true, false].sample
    recipient_profile.refrigeration = [true, false].sample
    recipient_profile.notfications = [true, false].sample
    recipient_profile.population_description = Faker::Lorem.paragraph
    recipient_profile.days_of_operation = Faker::Lorem.word
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
  recipient.secret_token = SecureRandom.hex(20)
  recipient.save!

  recipient_profile = RecipientProfile.find_or_initialize_by(recipient_id: recipient.id)
  recipient_profile.organization = Faker::Company.name
  recipient_profile.address = Faker::Address.street_address
  recipient_profile.org501c3 = Faker::Number.number(5)
  recipient_profile.contact_person = Faker::Name.name
  recipient_profile.contact_person_phone = Faker::PhoneNumber.phone_number
  recipient_profile.hrs_of_operation = Faker::Lorem.word
  recipient_profile.num_people_served = Faker::Number.number(3)
  recipient_profile.vehicle = [true, false].sample
  recipient_profile.kitchen = [true, false].sample
  recipient_profile.refrigeration = [true, false].sample
  recipient_profile.notfications = [true, false].sample
  recipient_profile.population_description = Faker::Lorem.paragraph
  recipient_profile.days_of_operation = Faker::Lorem.word
  recipient_profile.food_types_wanted = Faker::Lorem.sentence(3)
  recipient_profile.food_types_unwanted = Faker::Lorem.sentence(3)
  recipient_profile.challenges = Faker::Lorem.paragraph
  recipient_profile.longitude = Faker::Address.longitude
  recipient_profile.latitude = Faker::Address.latitude
  recipient_profile.save!
end

def create_coordinators(num_rows)
  1.upto(num_rows) do |n|
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

def create_donations_and_interests(num_rows)
  1.upto(num_rows) do |n|
    donation = Donation.create!(
      status: ["In Progress", "Pending", "Completed"].sample,
      donor_id: [1, 2, 3, 4, 5].sample,
      refrigeration: [true, false].sample,
      window_start: Faker::Date.between(2.days.ago, 1.days.ago),
      window_end: Faker::Date.between(1.days.ago, 10.days.from_now),
      picture: Faker::Internet.url,
      description: Faker::Lorem.sentence(3),
      longitude: Faker::Address.longitude,
      latitude: Faker::Address.latitude,
      can_dropoff: [true, false].sample
    )
    1.upto(rand(num_rows)) do
      Interest.create!(
        donation_id: donation.id,
        recipient_id: Recipient.offset(rand(Recipient.count)).first.id
      )
    end
  end
end

def create_transactions(num_rows)
  1.upto(num_rows) do
    Transaction.create!(
      donation_id: Donation.offset(rand(Donation.count)).first.id,
      recipient_id: Recipient.offset(rand(Recipient.count)).first.id,
      coordinator_id: Coordinator.offset(rand(Coordinator.count)).first.id,
      delivered_at: Faker::Date.between(1.days.ago, Date.today),
      picked_up_at: Faker::Date.between(4.days.ago, 1.days.ago),
      created_at: Faker::Date.between(7.days.ago, 4.days.ago),
      updated_at: Faker::Date.between(7.days.ago, 4.days.ago),
    )
  end
end
