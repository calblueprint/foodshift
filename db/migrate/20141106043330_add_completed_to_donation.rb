class AddCompletedToDonation < ActiveRecord::Migration
  def change
    add_column :donations, :completed, :datetime, {:default: nil}
  end
end
