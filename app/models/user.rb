class User < ApplicationRecord
  has_many :locations
  has_many :subscriptions
  has_many :payments
  has_many :payment_methods
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  mount_uploader :avatar, AvatarUploader
  attr_accessor :current_password
end
