  function subscription_validate(){
    //Map validation  
    var area = $("#subscription_location_attributes_area_in_acres").val();
    if(area === "0" || area === ""){
      alert("Please select your location on map");
      return false;
    }
    
    //Plan validation
    var selected_plan = $("div.plan input[type='checkbox']:checked").size();
    if(selected_plan < 1){
        alert("Please select atleast one plan.");
        return false;
    }
    
    //Extra service list validation
    var selected_services = $("table.extra-services-list input[type='checkbox']:checked").size();
    if(selected_services < 1){
        alert("Please select atleast one service.");
        return false;
    }    
  }