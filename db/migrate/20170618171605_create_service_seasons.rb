class CreateServiceSeasons < ActiveRecord::Migration[5.0]
  def change
    create_table :service_seasons do |t|
      t.integer :service_id
      t.string :name
      t.string :start_date
      t.string :end_date

      t.timestamps
    end
  end
end
