/** @jsx React.DOM */

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

Number.prototype.mod = function(n) { return ((this % n) + n) % n; }

/*
TODO: Having this global variable is really gross... but we don't want to re-render the map each time we change donations...
Need to figure out a clean way to do callbacks on this map variable that should (probably) be held as a state object
in the Dashboard component
*/
var s = document.createElement('script');
s.src = 'https://maps.googleapis.com/maps/api/js?key=' + "AIzaSyCmcTV-yBS4SnL3AqBlSXcYv5j-WaGdenA" + '&sensor=false&callback=mapLoaded';
document.head.appendChild(s);

var map;

var Dashboard = React.createClass({
    getInitialState: function() {
        var donations = this.getDonationsList()
        return {
            donations: donations,
            recipients: this.getRecipientsList(donations[0].id),
            currDonationIndex: 0,
            transitionClass: "slide-right",
        };
    },
    getDonationsList: function() {
        // TODO: Write an AJAX version for this
        return [
            {
                id: 555,
                address: 'Sutardja Dai Hall, University of California, Berkeley, Berkeley, CA, United States',
                latitude: 37.8747924,
                longitude: -122.2583104,
                foodTypes: ['Bread', 'Dairy', 'Meat', 'Produce', 'Mixed'],
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
                address: 'West Oakland BART Station 1451 7th St Oakland, CA 94607',
                latitude: 37.804872,
                longitude: -122.295139,
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
                organization: 'Adult Food Finder',
                address: '100 AFF Street, Berkeley, CA, United States',
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
            transitionClass: "slide-left"
        })
    },
    getPrevDonation: function() {
        var index = (this.state.currDonationIndex - 1).mod(_.size(this.state.donations))
        var recipients = this.getRecipientsList(this.state.donations[index].id);
        this.setState({
            currDonationIndex: index,
            recipients: recipients,
            transitionClass: "slide-right"
        })
    },
    handleSubmit: function(event) {
        var submittedDonationId = event.donationId;
        var donations = _.reject(this.state.donations, function(donation) {
            return donation.id === submittedDonationId;
        });
        var index = 0;
        var recipients = []
        if (!(_.isEmpty(donations))) {
            recipients = this.getRecipientsList(donations[index].id);
        }
        this.setState({
            donations: donations,
            currDonationIndex: index,
            recipients: recipients,
            transitionClass: "slide-right",
        })
    },
    getDefaultProps: function() {
        return {};
    },
    render: function() {
        var content = _.isEmpty(this.state.donations) ? this.renderEmpty() : this.renderHasDonations();
        return (
            <div className="row">
                <div className="small-12 columns">
                    <div className="dashboard-wrap">
                        <ReactCSSTransitionGroup transitionName={this.state.transitionClass}>
                            {content}
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
            </div>
        );
    },
    renderHasDonations: function() {
        var currDonation = this.state.donations[this.state.currDonationIndex];
        return (
            <div key={currDonation.id} className="dashboard">
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
                            <DonationInfo donation={currDonation} />
                        </div>
                    </div>
                </div>
                <div className="donation-recipients">
                    <div className="row">
                        <div className="medium-6 columns no-right-pad">
                            <DonationRecipients recipients={this.state.recipients} donation={currDonation} handleSubmit={this.handleSubmit} />
                        </div>
                        <div className="medium-6 columns no-left-pad">
                            <RequestMap donation={currDonation} longitude={currDonation.longitude} latitude={currDonation.latitude} />
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    renderEmpty: function() {
        return (
            <div className="dashboard-empty">
                <div className="fa-stack fa-3x">
                    <i className="fa fa-spin fa-sun-o fa-stack-1x fa-thin"></i>
                    <i className="fa fa-spin fa-smile-o fa-stack-1x fa-thin"></i>
                </div>
                <p>No pending donations! Please enjoy your day.</p>
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
            recipients: [],
            donation: null,
            handleSubmit: undefined
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
                <Recipient
                    key={recipient.id}
                    donation={this.props.donation}
                    recipient={recipient}
                    isOpen={isOpen}
                    handleClick={this.handleRecipientOpen}
                    handleSubmit={this.props.handleSubmit}
                />
            );
        }.bind(this));
        return (
            <div>
                <div className="recipients-list-title">
                    Recipient Requests
                </div>
                <div className="recipients-list">
                    {recipients}
                </div>
            </div>
        );
    }
});

var RequestMap = React.createClass({
    getInitialState: function() {
        return {
            map : null,
            markers : [],
        };
    },
    getDefaultProps: function() {
        return {
            zoom: 13,
            latitude: 37.8747924,
            longitude: -122.2583104,
            address: "",
            width: 500,
            height: 500,
            points: [],
            gmapsApiKey: "AIzaSyCmcTV-yBS4SnL3AqBlSXcYv5j-WaGdenA",
            gmapsSensor: false
        }
    },
    render: function() {
        return (
            <div id="map-canvas"></div>
        );
    },
    componentDidMount : function() {
        window.mapLoaded = (function() {
            var mapOptions = {
                zoom: this.props.zoom,
                center: new google.maps.LatLng(this.props.latitude, this.props.longitude),
            };
            map = new google.maps.Map(this.getDOMNode(), mapOptions);
        }).bind(this);
        window.mapLoaded();
    },
    componentDidUpdate: function(prevProps, prevState) {
        map.panTo(new google.maps.LatLng(this.props.latitude, this.props.longitude));
    },
    componentWillUnmount : function() {
        $(this.getDOMNode()).remove();
    },
    getApiUrl: function() {
        //return 'https://maps.googleapis.com/maps/api/js?key=' + this.props.gmapsApiKey + '&sensor=' + this.props.gmapsSensor + '&callback=mapLoaded';
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
            handleSubmit: undefined,
            donation: null
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
        var iconClasses = React.addons.classSet({
            'fa': true,
            'fa-chevron-down': true,
            'active': this.props.isOpen,
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
                        <div className="small-1 medium-1 end columns">
                            <a className="expand-icon" ><i className={iconClasses}></i></a>
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
                    <div className="medium-4 end columns">
                        <div className="recipient-confirm">
                            <a className="match-button" data-reveal-id="myModal" onClick={this.handleShowModal}>Match</a>
                        </div>
                    </div>
                </div>

                <Modal ref="modal"  show={false} header="Confirm Match">
                    <div className="confirm-modal">
                        <div className="donation-row">
                            <div className="medium-5 columns">
                                <ul className="fa-ul">
                                  <li><i className="fa-li fa fa-users"></i>{this.props.donation.organization}</li>
                                  <li><i className="fa-li fa fa-user"></i>{this.props.donation.name}</li>
                                </ul>
                            </div>
                            <div className="medium-7 columns">
                                <ul className="fa-ul">
                                  <li><i className="fa-li fa fa-map-marker"></i>{this.props.donation.address}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="delivery-row">
                            <div className="small-2 medium-1 columns">
                                <i className="fa fa-long-arrow-down fa-5x delivery-arrow"></i>
                            </div>
                            <div className="small-10 medium-4 columns">
                                <ul className="fa-ul">
                                  <li><i className="fa-li fa fa-clock-o"></i>{this.props.donation.date}</li>
                                  <li><i className="fa-li fa "></i>{this.props.donation.startTime} - {this.props.donation.endTime}</li>
                                </ul>
                            </div>
                            <div className="small-10 small-offset-2 medium-7 medium-offset-0 columns">
                                <ul className="fa-ul">
                                    <li>
                                        <i className="fa-li fa fa-cutlery"></i>
                                        {this.props.donation.quantity} of:
                                        {this.renderFoodTypes()}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="recipient-row">
                            <div className="medium-5 columns">
                                <ul className="fa-ul">
                                  <li><i className="fa-li fa fa-users"></i>{this.props.recipient.organization}</li>
                                  <li><i className="fa-li fa fa-user"></i>{this.props.recipient.firstName} {this.props.recipient.lastName}</li>
                                </ul>
                            </div>
                            <div className="medium-7 columns">
                                <ul className="fa-ul">
                                  <li><i className="fa-li fa fa-map-marker"></i>{this.props.recipient.address}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="button-row">
                            <div className="small-12 columns">
                                <a className="confirm-button" onClick={this.handleSubmit}>Confirm</a>
                            </div>
                        </div>
                    </div>
                </Modal>

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
            <ul className="inline-list">
                {foodListItems}
            </ul>
        );
    },
    renderClosed: function() {
        return (
            <div key={_.join("-", this.props.recipient.id, "closed")} className="recipient-closed">
            </div>
        );
    },
    handleShowModal: function() {
        this.refs.modal.show()
    },
    handleExternalHide: function() {
        this.refs.modal.hide()
    },
    handleSubmit: function() {
        // TODO: Implement logic to post to backend
        console.log("Match submitted");
        this.props.handleSubmit({donationId: this.props.donation.id});
        this.refs.modal.hide()
    },
});

React.renderComponent(
    <Dashboard />,
    document.getElementById('dashboard-content')
);
