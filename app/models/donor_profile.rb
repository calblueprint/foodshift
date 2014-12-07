class DonorProfile < ActiveRecord::Base
  belongs_to :donor

  mount_uploader :logo, LogoUploader
end
