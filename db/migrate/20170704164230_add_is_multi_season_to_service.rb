class AddIsMultiSeasonToService < ActiveRecord::Migration[5.0]
  def change
    add_column :services, :is_multi_season, :boolean
  end
end
