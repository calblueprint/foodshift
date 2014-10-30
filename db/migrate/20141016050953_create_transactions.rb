class CreateTransactions < ActiveRecord::Migration
  def change
    create_table :transactions do |t|
      t.timestamps
      t.belongs_to :donation, index: true
      t.belongs_to :recipient, index: true
      t.belongs_to :coordinator, index: true
      t.boolean :completed
      t.datetime :completed_time
    end
  end
end
