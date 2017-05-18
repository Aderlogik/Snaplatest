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