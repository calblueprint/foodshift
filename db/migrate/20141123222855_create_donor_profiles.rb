class CreateDonorProfiles < ActiveRecord::Migration
  def change
    create_table :donor_profiles do |t|
      t.timestamps
      t.belongs_to :donor, index: true
      t.string :reason
      t.boolean :organic
      t.string :frequency_of_surplus
      t.string :food_types
      t.string :quantity
      t.string :donated_in_past
      t.integer :pounds_per_week
      t.boolean :good_samaritan
    end
  end
end
