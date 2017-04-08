# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password', superadmin_role: 'true', first_name: 'Steve', last_name: 'Beneath', phone: 12345, avatar: Rails.root.join("app/assets/images/user-image.jpg").open)
User.create!(email: 'customer@example.com', password: 'password', password_confirmation: 'password', user_role: 'true', first_name: 'John', last_name: 'Cena', phone: 34566, avatar: Rails.root.join("app/assets/images/user-image.jpg").open)
Service.create!([{service_name: "Edge of shrub & plant beds to maintain neat appearance"}, {service_name: "Shrub trimming"}, {service_name: "Tree pruning"}, {service_name: "Planting"}, {service_name: "Plant Health Care"}, {service_name: "Lawn Health Care"}, {service_name: "Mulching"}, {service_name: "Gutter / Gate Cleaning"}, {service_name: "Clean Up"}, {service_name: "Power Washing"}])
Plan.create!([{name: "Weekly"}, {name: "Bi-Weekly"}])
Subplan.create!([{name: "Monthly", price: 100, services_commited: 2}, {name: "Quaterly", price: 85, services_commited: 6}, {name: "Half Yearly", price: 75, services_commited: 12}])
Schedule.create!([{name: "Monday"}, {name: "Tuesday"}, {name: "Wednsday"}, {name: "Thursday"}, {name: "Friday"}, {name: "Saturday"}, {name: "Sunday"}])
