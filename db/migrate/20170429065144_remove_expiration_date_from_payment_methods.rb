class RemoveExpirationDateFromPaymentMethods < ActiveRecord::Migration[5.0]
  def change
    remove_column :payment_methods, :expiration_date, :datetime
    rename_column :payment_methods, :credit_card_number, :card_number
    rename_column :payment_methods, :cvv_number, :cvv
	end
end
