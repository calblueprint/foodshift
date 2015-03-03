class AddSecretTokenToUser < ActiveRecord::Migration
  def change
    add_column :users, :secret_token, :string
  end
end
