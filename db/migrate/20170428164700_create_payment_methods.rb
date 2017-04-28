class CreatePaymentMethods < ActiveRecord::Migration[5.0]
  def change
    create_table :payment_methods do |t|
      t.string :credit_card_number
      t.integer :payment_id
      t.integer :subscription_id
      t.datetime :expiration_date
      t.integer :cvv_number
      t.integer :default_card
      t.timestamps
    end
  end
end
