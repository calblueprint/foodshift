class AddAdditionalInfoToDonations < ActiveRecord::Migration
  def change
    add_column :donations, :additional_info, :text
  end
end
