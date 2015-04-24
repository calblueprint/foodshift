class AddKitchenBack < ActiveRecord::Migration
  def change
    add_column :recipient_profiles, :kitchen, :boolean
  end
end
