class AddDefaultWeekToService < ActiveRecord::Migration[5.0]
  def change
    add_column :services, :default_week, :integer, default: 3
    add_column :services, :frequency, :integer, default: 2
  end
end
