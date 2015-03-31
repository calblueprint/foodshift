class AddEmailToRecipientProfile < ActiveRecord::Migration
  def change
    add_column :recipient_profiles, :contact_email, :string
  end
end
