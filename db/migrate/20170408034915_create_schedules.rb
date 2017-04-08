class CreateSchedules < ActiveRecord::Migration[5.0]
  def change
    create_table :schedules do |t|
      t.string :name
      t.date :schedule_datetime

      t.timestamps
    end
  end
end
