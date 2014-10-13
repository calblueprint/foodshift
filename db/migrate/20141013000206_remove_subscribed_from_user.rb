class RemoveSubscribedFromUser < ActiveRecord::Migration
  def change
    remove_column :users, :Subscribed, :boolean
  end
end
