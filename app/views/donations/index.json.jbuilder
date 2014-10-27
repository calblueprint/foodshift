json.array!(@donations) do |donation|
  json.extract! donation, :id, :donor_id, :company, :address, :person, :phone, :email, :pickup_time_window, :refrigeration, :food_type, :quantity
  json.url donation_url(donation, format: :json)
end
