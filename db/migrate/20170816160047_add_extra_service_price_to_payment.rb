class AddExtraServicePriceToPayment < ActiveRecord::Migration[5.0]
  def change
    add_column :payments, :extra_service_price, :decimal, :precision => 10, :scale => 2
  end
end
