$(function() {
    new google.maps.places.Autocomplete(
        (document.getElementById('donor-address')), {
            types: ['geocode']
        });

    $("#scroll-arrow").click(function() {
        $('html, body').animate({
            scrollTop: $("#donor-form-food-block").offset().top
        }, 300);
    });

    $(document).foundation({
        abide : {
            patterns: {
                phone: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                time: /^([1-9]|1[0-2]):([0-5]\d)\s?(AM|PM)?$/i,
                }
            }
      });
});
