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
//    var selected_services = $("div#selected_extra_services input").size();
//    if(selected_services < 1){
//        alert("Please select atleast one service.");
//        return false;
//    }    
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
 
 function set_plan(plan, el) {
    $(".tab").removeClass('active');
    $(el).addClass('tab active');
    document.getElementById('plan').value = plan;
    $("#selected_plan").text($(el).text());

    //show proper subplan
    $(".subplan").hide();
    $("div[subplan_for='" + plan + "']").show();

    //calculate service price
    calculate_price();
}

function set_sub_plan(subplanid, sub_plan_month, recurring_price) {
    document.getElementById('sub_plan').value = subplanid;
    $("#selected_sub_plan_month").text(sub_plan_month);
    $("#recurring_fee_price").val(recurring_price);
    $("td#recurring_fee").text("$" + recurring_price);
    calculate_price();
}