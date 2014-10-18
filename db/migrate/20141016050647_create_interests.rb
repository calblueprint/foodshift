class CreateInterests < ActiveRecord::Migration
  def change
    create_table :interests do |t|
      t.belongs_to :donation, index: true
      t.belongs_to :recipient, index: true

      t.timestamps
    end
  end
end
