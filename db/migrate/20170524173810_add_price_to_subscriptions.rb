class AddPriceToSubscriptions < ActiveRecord::Migration[5.0]
  def change
    add_column :subscriptions, :price, :decimal, :precision => 10, :scale => 2
    add_column :subscriptions, :processing_fee, :decimal, :precision => 10, :scale => 2
    add_column :subscriptions, :recurring_fee, :decimal, :precision => 10, :scale => 2
  end
end
