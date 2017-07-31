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

function payment_validation(){
    var is_valid = true;
    
    //blank fields validation
    $("#new_payment input[type='text']").each(function( index ) {
       if($(this).val() === ""){
           $(this).css("border", "solid 1px red");
           is_valid = false;
       }
    });
    
    if(!is_valid){
        return false;
    }
}

function calculate_price(){
  var total_area = $("#subscription_location_attributes_area_in_acres").val();
  var selected_plan = $("#service_plan .tab.active").attr("data-plan-id");
  var total_services = $("input[data_for='plan-"+selected_plan+"']:checked").attr("data_committed_service");
  if(total_area !== "0"){
      var weekly_min_charges = 50;
      var weekly_floting_charges = 25;
      var biweekly_min_changes = 55;
//      var biweekly_floting_charges = 27.5;
      var biweekly_trial_floting_charges = 12;
      var biweekly_seasonal_floting_charges = 8;
      total_area = parseFloat(total_area).toFixed(1);
      console.log("total_area - " + total_area);
      var mod_of_acre = 0;
      if(total_area > 0.3){
          mod_of_acre = Math.ceil((total_area-0.3)/0.4);
      }
      console.log("mod_of_acre - " + mod_of_acre);
      var weekly_rate_of_service_for_monthly = weekly_min_charges + ((mod_of_acre) * weekly_floting_charges);
      var weekly_rate_of_service_for_seasonal = weekly_rate_of_service_for_monthly - 5;
      console.log("weekly_rate_of_service_for_monthly - " + weekly_rate_of_service_for_monthly);
      console.log("weekly_rate_of_service_for_seasonal - " + weekly_rate_of_service_for_seasonal);
      
      $(".weekly-trial .plan-price").text("$"+weekly_rate_of_service_for_monthly);
      $(".weekly-trial input[data_for]").attr("data_price", weekly_rate_of_service_for_monthly);
      $(".weekly-seasonal .plan-price").text("$"+weekly_rate_of_service_for_seasonal);
      $(".weekly-seasonal input[data_for]").attr("data_price", weekly_rate_of_service_for_seasonal);
      
      var biweekly_rate_of_service_for_monthly = biweekly_min_changes + ((mod_of_acre) * biweekly_trial_floting_charges);
      var biweekly_rate_of_service_for_seasonal = biweekly_min_changes + ((mod_of_acre) * biweekly_seasonal_floting_charges);
      
      $(".bi-weekly-trial .plan-price").text("$"+biweekly_rate_of_service_for_monthly);
      $(".bi-weekly-trial input[data_for]").attr("data_price", biweekly_rate_of_service_for_monthly);
      $(".bi-weekly-seasonal .plan-price").text("$"+biweekly_rate_of_service_for_seasonal);
      $(".bi-weekly-seasonal input[data_for]").attr("data_price", biweekly_rate_of_service_for_seasonal);
      
      if(total_services !== undefined && selected_plan !== undefined){
        var rate_of_service = $("input[data_for='plan-"+selected_plan+"']:checked").attr("data_price");
        var landscape_package_price = rate_of_service * parseInt(total_services);
        $("#landscape_package_price").text(landscape_package_price);
        var processing_fee = parseInt($("#processing_fee_price").val());
        var total_price = landscape_package_price + processing_fee;
        $("#total_price").text("$"+total_price);
        $("#landscape_package_price").val(landscape_package_price);
        $("#landscape_package_fee").text("$"+landscape_package_price);
    }
  }
}