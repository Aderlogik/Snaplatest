class CreateSubscriptionExtraServices < ActiveRecord::Migration[5.0]
  def change
    create_table :subscription_extra_services do |t|
      t.integer :service_id
      t.integer :subscription_id
      t.date :setup_date
      t.string :setup_season
      t.text :description

      t.timestamps
    end
  end
end
