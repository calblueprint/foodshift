class AddWindowStartAndWindowEndToDonations < ActiveRecord::Migration
  def change
    remove_column :donations, :pickup_time_window, :integer
    add_column :donations, :window_start, :datetime
    add_column :donations, :window_end, :datetime
  end
end
