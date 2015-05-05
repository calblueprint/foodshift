desc "This task is called by the Heroku scheduler add-on to cancel donations that are already expired."
task :update_donations => :environment do
  puts "Updating donations..."
  new_and_pending = Donation.where({ status: [Donation.type_new, Donation.type_pending] })
  expired = new_and_pending.where("window_end <= :now", :now => Time.now)
  expired.each do |e|
    e.update_attributes({ status: Donation.type_canceled })
  end
  puts "Done! #{expired.length} donations were updated."
end
