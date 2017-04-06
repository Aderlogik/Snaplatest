class CreateSchedules < ActiveRecord::Migration[5.0]
  def change
    create_table :schedules do |t|
      t.boolean :monday
      t.boolean :tuesday
      t.boolean :wednsday
      t.boolean :thursday
      t.boolean :friday
      t.boolean :saturday
      t.boolean :sunday
      t.integer :user_id
      t.integer :subscription_id

      t.timestamps
    end
  end
end
