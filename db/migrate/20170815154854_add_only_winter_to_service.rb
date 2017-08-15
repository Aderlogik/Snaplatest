class AddOnlyWinterToService < ActiveRecord::Migration[5.0]
  def change
    add_column :services, :only_winter, :boolean
  end
end
