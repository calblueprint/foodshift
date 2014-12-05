class CoordinatorController < ApplicationController
  before_action :auth

  def deliver
  end

  def schedule
  end

  def data
  end

  def auth
    authorize! :read, Donation
  end
end
