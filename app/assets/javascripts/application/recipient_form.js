$(function() {
    var autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('recipient-address')), {
            types: ['geocode']
        });
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        getAddressCoordinates();
    });

    function getAddressCoordinates() {
        var place = autocomplete.getPlace();
        $('#recipient-address-lat').val(place.geometry.location.lat());
        $('#recipient-address-lng').val(place.geometry.location.lng());
    }

    $("#scroll-arrow").click(function() {
        $('html, body').animate({
            scrollTop: $("#recipient-form-info-block").offset().top
        }, 300);
    });

    $(document).foundation({
        abide : {
            patterns: {
                phone: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
                }
            }
      });

    $('#recipient-form-fields').on('invalid.fndtn.abide', function () {
        toastr.error('There was an error with your submission');
    });
});
