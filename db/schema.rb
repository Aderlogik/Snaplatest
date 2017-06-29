# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170629181547) do

  create_table "locations", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "name"
    t.string   "address"
    t.string   "city"
    t.string   "state"
    t.string   "zip"
    t.string   "country"
    t.string   "latitude"
    t.string   "longitude"
    t.string   "area_in_feet"
    t.string   "area_in_acres"
    t.integer  "subscription_id"
    t.string   "map_url"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["user_id"], name: "index_locations_on_user_id"
  end

  create_table "mulching_types", force: :cascade do |t|
    t.string   "name"
    t.string   "price"
    t.string   "integer"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "payment_methods", force: :cascade do |t|
    t.string   "card_number"
    t.integer  "payment_id"
    t.integer  "subscription_id"
    t.integer  "cvv"
    t.integer  "default_card"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.string   "card_holder_name"
    t.string   "stripe_card_token"
    t.integer  "exp_month"
    t.integer  "exp_year"
    t.integer  "user_id"
  end

  create_table "payments", force: :cascade do |t|
    t.string   "card_number"
    t.string   "card_holder_name"
    t.string   "cvc"
    t.integer  "subscription_id"
    t.integer  "location_id"
    t.integer  "user_id"
    t.integer  "exp_month"
    t.string   "stripe_card_token"
    t.integer  "exp_year"
    t.datetime "created_at",                                 null: false
    t.datetime "updated_at",                                 null: false
    t.decimal  "price",             precision: 10, scale: 2
    t.decimal  "processing_fee",    precision: 10, scale: 2
    t.decimal  "recurring_fee",     precision: 10, scale: 2
  end

  create_table "plans", force: :cascade do |t|
    t.string   "name"
    t.string   "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "schedules", force: :cascade do |t|
    t.string   "name"
    t.date     "schedule_datetime"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  create_table "service_seasons", force: :cascade do |t|
    t.integer  "service_id"
    t.string   "name"
    t.string   "start_date"
    t.string   "end_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "services", force: :cascade do |t|
    t.string   "service_name"
    t.integer  "price"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.text     "description"
    t.integer  "default_week", default: 3
    t.integer  "frequency",    default: 2
  end

  create_table "subplans", force: :cascade do |t|
    t.string   "name"
    t.integer  "price"
    t.integer  "plan_id"
    t.integer  "services_commited"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  create_table "subscription_extra_services", force: :cascade do |t|
    t.integer  "service_id"
    t.integer  "subscription_id"
    t.date     "setup_date"
    t.string   "setup_season"
    t.text     "description"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "subscriptions", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "plan_id"
    t.integer  "sub_plan_id"
    t.integer  "schedule_id"
    t.integer  "technician_id"
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.integer  "service_id"
    t.decimal  "price",          precision: 10, scale: 2
    t.decimal  "processing_fee", precision: 10, scale: 2
    t.decimal  "recurring_fee",  precision: 10, scale: 2
    t.index ["user_id"], name: "index_subscriptions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "secondary_phone"
    t.string   "phone"
    t.string   "personal_email"
    t.string   "address"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.boolean  "superadmin_role"
    t.boolean  "supervisor_role"
    t.boolean  "user_role"
    t.string   "avatar"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
