class AlterRecipientProfile < ActiveRecord::Migration
  def change
    remove_column :recipient_profiles, :email
    add_column :recipient_profiles, :longitude, :decimal
    add_column :recipient_profiles, :latitude, :decimal
  end
end
