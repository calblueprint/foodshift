$(function() {
    new google.maps.places.Autocomplete(
        (document.getElementById('donor-address')), {
            types: ['geocode']
        });
});
