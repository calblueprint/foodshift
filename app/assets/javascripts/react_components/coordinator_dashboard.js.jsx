/** @jsx React.DOM */

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

Number.prototype.mod = function(n) { return ((this % n) + n) % n; }

var Dashboard = React.createClass({
    getInitialState: function() {
        var donations = this.getDonationsList()
        return {
            donations: donations,
            recipients: this.getRecipientsList(donations[0].id),
            currDonationIndex: 0,
            transitionClass: null,
        };
    },
    getDonationsList: function() {
        // TODO: Write an AJAX version for this
        return [
            {
                id: 555,
                address: '620 3rd Street, San Francisco, CA, United States',
                foodTypes: ['Bread', 'Dairy'],
                quantity: '3 boxes',
                date: '1/1/2014',
                startTime: '1:00PM',
                endTime: '2:00PM',
                name: 'Joe Bloggs',
                organization: 'Blueprint',
                email: 'joe@bloggs.com',
                phone: '123-456-7890',
                additionalInfo: '  '
            },
            {
                id: 999,
                address: '420 4rd Street, San Francisco, CA, United States',
                foodTypes: ['Meat'],
                quantity: '1 tray',
                date: '10/10/2014',
                startTime: '10:00AM',
                endTime: '11:00AM',
                name: '2jun Jeong',
                organization: 'Greenprint',
                email: '2@jun.com',
                phone: '444-444-4444',
                additionalInfo: 'Here is some additional information about this donation.'
            }
        ]
    },
    getRecipientsList: function(donationId) {
        // TODO: Write an AJAX version for this
        var recipients = [
            {
                id: 1,
                donationId: 555,
                firstName: '1Jun',
                lastName: 'the Receiver',
                email: '1jun@receiver.com',
                phone: '555-555-1111',
                organization: 'Blackprint',
                address: '1015 Folsom Street, San Francisco, CA, United States',
                orgNumber: '9000',
            },
            {
                id: 2,
                donationId: 555,
                firstName: 'Joe',
                lastName: 'Recipient',
                email: 'joe@recipient.com',
                phone: '555-555-5555',
                organization: 'Redprint',
                address: '555 Center St., Berkeley, CA, United States',
                orgNumber: '5000',
            },
            {
                id: 3,
                donationId: 999,
                firstName: 'Food',
                lastName: ' Recipient',
                email: 'food@recipient.com',
                phone: '999-999-9999',
                organization: 'FF',
                address: '100 FF Street, Berkeley, CA, United States',
                orgNumber: '6000',
            }
        ]
        return _.filter(recipients, function(recipient) {
            return recipient.donationId === donationId;
        });
    },
    getNextDonation: function() {
        var index = (this.state.currDonationIndex + 1).mod( _.size(this.state.donations))
        var recipients = this.getRecipientsList(this.state.donations[index].id);
        this.setState({
            currDonationIndex: index,
            recipients: recipients,
            transitionClass: "slide-right"
        })
    },
    getPrevDonation: function() {
        var index = (this.state.currDonationIndex - 1).mod(_.size(this.state.donations))
        var recipients = this.getRecipientsList(this.state.donations[index].id);
        this.setState({
            currDonationIndex: index,
            recipients: recipients,
            transitionClass: "slide-left"
        })
    },
    getDefaultProps: function() {
        return {};
    },
    render: function() {
        return (
            <div className="row">
                <div className="small-12 columns">
                    <div className="dashboard-wrap">

                    <ReactCSSTransitionGroup transitionName={this.state.transitionClass}>

                            <div key={this.state.currDonationIndex} className="dashboard">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="small-12 columns">
                                            <span className="card-header-arrow-left">
                                                <a onClick={this.getPrevDonation}><i className="fa fa-chevron-left fa-lg"></i></a>
                                            </span>
                                            <span className="card-header-title">
                                                Donation {this.state.currDonationIndex + 1} of {_.size(this.state.donations)}
                                            </span>
                                            <span className="card-header-arrow-right">
                                                <a onClick={this.getNextDonation}><i className="fa fa-chevron-right fa-lg"></i></a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-donation">
                                    <div className="row">
                                        <div className="small-12 columns">
                                            <DonationInfo donation={this.state.donations[this.state.currDonationIndex]} />
                                        </div>
                                    </div>
                                </div>
                                <DonationRecipients recipients={this.state.recipients} />
                            </div>

                        </ReactCSSTransitionGroup>
                    </div>
                </div>
            </div>
        );
    }
});

var DonationInfo = React.createClass({
    getDefaultProps: function() {
        return {
            donation: {
                id: 0,
                address: 'Test St.',
                foodTypes: ['TestFood1', 'TestFood2'],
                quantity: '1 Tray',
                date: '1/1/2014',
                startTime: '10:00AM',
                endTime: '11:00AM',
                name: 'Foodshift User',
                organization: 'Food Shift',
                email: 'food@shift.com',
                phone: '123-456-7890',
                additionalInfo: 'I\'m hungry'
            }
        }
    },
    render: function() {
        return (
            <div className="donation-info">
                <div className="row">
                    <div className="medium-4 columns">
                        <h1 className="donation-info-title">{this.props.donation.organization}</h1>
                    </div>
                    <div className="medium-4 columns">
                        <ul className="fa-ul">
                          <li><i className="fa-li fa fa-clock-o"></i>{this.props.donation.date}</li>
                          <li><i className="fa-li fa "></i>{this.props.donation.startTime} - {this.props.donation.endTime}</li>
                          <li><i className="fa-li fa fa-map-marker"></i>{this.props.donation.address}</li>
                        </ul>
                    </div>
                    <div className="medium-4 columns">
                        <ul className="fa-ul">
                          <li><i className="fa-li fa fa-user"></i>{this.props.donation.name}</li>
                          <li><i className="fa-li fa fa-envelope-o"></i>{this.props.donation.email}</li>
                          <li><i className="fa-li fa fa-phone"></i>{this.props.donation.phone}</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="medium-3 medium-offset-1 columns">
                        <ul className="fa-ul">
                            <li>
                                <i className="fa-li fa fa-cutlery"></i>
                                {this.props.donation.quantity} of:
                                {this.renderFoodTypes()}
                            </li>
                        </ul>
                    </div>
                    <div className="medium-8 columns">
                        <ul className="fa-ul additional-info-list">
                            <li>
                                <i className="fa-li fa fa-info-circle"></i>
                                <p>{this.renderAdditionalInfo()}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    },
    renderFoodTypes: function() {
        var foodListItems = _.map(this.props.donation.foodTypes, function(foodType) {
            return (
                <li key={foodType}>{foodType}</li>
            );
        });
        return (
            <ul className="inline-list-food">
                {foodListItems}
            </ul>
        );
    },
    renderAdditionalInfo: function() {
        var info = this.props.donation.additionalInfo;
        if (_(info).isBlank()) {
            info = "No additional info about this donation."
        }
        return (
            <p className="additional-info">
                {info}
            </p>
        );

    }
});

var DonationRecipients = React.createClass({
    getInitialState: function() {
        return {
            openRecipientId: null
        };
    },
    getDefaultProps: function() {
        return {
            recipients: []
        }
    },
    handleRecipientOpen: function(event) {
        var recipientId = event.recipientId;
        if (this.state.openRecipientId === recipientId) {
            // If we click on an open recipient, we want to close it
            recipientId = null;
        }
        this.setState({openRecipientId: recipientId});
    },
    render: function() {
        recipients =  _.map(this.props.recipients, function (recipient) {
            var isOpen = (recipient.id === this.state.openRecipientId);
            return (
                <Recipient key={recipient.id} recipient={recipient} isOpen={isOpen} handleClick={this.handleRecipientOpen} />
            );
        }.bind(this));
        return (
            <div className="donation-recipients">
                <div className="row">
                    <div className="medium-6 columns no-right-pad">
                        <div className="recipients-list-title">
                            Recipient Requests
                        </div>
                        <div className="recipients-list">
                            {recipients}
                        </div>
                    </div>
                    <div className="medium-6 columns no-left-pad">
                        <div id="map-canvas"></div>
                    </div>
                </div>
            </div>
        );
    }
});

var Recipient = React.createClass({
    getDefaultProps: function() {
        return {
            recipient: {
                id: 2,
                firstName: 'Test',
                lastName: 'Recipient',
                email: 'test@recipient.com',
                phone: '123-456-7890',
                organization: 'Greenprint',
                address: '123 BP St.',
                orgNumber: '9000',
            },
            isOpen: false,
            handleClick: undefined,
        }
    },
    handleClick: function() {
        this.props.handleClick({recipientId: this.props.recipient.id});
    },
    handleSubmit: function() {
        // TODO: Actually submit via AJAX this select
        console.log("Selected donation: " + this.props.recipient.donationId + " with recipient: " + this.props.recipient.firstName + " " + this.props.recipient.lastName);
    },
    render: function() {
        var content;
        var titleClasses = React.addons.classSet({
           'recipient-title': true,
           'active': this.props.isOpen
        });
        if (this.props.isOpen) {
            content = this.renderOpen();
        } else {
            content =  this.renderClosed();
        }
        return (
            <div className="recipient" >
                <div className={titleClasses} onClick={this.handleClick}>
                    <div className="row">
                        <div className="medium-8 columns">
                            {this.props.recipient.address}
                        </div>
                        <div className="small-11 medium-3 columns">
                            15 min
                        </div>
                        <div className="small-1 end columns">
                            <a className="expand-icon"><i className="fa fa-chevron-down"></i></a>
                        </div>
                    </div>
                </div>
                <ReactCSSTransitionGroup transitionName="recipient-slide">
                    {content}
                </ReactCSSTransitionGroup>
            </div>
        )
    },
    renderOpen: function() {
        return (
            <div key={_.join("-", this.props.recipient.id, "open")} className="recipient-open">
                <div className="row">
                    <div className="medium-8 columns">
                        <div className="recipient-details">
                            <h1>{this.props.recipient.organization}</h1>
                            <ul className="fa-ul">
                              <li><i className="fa-li fa fa-user"></i>{this.props.recipient.firstName} {this.props.recipient.lastName}</li>
                              <li><i className="fa-li fa fa-envelope-o"></i>{this.props.recipient.email}</li>
                              <li><i className="fa-li fa fa-phone"></i>{this.props.recipient.phone}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="medium-3 end columns">
                        <div className="recipient-confirm">
                            <a className="confirm-button" onClick={this.handleSubmit}>Match</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    renderClosed: function() {
        return (
            <div key={_.join("-", this.props.recipient.id, "closed")} className="recipient-closed">
            </div>
        );
    }
});

React.renderComponent(
    <Dashboard />,
    document.getElementById('dashboard-content')
);
