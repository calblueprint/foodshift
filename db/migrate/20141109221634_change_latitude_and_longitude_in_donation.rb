class ChangeLatitudeAndLongitudeInDonation < ActiveRecord::Migration
  def up
    remove_column :donations, :latitude
    remove_column :donations, :longitude
    add_column :donations, :latitude, :decimal
    add_column :donations, :longitude, :decimal
  end

  def down
    remove_column :donations, :latitude
    remove_column :donations, :longitude
    add_column :donations, :latitude, :float
    add_column :donations, :longitude, :float
  end
end
