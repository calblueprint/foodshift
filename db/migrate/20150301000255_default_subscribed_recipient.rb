class DefaultSubscribedRecipient < ActiveRecord::Migration
  def change
    change_column :users, :subscribed, :boolean, :default => true
  end
end
