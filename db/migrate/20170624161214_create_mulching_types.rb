class CreateMulchingTypes < ActiveRecord::Migration[5.0]
  def change
    create_table :mulching_types do |t|
      t.string :name
      t.string :price
      t.string :integer

      t.timestamps
    end
  end
end
