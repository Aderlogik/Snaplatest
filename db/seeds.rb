# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
admin = User.new(email: 'admin@example.com', password: 'password', password_confirmation: 'password', superadmin_role: 'true', first_name: 'Steve', last_name: 'Beneath', phone: 12345, avatar: Rails.root.join("app/assets/images/user-image.jpg").open)
admin.skip_confirmation!
admin.save

user = User.new(email: 'customer@example.com', password: 'password', password_confirmation: 'password', user_role: 'true', first_name: 'John', last_name: 'Cena', phone: 34566, avatar: Rails.root.join("app/assets/images/user-image.jpg").open)
user.skip_confirmation!
user.save

Service.create!([{service_name: "Edge of shrub & plant beds to maintain neat appearance"}, {service_name: "Shrub trimming"}, {service_name: "Tree pruning"}, {service_name: "Mulching"}, {service_name: "Gutter and Grate Cleaning"}, {service_name: "Clean Up"}, {service_name: "Power Washing"}])
Plan.create!([{name: "Weekly"}, {name: "Bi-Weekly"}])
Subplan.create!([{name: "Monthly", price: 50, services_commited: 4, plan_id: 1}, {name: "Quaterly", price: 45, services_commited: 12, plan_id: 1}, {name: "Half Yearly", price: 40, services_commited: 24, plan_id: 1}, {name: "Monthly", price: 55, services_commited: 2, plan_id: 2}, {name: "Quaterly", price: 50, services_commited: 6, plan_id: 2}, {name: "Half Yearly", price: 45, services_commited: 12, plan_id: 2}])
Schedule.create!([{name: "Monday"}, {name: "Tuesday"}, {name: "Wednsday"}, {name: "Thursday"}, {name: "Friday"}, {name: "Saturday"}, {name: "Sunday"}])
