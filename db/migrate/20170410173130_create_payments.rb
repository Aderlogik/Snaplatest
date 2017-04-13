class CreatePayments < ActiveRecord::Migration[5.0]
  def change
    create_table :payments do |t|
      t.string :card_number
      t.string :card_holder_name
      t.string :cvc
      t.integer :subscription_id
      t.integer :location_id
      t.integer :user_id
      t.integer :exp_month
      t.string :stripe_card_token
      t.integer :exp_year 

      t.timestamps
    end
  end
end
