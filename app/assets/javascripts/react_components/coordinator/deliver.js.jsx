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
        return gon.deliveries
    },
    getDirectionsDisplay: function(donation, recipient) {
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var request = {
            origin: new google.maps.LatLng(Number(donation.latitude), Number(donation.longitude)),
            destination: new google.maps.LatLng(Number(recipient.recipient_profile.latitude), Number(recipient.recipient_profile.longitude)),
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(result, status){
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
            } else {
                console.log(result);
            }
        });
        return directionsDisplay;
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
                <GoogleMap
                    directionsDisplay={this.getDirectionsDisplay(currentDelivery.donation, currentDelivery.recipient)}
                    latitude={Number(currentDelivery.donation.latitude)}
                    longitude={Number(currentDelivery.donation.longitude)}
                />
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
    },
    submitConfirmation: function(data){
        $.ajax({
            url: window.location.href,
            dataType: 'json',
            type: 'POST',
            data: data,
            success: function(data) {
                console.log("Submission success!");
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(window.location.href, status, err.toString());
            }.bind(this)
        });
    },
    handlePickupSubmit: function(event){
        var deliveryId = event.deliveryId;
        var currentDeliveries = this.state.deliveries;
        var currentDelivery = _.findWhere(currentDeliveries, {id: deliveryId});
        var index = _.indexOf(currentDeliveries, currentDelivery);
        currentDelivery.picked_up_at = _.now();
        currentDeliveries[index] = currentDelivery;

        var data = {transaction_id: deliveryId, picked_up_at: currentDelivery.picked_up_at}
        this.submitConfirmation(data);
        this.setState({deliveries: currentDeliveries});
    },
    handleDeliverySubmit: function(event){
        var deliveryId = event.deliveryId;
        var currentDeliveries = this.state.deliveries;
        var currentDelivery = _.findWhere(currentDeliveries, {id: deliveryId});
        var index = _.indexOf(currentDeliveries, currentDelivery);
        currentDelivery.delivered_at = _.now();
        currentDeliveries[index] = currentDelivery;

        var data = {transaction_id: deliveryId, delivered_at: currentDelivery.delivered_at}
        this.submitConfirmation(data);
        this.setState({deliveries: currentDeliveries});
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
        var isPickedUp = !(_.isBlank(this.props.delivery.picked_up_at));
        var isDelivered = !(_.isBlank(this.props.delivery.delivered_at));
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
                                <span className="address-prefix">From</span>{this.props.delivery.donation.address}
                            </div>
                            <div className="recipient-address">
                                <span className="address-prefix">To</span>{this.props.delivery.recipient.recipient_profile.address}
                            </div>
                            <div className="delivery-info">
                                <p className="delivery-time">
                                    <i className="fa fa-clock-o fa-fw"></i>
                                    {this.props.delivery.donation.date} {this.props.delivery.donation.window_start} - {this.props.delivery.donation.window_end}
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
        var destAddr = this.props.delivery.recipient.recipient_profile.address
        return  _.sprintf("https://maps.google.com/maps?saddr=%s&daddr=%s", srcAddr, destAddr)
    }
});

React.render(
    <DeliverDashboard />,
    document.getElementById('deliver-content')
);
