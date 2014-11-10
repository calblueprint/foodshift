class RenameCompanyToOrganizationInDonations < ActiveRecord::Migration
  def change
    rename_column :donations, :company, :organization
  end
end
