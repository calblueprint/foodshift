class Ability
  include CanCan::Ability

  def initialize(user)
    # Define abilities for the passed in user here.
    user ||= User.new # guest user (not logged in)
    if user.admin?
      can :manage, :all
    end
    if user.type == User.type_coordinator
      can :read, Donation
    end
  end
end
