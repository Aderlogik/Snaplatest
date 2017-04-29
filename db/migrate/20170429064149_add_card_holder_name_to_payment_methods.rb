class AddCardHolderNameToPaymentMethods < ActiveRecord::Migration[5.0]
  def change
    add_column :payment_methods, :card_holder_name, :string
    add_column :payment_methods, :stripe_card_token,:string
    add_column :payment_methods, :exp_month, :integer
    add_column :payment_methods, :exp_year, :integer
  end
end
