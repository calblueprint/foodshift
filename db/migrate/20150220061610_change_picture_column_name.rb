class ChangePictureColumnName < ActiveRecord::Migration
  def change
    rename_column :donations, :picture_url, :picture
  end
end
