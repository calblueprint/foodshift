/** @jsx React.DOM */

// TODO: Fix the "included the Google Maps API multiple times on this page" error on console (seems harmless at this point)

var scriptURL = 'https://maps.googleapis.com/maps/api/js?key=' + "AIzaSyCmcTV-yBS4SnL3AqBlSXcYv5j-WaGdenA" + '&sensor=false&callback=initializeMaps';

window.initializeMaps = function() {
    // This triggers the onScriptLoaded method call on all mounted Map components.
    ReactScriptLoader.triggerOnScriptLoaded(scriptURL);
}

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
        this.setState({map: this.drawMap()});
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
    componentDidMount: function() {
        this.setState({map: this.drawMap()});
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
    }
});

