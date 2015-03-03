class UsePicturesInDonations < ActiveRecord::Migration
  def change
    remove_column :donations, :food_type, :string
    remove_column :donations, :quantity, :integer
    add_column :donations, :picture_url, :string
    add_column :donations, :description, :text
  end
end
