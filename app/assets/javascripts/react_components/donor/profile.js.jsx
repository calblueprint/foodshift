/** @jsx React.DOM */

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var STATUS_IN_PROGRESS ="In Progress";
var STATUS_PENDING ="Pending";
var STATUS_COMPLETED ="Completed";
var STATUS_CANCELED ="Canceled";

var DonationHistory = React.createClass({
    getInitialState: function() {
        console.log(gon.donations);
        return {
            donations: gon.donations,
            openDonationId: null
        };
    },
    handleDonationItemOpen: function(event) {
        var donationId = event.donationId;
        if (this.state.openDonationId === donationId) {
            // If we click on an open recipient, we want to close it
            donationId = null;
        }
        this.setState({openDonationId: donationId});
    },
    render: function() {
        var donation_items =  _.map(this.state.donations, function(donation) {
            var isOpen = (donation.id === this.state.openDonationId);
            return (
                <DonationItem
                    key={donation.id}
                    isOpen={isOpen}
                    donation={donation}
                    handleClick={this.handleDonationItemOpen}
                />
            );
        }.bind(this));
        return (
            <div className="card-history">
              <div className="row">
                <div className="small-12 columns">
                  <div className="history-title">
                    Donation History
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
                    {donation_items}
                  </div>
                </div>
              </div>
            </div>
        );
    },
});

var DonationItem = React.createClass({
    handleClick: function() {
        this.props.handleClick({donationId: this.props.donation.id});
    },
    render: function() {
        switch (this.props.donation.status) {
            case STATUS_IN_PROGRESS:
                return this.renderDonationInProgress();
            case STATUS_PENDING:
                return this.renderDonationPending();
            case STATUS_COMPLETED:
                return this.renderDonationCompleted();
            case STATUS_CANCELED:
                return this.renderDonationCanceled();
        }
    },
    renderDonationInProgress: function() {
        if (this.props.isOpen) {
          fold_content = (
            <div className="donation-item-fold"  key={_.join("-", this.props.donation.id, "open")}>
              <div className="row">
                <div className="small-12 medium-4 columns">
                  <ul className="fa-ul">
                    <li><i className="fa-li fa fa-user"></i>{this.props.donation.food_transaction.recipient.recipient_profile.contact_person}</li>
                    <li><i className="fa-li fa fa-map-marker"></i>{this.props.donation.food_transaction.recipient.recipient_profile.address}</li>
                    <li><i className="fa-li fa fa-phone"></i>{this.props.donation.food_transaction.recipient.recipient_profile.contact_person_phone}</li>
                    <li><i className="fa-li fa fa-envelope-o"></i>{this.props.donation.food_transaction.recipient.email}</li>
                  </ul>
                </div>
                <div className="small-12 medium-8 columns">
                  <img src={this.props.donation.picture.url}/>
                </div>
              </div>
            </div>
          )
        } else {
          fold_content = (
            <div key={_.join("-", this.props.donation.id, "closed")}>
            </div>
          )
        }
        return (
          <div key={this.props.donation.id} onClick={this.handleClick} className="donation-item-wrapper donation-item-inprogress">
            <div className="donation-item">
              <div className="row">
                <div className="small-9 columns">
                  <h4>{this.props.donation.description}</h4>
                  <p><strong>Recipient:</strong> {this.props.donation.food_transaction.recipient.recipient_profile.organization}</p>
                </div>
                <div className="small-3 columns">
                  <div className="donation-modify">
                    <div className="donation-status">
                      <p><strong>{this.props.donation.status}</strong></p>
                    </div>
                    <p>Cannot Cancel Donation</p>
                  </div>
                </div>
              </div>
              <ReactCSSTransitionGroup transitionName="donation-item">
                  {fold_content}
              </ReactCSSTransitionGroup>
            </div>
          </div>
        );
    },
    renderDonationPending: function() {
        if (this.props.isOpen) {
          fold_content = (
            <div className="donation-item-fold"  key={_.join("-", this.props.donation.id, "open")}>
              <div className="row">
                <div className="small-9 columns">
                  <img src={this.props.donation.picture.url}/>
                </div>
              </div>
            </div>
          )
        } else {
          fold_content = (
            <div key={_.join("-", this.props.donation.id, "closed")}>
            </div>
          )
        }
        return (
          <div key={this.props.donation.id} onClick={this.handleClick} className="donation-item-wrapper donation-item-pending">
            <div className="donation-item">
              <div className="row">
                <div className="small-9 columns">
                  <h4>{this.props.donation.description}</h4>
                </div>
                <div className="small-3 columns">
                  <div className="donation-modify">
                    <div className="donation-status">
                      <p><strong>{this.props.donation.status}</strong></p>
                    </div>
                    <a href={"/donation/cancel.".concat(this.props.donation.id)} className="donation-modify-link donation-cancel">Cancel Donation</a>
                  </div>
                </div>
              </div>
              <ReactCSSTransitionGroup transitionName="donation-item">
                  {fold_content}
              </ReactCSSTransitionGroup>
            </div>
          </div>
        );
    },
    renderDonationCompleted: function() {
        var fold_content;
        if (this.props.isOpen) {
          fold_content = (
            <div className="donation-item-fold"  key={_.join("-", this.props.donation.id, "open")}>
              <div className="row">
                <div className="small-12 medium-4 columns">
                  <ul className="fa-ul">
                    <li><i className="fa-li fa fa-user"></i>{this.props.donation.food_transaction.recipient.recipient_profile.contact_person}</li>
                    <li><i className="fa-li fa fa-map-marker"></i>{this.props.donation.food_transaction.recipient.recipient_profile.address}</li>
                    <li><i className="fa-li fa fa-phone"></i>{this.props.donation.food_transaction.recipient.recipient_profile.contact_person_phone}</li>
                    <li><i className="fa-li fa fa-envelope-o"></i>{this.props.donation.food_transaction.recipient.email}</li>
                  </ul>
                </div>
                <div className="small-12 medium-8 columns">
                  <img src={this.props.donation.picture.url}/>
                </div>
              </div>
            </div>
          )
        } else {
          fold_content = (
            <div key={_.join("-", this.props.donation.id, "closed")}>
            </div>
          )
        }
        return (
          <div key={this.props.donation.id} onClick={this.handleClick} className="donation-item-wrapper donation-item-completed">
            <div className="donation-item">
              <div className="row">
                <div className="small-9 columns">
                  <h4>{this.props.donation.description}</h4>
                  <p><strong>Recipient:</strong> {this.props.donation.food_transaction.recipient.recipient_profile.organization}</p>
                  <p><strong>Picked up at:</strong> {this.props.donation.food_transaction.picked_up_at}</p>
                  <p><strong>Delivered at:</strong> {this.props.donation.food_transaction.delivered_at}</p>
                </div>
                <div className="small-3 columns">
                  <div className="donation-modify">
                    <div className="donation-status">
                      <p><strong>{this.props.donation.status}</strong></p>
                    </div>
                  </div>
                </div>
              </div>
              <ReactCSSTransitionGroup transitionName="donation-item">
                  {fold_content}
              </ReactCSSTransitionGroup>
            </div>
          </div>
        );
    },
    renderDonationCanceled: function() {
        if (this.props.isOpen) {
          fold_content = (
            <div className="donation-item-fold"  key={_.join("-", this.props.donation.id, "open")}>
              <div className="row">
                <div className="small-9 columns">
                  <img src={this.props.donation.picture.url}/>
                </div>
              </div>
            </div>
          )
        } else {
          fold_content = (
            <div key={_.join("-", this.props.donation.id, "closed")}>
            </div>
          )
        }
        return (
          <div key={this.props.donation.id} onClick={this.handleClick} className="donation-item-wrapper donation-item-canceled">
            <div className="donation-item">
              <div className="row">
                <div className="small-9 columns">
                  <h4>{this.props.donation.description}</h4>
                </div>
                <div className="small-3 columns">
                  <div className="donation-modify">
                    <div className="donation-status">
                      <p><strong className="canceled">{this.props.donation.status}</strong></p>
                    </div>
                  </div>
                </div>
              </div>
              <ReactCSSTransitionGroup transitionName="donation-item">
                  {fold_content}
              </ReactCSSTransitionGroup>
            </div>
          </div>
        );
    },
});

React.render(
    <DonationHistory />,
    document.getElementById('donation-history')
);
