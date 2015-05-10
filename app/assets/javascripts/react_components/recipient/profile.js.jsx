/** @jsx React.DOM */

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var STATUS_IN_PROGRESS ="In Progress";
var STATUS_PENDING ="Pending";
var STATUS_COMPLETED ="Completed";
var STATUS_CANCELED ="Canceled";

var RecipientHistory = React.createClass({
  getInitialState: function() {
    return {
      transactions: gon.transactions,
      interests: gon.interests,
      openDonationId: null
    };
  },
  handleDonationItemOpen: function(event) {
    var donationId = event.donationId;
    if (this.state.openDonationId === event.donationId) {
      // If we click on an open recipient, we want to close it
      donationId = null;
    }
    this.setState({openDonationId: donationId});
  },

  renderTransaction: function(transaction) {
    var isOpen = (transaction.donation.id === this.state.openDonationId);
    return (
      <DonationItem
        key={transaction.donation.id}
        isOpen={isOpen}
        donation={transaction.donation}
        transaction={transaction}
        handleClick={this.handleDonationItemOpen}
      />
    );
  },

  render: function() {
    var donation_items =  _.map(this.state.transactions, this.renderTransaction.bind(this));
    var interest_items = _.map(this.state.interests, this.renderTransaction.bind(this));
    return (
      <div className="card-history">
        <div className="row">
          <div className="small-12 columns">
            <div className="history-title">
              Recipient History ({this.state.transactions.length + this.state.interests.length})
            </div>
            <div className="donation-container">
              <div className="donation-key-container">
                <div className="row">
                  <div className="small-12 columns">
                    <div className="donation-key donation-key-pending">Pending</div>
                    <div className="donation-key-description">Requested Donation - Pending Match</div>
                    <div className="donation-key donation-key-inprogress">In Progress</div>
                    <div className="donation-key-description">Matched with Donation</div>
                    <div className="donation-key donation-key-completed">Completed</div>
                    <div className="donation-key-description">Donation Delivered</div>
                  </div>
                </div>
              </div>
              {interest_items}
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
                <li><i className="fa-li fa fa-user"></i>{this.props.donation.donor.donor_profile.person}</li>
                <li><i className="fa-li fa fa-map-marker"></i>{this.props.donation.donor.donor_profile.address}</li>
                <li><i className="fa-li fa fa-phone"></i>{this.props.donation.donor.donor_profile.phone}</li>
                <li><i className="fa-li fa fa-envelope-o"></i>{this.props.donation.donor.donor_profile.email}</li>
              </ul>
            </div>
            <div className="small-12 medium-6 medium-offset-1 end columns">
              <img className="donation-picture picture-inprogress" src={this.props.donation.picture.url}/>
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
              <p><strong>Donor:</strong> {this.props.donation.donor.donor_profile.organization}</p>
            </div>
            <div className="small-3 columns">
              <div className="donation-modify">
                <div className="donation-status">
                  <p><strong>{this.props.donation.status}</strong></p>
                </div>
                <a href={"/donation/cancel_match.".concat(this.props.donation.id)} className="donation-modify-link donation-cancel">Cancel</a>
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
              <ul className="fa-ul">
                <li><i className="fa-li fa fa-user"></i>{this.props.donation.donor.donor_profile.person}</li>
                <li><i className="fa-li fa fa-map-marker"></i>{this.props.donation.donor.donor_profile.address}</li>
                <li><i className="fa-li fa fa-phone"></i>{this.props.donation.donor.donor_profile.phone}</li>
                <li><i className="fa-li fa fa-envelope-o"></i>{this.props.donation.donor.donor_profile.email}</li>
              </ul>
              <img className="donation-picture" src={this.props.donation.picture.url}/>
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
              <p><strong>Donor:</strong> {this.props.donation.donor.donor_profile.organization}</p>
            </div>
            <div className="small-3 columns">
              <div className="donation-modify">
                <div className="donation-status">
                  <p><strong>{this.props.donation.status}</strong></p>
                </div>
                <a href={"/donation/cancel_interest.".concat(this.props.donation.id)} className="donation-modify-link donation-cancel">Cancel Request</a>
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
                <li><i className="fa-li fa fa-user"></i>{this.props.donation.donor.donor_profile.person}</li>
                <li><i className="fa-li fa fa-map-marker"></i>{this.props.donation.donor.donor_profile.address}</li>
                <li><i className="fa-li fa fa-phone"></i>{this.props.donation.donor.donor_profile.phone}</li>
                <li><i className="fa-li fa fa-envelope-o"></i>{this.props.donation.donor.donor_profile.email}</li>
              </ul>
            </div>
            <div className="small-12 medium-6 medium-offset-1 end columns">
              <img className="donation-picture picture-completed" src={this.props.donation.picture.url}/>
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
              <p><strong>Donor:</strong> {this.props.donation.donor.donor_profile.organization}</p>
              <p><strong>Picked up at:</strong> {this.props.transaction.picked_up_at}</p>
              <p><strong>Delivered at:</strong> {this.props.transaction.delivered_at}</p>
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
              <img className="donation-picture" src={this.props.donation.picture.url}/>
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
              <p><strong>Donor:</strong> {this.props.donation.donor.donor_profile.organization}</p>
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
  <RecipientHistory />,
  document.getElementById('recipient-history')
);
