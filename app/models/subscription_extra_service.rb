class SubscriptionExtraService < ApplicationRecord
  belongs_to :subscription
  belongs_to :service
end
