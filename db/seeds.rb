# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password', superadmin_role: 'true', first_name: 'Steve', last_name: 'Beneath', phone: 12345, avatar: Rails.root.join("app/assets/images/user-image.jpg").open)
User.create!(email: 'customer@example.com', password: 'password', password_confirmation: 'password', user_role: 'true', first_name: 'John', last_name: 'Cena', phone: 34566, avatar: Rails.root.join("app/assets/images/user-image.jpg").open)