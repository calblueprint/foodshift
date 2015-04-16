$(function() {
  $(".profile-img-uploader").change(function() {
    $("#profile-img-submit").submit();
  });

  $(".profile-img-trigger").on("click hover", function() {
    $(".profile-img-uploader").trigger("click");
  });
});
