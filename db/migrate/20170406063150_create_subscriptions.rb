class CreateSubscriptions < ActiveRecord::Migration[5.0]
  def change
    create_table :subscriptions do |t|
      t.references :user, foreign_key: true
      t.integer :plan_id
      t.integer :sub_plan_id
      t.integer :schedule_id
      t.integer :technician_id

      t.timestamps
    end
  end
end
