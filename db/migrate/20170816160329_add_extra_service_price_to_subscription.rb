class AddExtraServicePriceToSubscription < ActiveRecord::Migration[5.0]
  def change
    add_column :subscriptions, :extra_service_price, :decimal, :precision => 10, :scale => 2
  end
end
