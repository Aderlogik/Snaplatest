$(document).ready(function() {  
	$('#map-info').modal('hide');
  $('.btn-send-note').click(function(){
    $('#subscriptions_modal').modal('show');
  })
  
var $map = $('.google-map');
var $toggleButton = $('.view-subscription');
$map.hide();
$toggleButton.click(function() {
    $map.slideToggle();
});
})