class AddLogoToDonorProfile < ActiveRecord::Migration
  def change
    add_column :donor_profiles, :logo, :oid
  end
end
