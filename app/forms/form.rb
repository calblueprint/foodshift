class Form
    extend ActiveModel::Naming
    include ActiveModel::Model

    def persisted?
        false
    end
end
