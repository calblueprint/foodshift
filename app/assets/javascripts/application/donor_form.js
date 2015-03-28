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

    $('#donation_date').datetimepicker({
        timepicker: false,
        format:'m/d/Y',
        scrollMonth: false
    });
    $('#donation_start_time').datetimepicker({
        datepicker: false,
        step: 15,
        format:'H:i',
    });
    $('#donation_end_time').datetimepicker({
        datepicker: false,
        step: 15,
        format:'H:i'
    });

    function checkEmailExists(email) {
        return $.ajax({
            url: '/users/exists',
            dataType: 'json',
            type: 'GET',
            data: {email: email},
            success: function(data) {
                console.log("Query success!");
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(window.location.href, status, err.toString());
            }.bind(this)
        });
    }


    $('#donor-form-fields')
        .on('invalid.fndtn.abide', function () {
            toastr.error('There was an error with your submission');
        })
        .on('valid.fndtn.abide', function () {
            var dataArray = $("#donor-form-fields").serializeArray();
            var email = _.find(dataArray, function(field) {return field.name === "donation[email]"}).value;

            checkEmailExists(email)
            .done(function(result) {
                console.log(result);
                // If 'result' is null, no email was found so the user must register
                // If 'result' is not null, then 'result' is an object {email: <email>}
                if (donationModalInstance.isMounted()) {
                     _.isNull(result) ? donationModalInstance.setState({email: email, userExists: false}) : donationModalInstance.setState({email: result.email, userExists: true})
                }
            })
            .fail(function(result) {
                console.error(result);
            });

            donationModalInstance.handleShowModal();
        });
});
