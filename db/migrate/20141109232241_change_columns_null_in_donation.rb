class ChangeColumnsNullInDonation < ActiveRecord::Migration
  def up
    change_column :donations, :organization, :string, null: false
    change_column :donations, :address, :string, null: false
    change_column :donations, :person, :string, null: false
    change_column :donations, :phone, :string, null: false
    change_column :donations, :email, :string, null: false
    change_column :donations, :refrigeration, :boolean, default: false
    change_column :donations, :quantity, :string, null: false
    change_column :donations, :window_start, :datetime, null: false
    change_column :donations, :window_end, :datetime, null: false
    change_column :donations, :food_type, :string, array: true, default: '{}', null: false
  end

  def down
    change_column :donations, :organization, :string
    change_column :donations, :address, :string
    change_column :donations, :person, :string
    change_column :donations, :phone, :string
    change_column :donations, :email, :string
    change_column :donations, :refrigeration
    change_column :donations, :quantity, :string
    change_column :donations, :window_start, :datetime
    change_column :donations, :window_end, :datetime
    change_column :donations, :food_type, :string, array: true, default: []
  end
end
