class ChangeKitchenToVehicle < ActiveRecord::Migration
  def change
    rename_column :recipient_profiles, :kitchen, :vehicle
  end
end
