class AddPriceToPayments < ActiveRecord::Migration[5.0]
  def change
    add_column :payments, :price, :decimal, :precision => 10, :scale => 2
    add_column :payments, :processing_fee, :decimal, :precision => 10, :scale => 2
    add_column :payments, :recurring_fee, :decimal, :precision => 10, :scale => 2    
  end
end
