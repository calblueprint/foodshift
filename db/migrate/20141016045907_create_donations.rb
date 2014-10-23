class CreateDonations < ActiveRecord::Migration
  def change
    create_table :donations do |t|
      t.timestamps
      t.references :donor, index: true
      t.string :company
      t.string :address
      t.string :person
      t.string :phone
      t.string :email
      t.integer :pickup_time_window
      t.boolean :refrigeration
      t.string :food_type
      t.integer :quantity
    end
  end
end
