# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# def seeds
#   YAML.load(File.read(File.expand_path('../seeds.yml', __FILE__)))
# end

def create_users
  1.upto(5) do |n|
    Donor.create! email: "donor#{n}@foodshift.net",
                  password: 'password',
                  subscribed: 'true',
                  type: 'Donor'
  end

  1.upto(5) do |n|
    Recipient.create! email: "recipient#{n}@foodshift.net",
                  password: 'password',
                  subscribed: 'true',
                  type: 'Recipient'
  end

  Donor.create! email: 'ericayin@berkeley.edu',
  				  password: 'password',
                  subscribed: 'true',
                  type: 'Donor'

  Recipient.create! email: "ericayin831@gmail.com",
                  password: 'password',
                  subscribed: 'true',
                  type: 'Recipient'

end

create_users