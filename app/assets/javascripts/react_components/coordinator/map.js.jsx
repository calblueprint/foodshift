/** @jsx React.DOM */

// TODO: Fix the "included the Google Maps API multiple times on this page" error on console (seems harmless at this point)

var scriptURL = 'https://maps.googleapis.com/maps/api/js?key=' + "AIzaSyCmcTV-yBS4SnL3AqBlSXcYv5j-WaGdenA" + '&sensor=false&callback=initializeMaps';

window.initializeMaps = function() {
    // This triggers the onScriptLoaded method call on all mounted Map components.
    ReactScriptLoader.triggerOnScriptLoaded(scriptURL);
}

var TYPE_DONATION = "donor";
var TYPE_RECIPIENT = "recipient";

var GoogleMap = React.createClass({
    mixins: [ReactScriptLoaderMixin],
    getScriptURL: function() {
        return scriptURL;
    },
    // Ensure that onScriptLoaded is deferred until the ReactScriptLoader.triggerOnScriptLoaded() call above is made in
    // initializeMaps().
    deferOnScriptLoaded: function() {
        return true;
    },
    onScriptLoaded: function() {
        var map = this.drawMap();
        this.setState({map: map});
        this.placeMarkers(this.props.donation, this.props.recipients, map);
        console.log("Script Loaded");
    },
    onScriptError: function() {
        console.log("Error loading Google Maps script");
    },
    getInitialState: function() {
        return {
            map : null,
            markers : [],
        }
    },
    getDefaultProps: function() {
        return {
            zoom: 12,
            latitude: 37.8747924,
            longitude: -122.2583104,
            address: "",
            width: 500,
            height: 500,
            points: [],
            gmapsApiKey: "AIzaSyCmcTV-yBS4SnL3AqBlSXcYv5j-WaGdenA",
            gmapsSensor: false,
            donation: null,
            recipients: [],
            directionsDisplay: null
        }
    },
    componentWillMount: function() {
        console.log("Component Will Mount");
    },
    componentWillReceiveProps: function(nextProps) {
        this.placeMarkers(nextProps.donation, nextProps.recipients, this.state.map);
        if (!(_.isNull(this.props.directionsDisplay))) {
            this.props.directionsDisplay.setMap(null);
        }
        if (!(_.isNull(nextProps.directionsDisplay))) {
            nextProps.directionsDisplay.setMap(this.state.map);
        }
        console.log("Component Will Rcv Props");
    },
    placeMarkers: function(donation, recipients, map) {
        _.map(this.state.markers, function(marker) {
            marker.setMap(null);
        });
        markers = []
        if (!(_.isNull(donation))) {
            var donationMarker =  this.toMarker(donation.organization, donation.latitude, donation.longitude, donation.address, TYPE_DONATION)
            donationMarker.setMap(map);
            markers.push(donationMarker);
        }

        if (!(_.isEmpty(recipients))) {
            _.map(recipients, function(recipient) {
                var recipientMarker = this.toMarker(recipient.organization, recipient.latitude, recipient.longitude, recipient.address, TYPE_RECIPIENT);
                recipientMarker.setMap(map);
                markers.push(recipientMarker);
            }.bind(this));
        }

        if (!(_.isEmpty(markers))) {
            var bounds = new google.maps.LatLngBounds();
            _.map(markers, function(marker) {
                bounds.extend(new google.maps.LatLng(marker.latitude, marker.longitude));
            });
            google.maps.event.addListenerOnce(map, 'idle', function() {
                map.fitBounds(bounds);
            });
        }

        this.setState({markers: markers});
        console.log("Map markers redrawn");
    },
    render: function() {
        return (
            <div id="map-canvas"></div>
        );
    },
    componentDidMount: function() {
        var map = this.drawMap();
        this.setState({map: map});
        this.placeMarkers(this.props.donation, this.props.recipients, map);
        // this.props.directionsDisplay.setMap(this.state.map);
        // This line of code causes a bug with the schedule page's transitions between donations, so it is commented out.
        console.log("Component Did Mount");
    },
    componentDidUpdate: function(prevProps, prevState) {
        this.state.map.panTo(new google.maps.LatLng(this.props.latitude, this.props.longitude));
    },
    componentWillUnmount : function() {
        $(this.getDOMNode()).remove();
    },
    drawMap: function() {
        // Render a map with the center point given by the component's lat and lng
        // properties.
        var mapOptions = {
            zoom: this.props.zoom,
            center: new google.maps.LatLng(this.props.latitude, this.props.longitude),
        };
        return new google.maps.Map(this.getDOMNode(), mapOptions);
    },
    toMarker: function(title, lat, lng, address, type) {
        var marker = new google.maps.Marker({
            title: title,
            position: {
                lat: lat,
                lng: lng
            },
            latitude: lat,
            longitude: lng,
            address: address,
            type: type,
            //icon: this.typeImage(type),
            //animation: google.maps.Animation.DROP,
            map: null,
        });
        return marker;
    },
    typeImage: function(type) {
        var url;
        if (type === TYPE_DONATION) {
            url = "http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-9d7050/shapecolor-color/shadow-1/border-dark/symbolstyle-white/symbolshadowstyle-dark/gradient-no/begrenzungspfahl_poller.png";
        } else if (type === TYPE_RECIPIENT) {
            url = "http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-128e4d/shapecolor-color/shadow-1/border-dark/symbolstyle-white/symbolshadowstyle-dark/gradient-no/hill.png";
        }
        var image = {
            url: url,
            // This marker is 32 pixels wide by 37 pixels tall.
            size: new google.maps.Size(32, 37),
            // The origin for this image is 0,0.
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the icon at 0, 16.
            anchor: new google.maps.Point(0, 16)
        };
        return image;
    }
});

