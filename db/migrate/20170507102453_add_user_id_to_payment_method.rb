class AddUserIdToPaymentMethod < ActiveRecord::Migration[5.0]
  def change
    add_column :payment_methods, :user_id, :integer
  end
end
