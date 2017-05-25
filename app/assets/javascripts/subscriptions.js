  function subscription_validate(){
    //Map location validation  
    var location = $("#subscription_location_attributes_address").val(); 
    if(location === "0" || location === ""){
      alert("Please select your proper location on map");
      return false;
    }    
            
    //Map area validation  
    var area = $("#subscription_location_attributes_area_in_acres").val();
    if(area === "0" || area === ""){
      alert("Please select your area on map");
      return false;
    }
    
    //Plan validation
    var selected_plan = $("div.plan input[type='radio']:checked").size();
    if(selected_plan < 1){
        alert("Please select atleast one plan.");
        return false;
    }
    
    //Subplan validation  
    var selected_plan = $("#service_plan .tab.active").attr("data-plan-id");
    var selected_sub_plan = $("input[data_for='plan-"+selected_plan+"']:checked").attr("data_committed_service");;
    if(selected_sub_plan === undefined){
       alert("Please select plan in months"); 
       return false;
    }    
    
    //Extra service list validation
    var selected_services = $("div#selected_extra_services input").size();
    if(selected_services < 1){
        alert("Please select atleast one service.");
        return false;
    }    
  }
  
  function add_extra_service(service_id){
        var html = "<input type='hidden' name='subcription_extra_service["+service_id+"][\"service_id\"]' value='"+service_id+"' />";
        $("#selected_extra_services").append(html);
        $(".service01, .service02, .service03, .service04, .service05, .service06, .service07, .service08").hide();
        $(".add_service_seccess").show();
        $(".service_check:checked").removeAttr('checked');
        $('html, body').animate({
            scrollTop: $(".add_service_seccess").offset().top - 100
        }, 1000);
  }
  
  function reset_service(){
      $(".service_check:checked").removeAttr('checked');
      $(".add_service_seccess").hide();
  }
  
 function get_address_components(place){
    var address_components = place.address_components;
    var location_address = "";
    var location_city = "";
    var location_state = "";
    var location_zip = "";
    var location_country = "";        
    if(address_components !== null && address_components.length > 0){
      $.each(address_components, function( index, value ) {
        if(value.types[0] && (value.types[0] === "street_number" || value.types[0] === "route") ){
          location_address += value.long_name + " ";
        }
        
        if(value.types[0] && value.types[0] === "administrative_area_level_1"){
          location_city = value.long_name;
        }
        
        if(value.types[0] && value.types[0] === "administrative_area_level_1"){
          location_state = value.short_name;
        }
        
        if(value.types[0] && value.types[0] === "postal_code"){
          location_zip = value.long_name;
        }
        
        if(value.types[0] && value.types[0] === "country"){
          location_country = value.short_name;
        }
      });
    }
    
    $("#subscription_location_attributes_address").val($.trim(location_address));
    $("#subscription_location_attributes_city").val(location_city);
    $("#subscription_location_attributes_state").val(location_state);
    $("#subscription_location_attributes_zip").val(location_zip);
    $("#subscription_location_attributes_country").val(location_country);
    $("#subscription_location_attributes_latitude").val(place.geometry.location.lat());
    $("#subscription_location_attributes_longitude").val(place.geometry.location.lng());
    $("#subscription_location_attributes_map_url").val(place.url); 
 }
 
 function show_extra_services(){
    if($(".add_service_seccess").is(":visible")){
      $(".service_check:checked").removeAttr('checked');  
      $(".add_service_seccess").effect( "pulsate", {times:1}, 1000 );
    }else{
      if ($("#s1").is(":checked")) {
        $(".service02, .service03, .service04, .service05, .service06, .service07, .service08, .add_service_seccess").hide();
        $(".service01").show();
      }else if ($("#s2").is(":checked")){
        $(".service01, .service03, .service04, .service05, .service06, .service07, .service08, .add_service_seccess").hide();
        $(".service02").show();
      }else if ($("#s3").is(":checked")){
        $(".service01, .service02, .service04, .service05, .service06, .service07, .service08, .add_service_seccess").hide();
        $(".service03").show();
      }else if ($("#s4").is(":checked")){
        $(".service01, .service02, .service03, .service05, .service06, .service07, .service08, .add_service_seccess").hide();
        $(".service04").show();
      }else if ($("#s5").is(":checked")){
        $(".service01, .service02, .service03, .service04, .service06, .service07, .service08, .add_service_seccess").hide();
        $(".service05").show();
      }else if ($("#s6").is(":checked")){
        $(".service01, .service02, .service03, .service04, .service05, .service07, .service08, .add_service_seccess").hide();
        $(".service06").show();
      }else if ($("#s7").is(":checked")){
        $(".service01, .service02, .service03, .service04, .service05, .service06, .service08, .add_service_seccess").hide();
        $(".service07").show();
      }else if ($("#s8").is(":checked")){
        $(".service01, .service02, .service03, .service04, .service05, .service06, .service07, .add_service_seccess").hide();
        $(".service08").show();
      }
    }
 } 