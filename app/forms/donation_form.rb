class DonationForm < Form
    DATETIME_FORMAT = '%Y-%m-%d %I:%M %p'

    attr_accessor(
        :donor_id,
        :food_type,
        :quantity,
        :address,
        :date,
        :start_time,
        :end_time,
        :person,
        :organization,
        :email,
        :phone,
        :refrigeration,
        :additional_info
    )

    def save
        return false unless valid?
        if create_objects
            # TODO: Other actions when donation are created?
            true
        else
            false
        end
    end

    def create_objects
        begin
            ActiveRecord::Base.transaction do
                donation.save!
            end
        rescue ActiveRecord::RecordInvalid => invalid
            false
        end
    end

    def donation
        @donation ||= Donation.new(
            organization: organization,
            address: address,
            person: person,
            phone: phone,
            email: email,
            refrigeration: refrigeration,
            quantity: quantity,
            window_start: window_start,
            window_end: window_end,
            additional_info: additional_info,
            food_type: food_type,
            latitude: -35,
            longitude: -35,
        )
    end

    def window_start
        DateTime.strptime("#{date} #{start_time}", DATETIME_FORMAT)
    end

    def window_end
        DateTime.strptime("#{date} #{end_time}", DATETIME_FORMAT)
    end
end
