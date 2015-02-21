class DonorCanDropoffBoolean < ActiveRecord::Migration
  def change
    add_column :donations, :can_dropoff, :boolean
  end
end
