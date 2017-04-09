class AddSubscriptionIdToLocation < ActiveRecord::Migration[5.0]
  def change
    add_column :locations, :subscription_id, :integer
  end
end
