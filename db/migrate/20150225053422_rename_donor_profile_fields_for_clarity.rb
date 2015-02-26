class RenameDonorProfileFieldsForClarity < ActiveRecord::Migration
  def change
    change_table :donor_profiles do |t|
      t.rename :reason, :reason_for_surplus
      t.rename :organic, :serves_organic_food
      t.rename :food_types, :typical_food_types_served
      t.rename :quantity, :typical_quantity_of_donation
      t.rename :pounds_per_week, :pounds_per_week_donated
      t.rename :good_samaritan, :aware_of_good_samaritan_food_act
      t.remove :donated_in_past
      t.column :donated_before, :boolean
    end
  end

end
