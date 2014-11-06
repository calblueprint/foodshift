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

ActiveRecord::Schema.define(version: 20141016050953) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "donations", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "donor_id"
    t.string   "company"
    t.string   "address"
    t.string   "person"
    t.string   "phone"
    t.string   "email"
    t.integer  "pickup_time_window"
    t.boolean  "refrigeration"
    t.string   "food_type"
    t.integer  "quantity"
  end

  add_index "donations", ["donor_id"], name: "index_donations_on_donor_id", using: :btree

  create_table "interests", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "donation_id"
    t.integer  "recipient_id"
  end

  add_index "interests", ["donation_id"], name: "index_interests_on_donation_id", using: :btree
  add_index "interests", ["recipient_id"], name: "index_interests_on_recipient_id", using: :btree

  create_table "transactions", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "donation_id"
    t.integer  "recipient_id"
    t.integer  "coordinator_id"
    t.boolean  "completed"
    t.datetime "completed_time"
  end

  add_index "transactions", ["coordinator_id"], name: "index_transactions_on_coordinator_id", using: :btree
  add_index "transactions", ["donation_id"], name: "index_transactions_on_donation_id", using: :btree
  add_index "transactions", ["recipient_id"], name: "index_transactions_on_recipient_id", using: :btree

  create_table "users", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
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
    t.string   "type"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
