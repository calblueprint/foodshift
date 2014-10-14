$(function() {
    new google.maps.places.Autocomplete(
        (document.getElementById('recipient-address')), {
            types: ['geocode']
        });

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
});
