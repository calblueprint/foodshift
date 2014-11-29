class CoordinatorController < ApplicationController

  def deliver
  	authorize! :read, Donation
  end

  def schedule
  	authorize! :read, Donation
  end

  def data
  	authorize! :read, Donation
  end
end
