# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20150310102753) do

  create_table "donations", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "donor_id"
    t.string   "organization",                    null: false
    t.string   "address",                         null: false
    t.string   "person",                          null: false
    t.string   "phone",                           null: false
    t.string   "email",                           null: false
    t.boolean  "refrigeration",   default: false
    t.datetime "window_start",                    null: false
    t.datetime "window_end",                      null: false
    t.text     "additional_info"
    t.decimal  "latitude"
    t.decimal  "longitude"
    t.string   "picture"
    t.text     "description"
    t.boolean  "can_dropoff"
    t.string   "status"
  end

  add_index "donations", ["donor_id"], name: "index_donations_on_donor_id", using: :btree

  create_table "donor_profiles", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "donor_id"
    t.string   "reason_for_surplus"
    t.boolean  "serves_organic_food"
    t.string   "frequency_of_surplus"
    t.string   "typical_food_types_served"
    t.string   "typical_quantity_of_donation"
    t.integer  "pounds_per_week_donated"
    t.boolean  "aware_of_good_samaritan_food_act"
    t.boolean  "donated_before"
  end

  add_index "donor_profiles", ["donor_id"], name: "index_donor_profiles_on_donor_id", using: :btree

  create_table "interests", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "donation_id"
    t.integer  "recipient_id"
  end

  add_index "interests", ["donation_id"], name: "index_interests_on_donation_id", using: :btree
  add_index "interests", ["recipient_id"], name: "index_interests_on_recipient_id", using: :btree

  create_table "recipient_profiles", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "recipient_id"
    t.string   "organization"
    t.string   "address"
    t.integer  "org501c3"
    t.string   "contact_person"
    t.string   "contact_person_phone"
    t.string   "hrs_of_operation"
    t.string   "num_people_served"
    t.boolean  "kitchen"
    t.boolean  "refrigeration"
    t.boolean  "notfications"
    t.text     "population_description"
    t.string   "days_of_operation"
    t.string   "food_types_wanted"
    t.string   "food_types_unwanted"
    t.text     "challenges"
    t.decimal  "longitude"
    t.decimal  "latitude"
  end

  add_index "recipient_profiles", ["recipient_id"], name: "index_recipient_profiles_on_recipient_id", using: :btree

  create_table "transactions", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "donation_id"
    t.integer  "recipient_id"
    t.integer  "coordinator_id"
    t.datetime "delivered_at"
    t.datetime "picked_up_at"
  end

  add_index "transactions", ["coordinator_id"], name: "index_transactions_on_coordinator_id", using: :btree
  add_index "transactions", ["donation_id"], name: "index_transactions_on_donation_id", using: :btree
  add_index "transactions", ["recipient_id"], name: "index_transactions_on_recipient_id", using: :btree

  create_table "users", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "type"
    t.boolean  "subscribed",             default: true
    t.boolean  "admin",                  default: false
    t.string   "secret_token"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
