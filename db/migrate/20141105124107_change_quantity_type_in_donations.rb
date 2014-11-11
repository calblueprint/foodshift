class ChangeQuantityTypeInDonations < ActiveRecord::Migration
  def up
    change_column :donations, :quantity, :string
  end

  def down
    change_column :donations, :quantity, :integer
  end
end
