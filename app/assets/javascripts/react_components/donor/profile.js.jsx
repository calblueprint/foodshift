/** @jsx React.DOM */

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var DonationHistory = React.createClass({
    getInitialState: function() {
        return {
            donations: gon.donations
        };
    },
    render: function() {
        return (
            <div className="card-history">
              <div className="row">
                <div className="small-12 columns">
                  <div className="history-title">
                    Donation History (3)
                  </div>
                  <div className="donation-container">
                    <div className="donation-key-container">
                      <div className="row">
                        <div className="small-12 columns">
                          <div className="donation-key donation-key-pending">Pending</div>
                          <div className="donation-key-description">Needs Coordinator and/or Recipient</div>
                          <div className="donation-key donation-key-inprogress">In Progress</div>
                          <div className="donation-key-description">Coordinator and Recipient Assigned</div>
                          <div className="donation-key donation-key-completed">Completed</div>
                          <div className="donation-key-description">Donation Delivered</div>
                        </div>
                      </div>
                    </div>
                    {_.map(this.state.donations, this.renderDonationItem)}
                  </div>
                </div>
              </div>
            </div>
        );
    },
    renderDonationItem: function(donation) {
        switch (donation.status) {
            case "In Progress":
                return this.renderDonationInProgress(donation);
            case "Pending":
                return this.renderDonationPending(donation);
            case "Completed":
                return this.renderDonationCompleted(donation);
            case "Canceled":
                return this.renderDonationCanceled(donation);
        }
    },
    renderDonationInProgress: function(donation) {
        return (
          <div key={donation.id} className="donation-item donation-item-inprogress">
            <div className="row">
              <div className="small-9 columns">
                <h4>{donation.description}</h4>
              </div>
              <div className="small-3 columns">
                <div className="donation-modify">
                  <span className="donation-status">{donation.status}</span>
                  <span>Cannot Cancel Donation</span>
                </div>
              </div>
            </div>
          </div>
        );
    },
    renderDonationPending: function(donation) {
        return (
          <div key={donation.id} className="donation-item donation-item-pending">
            <div className="row">
              <div className="small-9 columns">
                <h4>{donation.description}</h4>
              </div>
              <div className="small-3 columns">
                <div className="donation-modify">
                  <span className="donation-status">{donation.status}</span>
                  <a href={"/donation/cancel.".concat(donation.id)} className="donation-modify-link donation-cancel">Cancel Donation</a>
                </div>
              </div>
            </div>
          </div>
        );
    },
    renderDonationCompleted: function(donation) {
        return (
          <div key={donation.id} className="donation-item donation-item-inprogress">
            <div className="row">
              <div className="small-9 columns">
                <h4>{donation.description}</h4>
                <div>
                    <b>Recipient:</b> {donation.food_transaction.recipient.recipient_profile.contact_person}
                </div>
                <div>
                    <b>Picked up at:</b> {donation.food_transaction.picked_up_at}
                </div>
                <div>
                    <b>Delivered at:</b> {donation.food_transaction.delivered_at}
                </div>
              </div>
              <div className="small-3 columns">
                <div className="donation-modify">
                  <span className="donation-status">{donation.status}</span>
                </div>
              </div>
            </div>
          </div>
        );
    },
    renderDonationCanceled: function(donation) {
        return (
          <div key={donation.id} className="donation-item donation-item-canceled">
            <div className="row">
              <div className="small-9 columns">
                <h4>{donation.description}</h4>
              </div>
              <div className="small-3 columns">
                <div className="donation-modify">
                  <span className="donation-status">{donation.status}</span>
                </div>
              </div>
            </div>
          </div>
        );

    },
});


React.render(
    <DonationHistory />,
    document.getElementById('donation-history')
);
