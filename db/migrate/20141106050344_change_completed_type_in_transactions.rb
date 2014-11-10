class ChangeCompletedTypeInTransactions < ActiveRecord::Migration
  def up
    remove_column :transactions, :completed, :boolean
    add_column :transactions, :completed, :datetime, default: nil
  end

  def down
    remove_column :transactions, :completed, :datetime, default: nil
    add_column :transactions, :completed, :boolean
  end
end
