class AddDeliveredAtAndPickedUpAtToTransaction < ActiveRecord::Migration
  def up
    remove_column :transactions, :completed_time
    remove_column :transactions, :completed
    add_column :transactions, :delivered_at, :datetime
    add_column :transactions, :picked_up_at, :datetime
  end

  def down
    remove_column :transactions, :delivered_at
    remove_column :transactions, :picked_up_at
    add_column :transactions, :completed_time, :datetime
    add_column :transactions, :completed, :datetime
  end
end
