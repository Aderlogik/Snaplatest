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

Service.create!([{service_name: "Edging of shrub & plant beds to maintain neat appearance", description: "Edging of flower beds to maintain neat appearance."}, {service_name: "Mulching", description: "Gently Mulch all plant beds to accommodate neat appearance."}, {service_name: "Shrub trimming & tree pruning", description: "Properly trim shrubs and prune trees to proper size and shape."}, {service_name: "Gutter / Grate cleaning", description: "Efficiently clean all gutters and grates of leaves and debris."}, {service_name: "Clean Up", description: "Efficiently clean all debris and out of plant beds and lawn."}, {service_name: "Power Washing", description: "Properly trim shrubs and prune trees to proper size and shape."}])
ServiceSeason.create!([{name: "Spring", service_id: 1, start_date: "2017-04-01", end_date: "2017-05-31"}, {name: "Summer", service_id: 1, start_date: "2017-06-01", end_date: "2017-08-31"}, {name: "Spring & Summer", service_id: 1, start_date: "2017-04-01 - 2017-05-31", end_date: "2017-06-01 - 2017-08-31"},
 {name: "Spring", service_id: 2, start_date: "2017-04-01", end_date: "2017-05-31"}, {name: "Summer", service_id: 2, start_date: "2017-06-01", end_date: "2017-08-31"}, {name: "Spring & Summer", service_id: 2, start_date: "2017-04-01 - 2017-05-31", end_date: "2017-06-01 - 2017-08-31"},
 {name: "Spring", service_id: 3, start_date: "2017-04-01", end_date: "2017-05-31"}, {name: "Summer", service_id: 3, start_date: "2017-06-01", end_date: "2017-08-31"}, {name: "Spring & Summer", service_id: 3, start_date: "2017-04-01 - 2017-05-31", end_date: "2017-06-01 - 2017-08-31"},
 {name: "Spring", service_id: 4, start_date: "2017-04-01", end_date: "2017-05-31"}, {name: "Fall", service_id: 4, start_date: "2017-09-01", end_date: "2017-11-30"}, {name: "Spring & Fall", service_id: 4, start_date: "2017-04-01 - 2017-05-31", end_date: "2017-09-01 - 2017-11-30"},
 {name: "Spring", service_id: 5, start_date: "2017-04-01", end_date: "2017-05-31"}, {name: "Fall", service_id: 5, start_date: "2017-09-01", end_date: "2017-11-30"}, {name: "Spring & Fall", service_id: 5, start_date: "2017-04-01 - 2017-05-31", end_date: "2017-09-01 - 2017-11-30"},
 {name: "Spring", service_id: 6, start_date: "2017-04-01", end_date: "2017-05-31"}, {name: "Summer", service_id: 6, start_date: "2017-06-01", end_date: "2017-08-31"}, {name: "Spring & Summer", service_id: 6, start_date: "2017-04-01 - 2017-05-31", end_date: "2017-06-01 - 2017-08-31"}])
Plan.create!([{name: "Weekly"}, {name: "Bi-Weekly"}])
Subplan.create!([{name: "Trial", price: 50, services_commited: 0, plan_id: 1}, {name: "Seasonal", price: 45, services_commited: 0, plan_id: 1}, {name: "Trial", price: 55, services_commited: 0, plan_id: 2}, {name: "Seasonal", price: 50, services_commited: 0, plan_id: 2}])
Schedule.create!([{name: "Monday"}, {name: "Tuesday"}, {name: "Wednsday"}, {name: "Thursday"}, {name: "Friday"}, {name: "Saturday"}, {name: "Sunday"}])
MulchingType.create!([{name: "Peet Mulch", price: 120}, {name: "Black Mulch", price: 100}, {name: "Dark Brown Mulch", price: 100}, {name: "Light Brown Mulch", price: 100}, {name: "Red Mulch", price: 100}])
