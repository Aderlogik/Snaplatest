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
      t.string :area_in_feet
      t.string :area_in_acres
      t.integer :subscription_id
      t.string :map_url

      t.timestamps
    end
  end
end
