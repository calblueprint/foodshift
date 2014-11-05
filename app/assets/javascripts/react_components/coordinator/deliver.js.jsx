/** @jsx React.DOM */

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

Number.prototype.mod = function(n) { return ((this % n) + n) % n; }

var DeliverDashboard = React.createClass({
    getInitialState: function() {
        var deliveries = this.getCurrentDeliveries();
        return {
            openDeliveryId: null,
            deliveries: deliveries,
        };
    },
    getCurrentDeliveries: function() {
        //TODO: Write one that actually fetches real data
        return [
            {
                id: 0,
                donation: {
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
                },
                recipient: {
                    id: 1,
                    donationId: 999,
                    firstName: '1Jun',
                    lastName: 'the Receiver',
                    email: '1jun@receiver.com',
                    phone: '555-555-1111',
                    organization: 'Blackprint',
                    address: '1015 Folsom Street, San Francisco, CA, United States',
                    latitude: 37.7781009,
                    longitude: -122.4057628,
                    orgNumber: '9000',
                },
                pickupTimestamp: null,
                deliveryTimestamp: null,
            },
            {
                id: 1,
                donation: {
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
                recipient: {
                    id: 2,
                    donationId: 555,
                    firstName: 'Food',
                    lastName: ' Recipient',
                    email: 'food@recipient.com',
                    phone: '999-999-9999',
                    organization: 'Adult Food Finder',
                    address: 'People\'s Park 2556 Haste St Berkeley, CA 94704',
                    latitude: 37.865813,
                    longitude: -122.257058,
                    orgNumber: '6000',
                },
                pickupTimestamp: null,
                deliveryTimestamp: null,
            },
            {
                id: 2,
                donation: {
                    id: 111,
                    address: 'Berkeley Bowl, 2020 Oregon St, Berkeley, CA 94703',
                    latitude: 37.857843,
                    longitude: -122.2613269,
                    foodTypes: ['Bread'],
                    quantity: '3 boxes',
                    date: '1/1/2014',
                    startTime: '4:00PM',
                    endTime: '8:00PM',
                    name: 'Mr. Bowl',
                    organization: 'Berkeley Bowl',
                    email: 'mrbowl@berkeleybowl.com',
                    phone: '122-333-4444',
                    additionalInfo: ''
                },
                recipient: {
                    id: 2,
                    donationId: 111,
                    firstName: 'Food',
                    lastName: ' Recipient',
                    email: 'food@recipient.com',
                    phone: '999-999-9999',
                    organization: 'Adult Food Finder',
                    address: 'People\'s Park 2556 Haste St Berkeley, CA 94704',
                    latitude: 37.865813,
                    longitude: -122.257058,
                    orgNumber: '6000',
                },
                pickupTimestamp: null,
                deliveryTimestamp: null,
            },
        ]
    },
    render: function() {
        var numDeliveries = _.size(this.state.deliveries);
        var currentDelivery = _.findWhere(this.state.deliveries, {id: this.state.openDeliveryId});
        var googleMapContent;
        if (_.isUndefined(currentDelivery)) {
            googleMapContent = (
                <GoogleMap />
            );
        } else {
            googleMapContent = (
                <GoogleMap latitude={currentDelivery.donation.latitude} longitude={currentDelivery.donation.longitude} />
            );
        }
        return (
            <div className="row">
                <div className="small-12 columns">
                    <div className="dashboard-wrap">
                        <div className="delivery-header">
                            {numDeliveries} Deliveries Scheduled
                        </div>
                        <div className="delivery-map">
                            {googleMapContent}
                        </div>
                        <DeliveryList
                            openDeliveryId={this.state.openDeliveryId}
                            deliveries={this.state.deliveries}
                            handleSelectDelivery={this.handleSelectDelivery}
                            handlePickupSubmit={this.handlePickupSubmit}
                            handleDeliverySubmit={this.handleDeliverySubmit}
                        />
                    </div>
                </div>
            </div>
        );
    },
    handleSelectDelivery: function(event) {
        var deliveryId = event.deliveryId;
        if (this.state.openDeliveryId === deliveryId) {
            // If we click on an open recipient, we want to close it
            deliveryId = null;
        }
        this.setState({openDeliveryId: deliveryId});
        console.log("Open deliveryId: " + deliveryId);
    },
    handlePickupSubmit: function(event){
        // TODO: Submit pickups to backend
        var deliveryId = event.deliveryId;
        var currentDeliveries = this.state.deliveries;
        var currentDelivery = _.findWhere(currentDeliveries, {id: deliveryId});
        var index = _.indexOf(currentDeliveries, currentDelivery);

        currentDelivery.pickupTimestamp = _.now();
        currentDeliveries[index] = currentDelivery;
        this.setState({deliveries: currentDeliveries});

        console.log("Transaction " + deliveryId + " successfully picked up");
    },
    handleDeliverySubmit: function(event){
        // TODO: Submit deliveries to backend
        var deliveryId = event.deliveryId;
        var currentDeliveries = this.state.deliveries;
        var currentDelivery = _.findWhere(currentDeliveries, {id: deliveryId});
        var index = _.indexOf(currentDeliveries, currentDelivery);

        currentDelivery.deliveryTimestamp = _.now();
        currentDeliveries[index] = currentDelivery;
        this.setState({deliveries: currentDeliveries});

        console.log("Transaction " + deliveryId + " successfully delivered");
    },
});

var DeliveryList = React.createClass({
    getDefaultProps: function() {
        return {
            deliveries: [],
            openDeliveryId: null
        }
    },
    render: function() {
        var deliveries =  _.map(this.props.deliveries, function(delivery) {
            var isOpen = (delivery.id === this.props.openDeliveryId);
            return (
                <Delivery
                    key={delivery.id}
                    delivery={delivery}
                    isOpen={isOpen}
                    handlePickupSubmit={this.props.handlePickupSubmit}
                    handleDeliverySubmit={this.props.handleDeliverySubmit}
                    handleSelectDelivery={this.props.handleSelectDelivery}
                />
            );
        }.bind(this));
        return (
            <div className="delivery-list">
                {deliveries}
            </div>
        );
    },
});

var Delivery = React.createClass({
    getDefaultProps: function() {
        return {
            delivery: null,
            isOpen: false,
            handleClick: undefined
        }
    },
    render: function() {
        var isPickedUp = !(_.isNull(this.props.delivery.pickupTimestamp));
        var isDelivered = !(_.isNull(this.props.delivery.deliveryTimestamp));
        var actionButtons = this.renderActionButtons(isPickedUp, isDelivered);

        var entryClasses = React.addons.classSet({
           'delivery-entry': true,
           'active': this.props.isOpen
        });
        var iconClasses = React.addons.classSet({
            'fa': true,
            'fa-chevron-down': true,
            'active': this.props.isOpen,
        });
        return (
            <div className={entryClasses} onClick={this.handleSelectDelivery}>
                <div className="row">
                    <div className="medium-7 columns">
                        <div className="delivery-addresses">
                            <div className="donation-address">
                                {this.props.delivery.donation.address}
                            </div>
                            <div className="delivery-arrow">
                                <i className="fa fa-long-arrow-down fa-2x"></i>
                            </div>
                            <div className="recipient-address">
                                {this.props.delivery.recipient.address}
                            </div>
                            <div className="delivery-info">
                                <p className="delivery-time">
                                  <i className="fa fa-clock-o fa-fw"></i>
                                  {this.props.delivery.donation.date} {this.props.delivery.donation.startTime} - {this.props.delivery.donation.endTime}
                                </p>
                                <a className="delivery-link" onClick={this.handleGetDirections} href={this.getDirectionsLink()} target="_blank">
                                    <i className="fa fa-map-marker fa-fw"></i> Get directions
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="medium-5 columns">
                        {actionButtons}
                    </div>
                </div>
            </div>
        );
    },
    renderActionButtons: function(isPickedUp, isDelivered) {
        var content;
        if (!isPickedUp) {
            return (
                <div className="action-button-list">
                    <span className="action-container">
                        <a className="action-button" onClick={this.handlePickupSubmit}>Pick up</a>
                    </span>
                    <span className="action-container">
                        <span className="disabled-button">Deliver</span>
                    </span>
                </div>
            );
        } else if (isPickedUp && !isDelivered) {
            return (
                <div className="action-button-list">
                    <span className="action-container">
                        <span className="success-item">
                            Picked up <i className="fa fa-check-circle-o fa-lg"></i>
                        </span>
                    </span>
                    <span className="action-container">
                        <a className="action-button" onClick={this.handleDeliverySubmit}>Deliver</a>
                    </span>
                </div>
            );
        } else if (isPickedUp && isDelivered) {
            return (
                <div className="action-button-list">
                    <span className="action-container">
                        <span className="success-item">
                            Picked up <i className="fa fa-check-circle-o fa-lg"></i>
                        </span>
                    </span>
                    <span className="action-container">
                        <span className="success-item">
                            Delivered <i className="fa fa-check-circle-o fa-lg"></i>
                        </span>
                    </span>
                </div>
            );
        }
    },
    handleSelectDelivery: function(e) {
        this.props.handleSelectDelivery({deliveryId: this.props.delivery.id});
    },
    handlePickupSubmit: function(e) {
        e.stopPropagation();
        this.props.handlePickupSubmit({deliveryId: this.props.delivery.id});
    },
    handleDeliverySubmit: function(e) {
        e.stopPropagation();
        this.props.handleDeliverySubmit({deliveryId: this.props.delivery.id});
    },
    handleGetDirections: function(e) {
        e.stopPropagation();
    },
    getDirectionsLink: function() {
        var srcAddr = this.props.delivery.donation.address
        var destAddr = this.props.delivery.recipient.address
        return  _.sprintf("https://maps.google.com/maps?saddr=%s&daddr=%s", srcAddr, destAddr)
    }
});

React.renderComponent(
    <DeliverDashboard />,
    document.getElementById('deliver-content')
);
