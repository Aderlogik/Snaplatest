// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery-min
//= require jquery_ujs
//= require turbolinks
//= require_tree .

function signup_validation(){
    var is_valid = true;
    
    //blank fields validation
    $("#new_user input[type='text'], #new_user input[type='password']").each(function( index ) {
       if($(this).val() === ""){
           $(this).css("border", "solid 1px red");
           is_valid = false;
       }
    });
    
    //password and confirm password validation
    var password = $("#user_password").val();
    var confirm_password = $("#user_confirm_password").val();
    if(password !== confirm_password){
        alert("Passwords do not match.");
        is_valid = false;
    }
    
    if(!is_valid){
        return false;
    }
}

function calculate_price(){
  var total_area = $("#subscription_location_attributes_area_in_acres").val();
  var selected_plan = $("#service_plan .tab.active").attr("data-plan-id");
  var selected_plan_name = $("#service_plan .tab.active").text();
  var total_services = $("input[data_for='plan-"+selected_plan+"']:checked").attr("data_committed_service");
  if(total_area !== "0" && total_services !== undefined && selected_plan !== undefined){
      var min_charges = 0;
      var floting_charges = 0;
      if(selected_plan_name === "Weekly"){
          min_charges = 50;
          floting_charges = 25;
      }else if(selected_plan === "Bi-Weekly"){
          min_charges = 55;
          floting_charges = 27.5;
      }
      total_area = parseFloat(total_area).toFixed(1);
      console.log("total_area - " + total_area);
      var mod_of_acre = Math.ceil(total_area/0.3);
      console.log("mod_of_acre - " + mod_of_acre);
      if(mod_of_acre === 0){
          mod_of_acre = 1;
      }
      var rate_of_service = min_charges + ((mod_of_acre - 1) * floting_charges);
      console.log("rate_of_service - " + rate_of_service + " total_services - " + total_services);
      var landscape_package_price = rate_of_service * parseInt(total_services);
      console.log("landscape_package_price - " + landscape_package_price);
      $("#landscape_package_price").text(landscape_package_price);
      var processing_fee = parseInt($("#processing_fee_price").val());
      console.log("processing_fee - " + processing_fee);
      var recurring_price = parseInt($("#recurring_fee_price").val());
      console.log("recurring_price - " + recurring_price);
      var total_price = landscape_package_price + processing_fee + recurring_price;
      console.log("total - " + total_price);
      $("#total_price").text("$"+total_price);
      $("#landscape_package_price").val(landscape_package_price);
      $("#landscape_package_fee").text("$"+landscape_package_price);
  }
}