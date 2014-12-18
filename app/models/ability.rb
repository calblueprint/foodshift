class Ability
  include CanCan::Ability

  def initialize(user)
    # Define abilities for the passed in user here.
    user ||= User.new # guest user (not logged in)
    if user.type == "Recipient"
      can :create, Interest
    elsif user.type == "Coordinator"
      can :read, Donation
    else
      can :create, Donation
    end
  end
end
