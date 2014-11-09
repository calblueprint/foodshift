class ChangeFoodTypeTypeInDonation < ActiveRecord::Migration
  def up
    remove_column :donations, :food_type
    add_column :donations, :food_type, :string, array: true, default: []
  end

  def down
    remove_column :donations, :food_type
    add_column :donations, :food_type, :string
  end
end
