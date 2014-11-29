class Ability
  include CanCan::Ability

  def initialize(user)
    # Define abilities for the passed in user here.
    user ||= User.new # guest user (not logged in)
    if user.type.eql? :Recipient.to_s
      can :create, Interest
    elsif user.type.eql? :Coordinator.to_s
      can :read, Donation
    else
    end
  end
end
