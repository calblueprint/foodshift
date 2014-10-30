// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// var s = document.createElement('script');
// s.src = 'https://maps.googleapis.com/maps/api/js?key=' + "AIzaSyBRB0dyvlNWDLNLyrn4waQRI2aAgpkfeWE";
// document.head.appendChild(s);

$(document).ready(function() {

    var map;
    var markersA = [];
    var markersB = [];
    var infoBox = new google.maps.InfoWindow();


    function initialize() {
        var mapOptions = {
            center: {
                lat: 37.8544,
                lng: -122.2708
            },
            zoom: 12
        };
        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        var donorA1 = {
            title: 'Food Shift',
            lat: 37.798866,
            lng: -122.280327,
            address: "620 3rd St.<br> Oakland, CA 94607",
            type: 'donor'
        };
        var recipA1 = {
            title: 'United States Postal Service',
            lat: 37.806677,
            lng: -122.300380,
            address: "1675 7th St <br> Oakland, CA 94615",
            type: 'recipient'
        };
        var recipA2 = {
            title: 'Catholic Youth Organization',
            lat: 37.808970,
            lng: -122.249409,
            address: "3014 Lakeshore Ave <br> Oakland, CA 94610",
            type: 'recipient'
        };

        var donorB1 = {
            title: '<div style="font-size: 20px">Alli is the BEST PL </div>',
            lat: 37.7149346,
            lng: -122.1584304,
            address: "620 3rd St.<br> Oakland, CA 94607",
            type: 'donor'
        };
        var recipB1 = {
            title: 'A cool place',
            lat: 37.6872782,
            lng: -122.1670778,
            address: "1675 7th St <br> Oakland, CA 94615",
            type: 'recipient'
        };
        var recipB2 = {
            title: 'foodshift++ everyone',
            lat: 37.7308411,
            lng: -122.1302114,
            address: "3014 Lakeshore Ave <br> Oakland, CA 94610",
            type: 'recipient'
        };


        markersA.push(createMarker({
            lat: donorA1.lat,
            lng: donorA1.lng
        }, null, donorA1.title, donorA1.type, donorA1.address));
        markersA.push(createMarker({
            lat: recipA1.lat,
            lng: recipA1.lng
        }, null, recipA1.title, recipA1.type, recipA1.address));
        markersA.push(createMarker({
            lat: recipA2.lat,
            lng: recipA2.lng
        }, null, recipA2.title, recipA2.type, recipA2.address));


        markersB.push(createMarker({
            lat: donorB1.lat,
            lng: donorB1.lng
        }, null, donorB1.title, donorB1.type, donorB1.address));
        markersB.push(createMarker({
            lat: recipB1.lat,
            lng: recipB1.lng
        }, null, recipB1.title, recipB1.type, recipB1.address));
        markersB.push(createMarker({
            lat: recipB2.lat,
            lng: recipB2.lng
        }, null, recipB2.title, recipB2.type, recipB2.address));

    }
    google.maps.event.addDomListener(window, 'load', initialize);

    $('#event-a-head').click(function() {
        toggleEvent("event-a");
        for (i = 0; i < markersA.length; i++) {
            // markers[i].setAnimation(null);
            toggleMarker(markersA[i])
            bindInfoWindow(markersA[i], map, infoBox)
        }
    });

    $('#event-b-head').click(function() {
        toggleEvent("event-b");
        console.log(markersB.length)
        for (i = 0; i < markersB.length; i++) {
            // markers[i].setAnimation(null);
            toggleMarker(markersB[i])
            bindInfoWindow(markersB[i], map, infoBox)
        }
    });

    function createMarker(coords, map, title, iconType, address) {
        icon = null;
        if (iconType === "donor"){
            icon = 'http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-55bd5c/shapecolor-color/shadow-1/border-dark/symbolstyle-white/symbolshadowstyle-dark/gradient-no/grocery.png';
        } else {
            icon = 'http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-f34648/shapecolor-color/shadow-1/border-dark/symbolstyle-white/symbolshadowstyle-dark/gradient-no/daycare.png';
        }
        var marker = new google.maps.Marker({
            position: coords,
            lat: coords.lat,
            lng: coords.lng,
            address: address,
            map: map,
            title: title,
            type: iconType,
            icon: createImage(icon),
            animation: google.maps.Animation.DROP
        });
        return marker;
    }

    function toggleMarker(marker) {
        if (marker.map) {
            marker.setMap(null);
        } else {
            marker.setMap(map);
            if (marker.type === "donor"){
                map.panTo({lat:marker.lat,lng:marker.lng});
            }
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

    function bindInfoWindow(marker, map, infoWindow) {
        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent("<u>" + marker.title + "</u><br>" + marker.address);
            infoWindow.open(map, marker);
            // console.log(infoWindow);
        });
    }

    function toggleEvent(element) {
        e = document.getElementById(element);
        e.classList.toggle('event-list-open');
    }

});
