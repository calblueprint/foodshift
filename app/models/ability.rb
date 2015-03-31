class Ability
  include CanCan::Ability

  def initialize(user)
    # Define abilities for the passed in user here.
    user ||= User.new # guest user (not logged in)
    if user.admin?
      can :manage, :all
    end
    if user.type == User.type_coordinator
      can :manage, [User, Interest, RecipientProfile, Donation, Recipient]
    end
    if user.type == User.type_donor
      can :manage, [Donor, Donation]
    end
    if user.type == User.type_shifter
      can :manage, [Shifter]
    end
  end
end
