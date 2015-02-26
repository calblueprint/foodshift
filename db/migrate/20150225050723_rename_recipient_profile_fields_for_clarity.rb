class RenameRecipientProfileFieldsForClarity < ActiveRecord::Migration
  def change
    change_table :recipient_profiles do |t|
      t.rename :person, :contact_person
      t.rename :phone, :contact_person_phone
      t.rename :operation, :hrs_of_operation
      t.rename :num_people_serve, :num_people_served
      t.rename :population, :population_description
      t.rename :days_serve, :days_of_operation
    end
  end
end
