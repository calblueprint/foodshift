$(function() {
    var autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('donation_address')), {
            types: ['geocode']
    });
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        getAddressCoordinates();
    });

    function getAddressCoordinates() {
        var place = autocomplete.getPlace();
        $('#donor-address-lat').val(place.geometry.location.lat());
        $('#donor-address-lng').val(place.geometry.location.lng());
    }

    $("#scroll-arrow").click(function() {
        $('html, body').animate({
            scrollTop: $("#donor-form-food-block").offset().top
        }, 300);
    });

    $(document).foundation({
        abide : {
            patterns: {
                    phone: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                    time: /^([1-9]|1[0-2]):([0-5]\d)\s?(AM|PM)$/i,
                    email : /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                }
            }
      });

    $('#donor-form-fields').on('invalid.fndtn.abide', function () {
        toastr.error('There was an error with your submission');
    });
});
