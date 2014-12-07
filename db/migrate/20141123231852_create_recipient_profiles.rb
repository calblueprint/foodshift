class CreateRecipientProfiles < ActiveRecord::Migration
  def change
    create_table :recipient_profiles do |t|
      t.timestamps
      t.belongs_to :recipient, index: true
      t.string :organization
      t.string :address
      t.integer :org501c3
      t.string :person
      t.string :email
      t.string :phone
      t.string :operation
      t.string :num_people_serve
      t.boolean :kitchen
      t.boolean :refrigeration
      t.boolean :notfications
      t.text :population
      t.string :days_serve
      t.string :food_types_wanted
      t.string :food_types_unwanted
      t.text :challenges
    end
  end
end
