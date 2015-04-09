class RemoveGenericInfoFromDonation < ActiveRecord::Migration
  def change
    remove_column :donations, :organization, :string
    remove_column :donations, :address, :string
    remove_column :donations, :person, :string
    remove_column :donations, :phone, :string
    remove_column :donations, :email, :string
    add_column :donor_profiles, :organization, :string
    add_column :donor_profiles, :address, :string
    add_column :donor_profiles, :person, :string
    add_column :donor_profiles, :phone, :string
    add_column :donor_profiles, :email, :string
  end
end
