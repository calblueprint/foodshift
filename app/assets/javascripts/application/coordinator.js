// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


// TODO: Move this into React
var map;
function initialize() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(37.8747924, -122.2583104)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);
