class AddPriceToSubscriptionExtraService < ActiveRecord::Migration[5.0]
  def change
    add_column :subscription_extra_services, :price, :decimal, :precision => 10, :scale => 2
    add_column :subscription_extra_services, :salting, :boolean
    add_column :subscription_extra_services, :salting_price, :decimal, :precision => 10, :scale => 2
  end
end
