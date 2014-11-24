# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: "Chicago" }, { name: "Copenhagen" }])
#   Mayor.create(name: "Emanuel", city: cities.first)

# def seeds
#   YAML.load(File.read(File.expand_path("../seeds.yml", __FILE__)))
# end


def create_donations
  1.upto(5) do |n|
    Donation.create! 
      organization: "Blueprint",
      address: "Sutardja Dai Hall, Berkeley, CA 94709",
      person: ["Alli", "Atsu", "Harrison", "Erica", "Quinton"].sample,
      phone: "408-283-6923",
      email: "foodshift@shiftfood.org",
      refrigeration: [true, false].sample,
      quantity: "10",
      window_start: DateTime.new(2014, 8, 21, 8, 0),
      window_end: DateTime.new(2014, 8, 21, 11, 0),
      food_type: ["Bread", "Bulk", "Dairy", "Juice", "Mixed", "Meat", "Prepared", "Produce"].sample,
      longitude: "37.8747924",
      latitude: "-122.2583104"
  end
end

def create_users
  1.upto(5) do |n|
    Donor.create! 
      email: "donor#{n}@foodshift.net",
      password: "password",
      subscribed: "true",
      type: "Donor"
  end

  1.upto(5) do |n|
    Recipient.create! 
      email: "recipient#{n}@foodshift.net",
      password: "password",
      subscribed: "true",
      type: "Recipient"
  end

  1.upto(5) do |n|
    Coordinator.create!
      email: "coordinator#{n}@foodshift.net",
      password: "password",
      subscribed: "true",
      type: "Coordinator"
  end

  Donor.create! 
    email: "ericayin@berkeley.edu",
    password: "password",
    subscribed: "true",
    type: "Donor"

  Recipient.create! 
    email: "ericayin831@gmail.com",
    password: "password",
    subscribed: "true",
    type: "Recipient"

  Coordinator.create! 
    email: "eriicaericaerica@gmail.com",
    password: "password",
    subscribed: "true",
    type: "Coordinator"
end

create_donations
create_users