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
  }
  
  function reset_service(){
      $(".service_check:checked").removeAttr('checked');
      $(".add_service_seccess").hide();
  }