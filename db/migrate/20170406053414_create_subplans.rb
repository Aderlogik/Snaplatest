class CreateSubplans < ActiveRecord::Migration[5.0]
  def change
    create_table :subplans do |t|
      t.string :name
      t.integer :price
      t.integer :plan_id

      t.timestamps
    end
  end
end
