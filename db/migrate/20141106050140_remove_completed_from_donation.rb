class RemoveCompletedFromDonation < ActiveRecord::Migration
  def change
    remove_column :donations, :completed, :datetime
  end
end
