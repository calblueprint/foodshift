class AddLogoToProfiles < ActiveRecord::Migration
  def change
    add_column :recipient_profiles, :logo, :string
    add_column :donor_profiles, :logo, :string
  end
end
