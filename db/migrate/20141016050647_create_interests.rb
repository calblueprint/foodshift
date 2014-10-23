class CreateInterests < ActiveRecord::Migration
  def change
    create_table :interests do |t|
      t.timestamps
      t.belongs_to :donation, index: true
      t.belongs_to :recipient, index: true
    end
  end
end
