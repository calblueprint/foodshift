// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// var s = document.createElement('script');
// s.src = 'https://maps.googleapis.com/maps/api/js?key=' + "AIzaSyBRB0dyvlNWDLNLyrn4waQRI2aAgpkfeWE";
// document.head.appendChild(s);

$(document).ready(function() {

    var map;
    var markers = [];
    var infoBox = new google.maps.InfoWindow();


    function initialize() {
        var mapOptions = {
            center: {
                lat: 37.8044,
                lng: -122.2708
            },
            zoom: 11
        };
        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        var donor1 = {
            title: 'Food Shift',
            lat: 37.798866,
            lng: -122.280327,
            type: 'http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-55bd5c/shapecolor-color/shadow-1/border-dark/symbolstyle-white/symbolshadowstyle-dark/gradient-no/grocery.png'
        };
        var recip1 = {
            title: 'United States Postal Service',
            lat: 37.806677,
            lng: -122.300380,
            type: 'http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-f34648/shapecolor-color/shadow-1/border-dark/symbolstyle-white/symbolshadowstyle-dark/gradient-no/daycare.png'
        };
        var recip2 = {
            title: 'Catholic Youth Organization',
            lat: 37.808970,
            lng: -122.249409,
            type: 'http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-f34648/shapecolor-color/shadow-1/border-dark/symbolstyle-white/symbolshadowstyle-dark/gradient-no/daycare.png'
        };


        markers.push(createMarker({
            lat: donor1.lat,
            lng: donor1.lng
        }, null, donor1.title, donor1.type));
        markers.push(createMarker({
            lat: recip1.lat,
            lng: recip1.lng
        }, null, recip1.title, recip1.type));
        markers.push(createMarker({
            lat: recip2.lat,
            lng: recip2.lng
        }, null, recip2.title, recip2.type));
    }
    google.maps.event.addDomListener(window, 'load', initialize);

    $('#event-a-head').click(function() {
        toggleEvent("event-a");
        for (i = 0; i < markers.length; i++) {
            // markers[i].setAnimation(null);
            toggleMarker(markers[i])
            bindInfoWindow(markers[i], map, infoBox, markers[i].title)
        }
    });

    function createMarker(coords, map, title, iconType) {
        var marker = new google.maps.Marker({
            position: coords,
            map: map,
            title: title,
            // icon: createImage("/assets/images/" + iconType + '.png')
            icon: createImage(iconType),
            animation: google.maps.Animation.DROP
        });
        return marker;
    }

    function toggleMarker(marker) {
        if (marker.map) {
            marker.setMap(null);
        } else {
            marker.setMap(map);
        }
    }

    function createImage(url) {
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

    function bindInfoWindow(marker, map, infoWindow, html) {
        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent(html);
            infoWindow.open(map, marker);
            console.log(infoWindow);
        });
    }

    function toggleEvent(element) {
        e = document.getElementById(element);
        e.classList.toggle('event-list-open');
    }

});
