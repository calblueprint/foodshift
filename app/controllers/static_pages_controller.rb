class StaticPagesController < ApplicationController
  def home
    if current_user && current_user.type == User.type_donor
      redirect_to donor_profile_path
    end
  end

  def about
  end
end
