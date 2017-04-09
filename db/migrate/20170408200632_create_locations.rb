class CreateLocations < ActiveRecord::Migration[5.0]
  def change
    create_table :locations do |t|
      t.references :user, foreign_key: true
      t.string :name
      t.string :address
      t.string :city
      t.string :state
      t.string :zip
      t.string :country
      t.integer :area
      t.integer :acres

      t.timestamps
    end
  end
end
