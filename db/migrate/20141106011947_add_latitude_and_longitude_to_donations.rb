class AddLatitudeAndLongitudeToDonations < ActiveRecord::Migration
  def change
    add_column :donations, :latitude, :float
    add_column :donations, :longitude, :float
  end
end
