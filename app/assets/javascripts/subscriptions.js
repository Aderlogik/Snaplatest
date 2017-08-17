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

  function deleteSelectedShape () {
    if (selectedShape) {
      selectedShape.setMap(null);
      drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
    }
  } 
  
  function deleteSelectedDrivewayShape(){
    if (selectedShape) {
      selectedShape.setMap(null);
      drivewayDrawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
    }      
  }
  
  setCustomLocation = function (obj) {
        var input = document.getElementById('map_address');
        var location_id = $(obj).attr("data-id");
        input.value = $(obj).attr("val");
        var newObj = {};
        newObj["geometry"] = {}
        newObj["geometry"]["location"] = {}
        newObj["geometry"]["location"]["lat"] = function () { return $(obj).attr("lat"); }
        newObj["geometry"]["location"]["lng"] = function () { return $(obj).attr("lng"); }
        var myLatLng = {lat: parseFloat($(obj).attr("lat")), lng: parseFloat($(obj).attr("lng"))};
        
        $(".pac-container").remove();
        $("tr#extra_service_price_tr").remove();
        var map = new google.maps.Map(document.getElementById("map"), {
            zoom: 15,
            center: myLatLng,
            mapTypeId: google.maps.MapTypeId.HYBRID,
            disableDefaultUI: true,
            zoomControl: true
          });

        var marker = init_marker_of_map(map, $(obj).attr("val"), myLatLng);
        
        // Creates a drawing manager attached to the map that allows the user to draw
        // markers, lines, and shapes.
        drawingManager = init_drawing_manager_of_map(map);
        
        google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
          if (e.type != google.maps.drawing.OverlayType.MARKER) {
            // Switch back to non-drawing mode after drawing a shape.
            drawingManager.setDrawingMode(null);
            // Add an event listener that selects the newly-drawn shape when the user
            // mouses down on it.
            var newShape = e.overlay;
            newShape.type = e.type;
            google.maps.event.addListener(newShape, 'click', function() {
              setSelection(newShape);
            });
            var area = google.maps.geometry.spherical.computeArea(newShape.getPath());
            var area_in_sq_f = (area * 10.764).toFixed(2);
            var area_in_acre = (area * 0.00024711).toFixed(2);
            document.getElementById("area_in_sq_f").innerHTML = area_in_sq_f;
            document.getElementById("area_in_acre").innerHTML = area_in_acre;
            $("#subscription_location_attributes_area_in_feet").val(area_in_sq_f);
            $("#subscription_location_attributes_area_in_acres").val(area_in_acre);
            $("#area_in_acres_billing").text(area_in_acre);
            setSelection(newShape);
            calculate_price();
          }
        });
        // Clear the current selection when the drawing mode is changed, or when the
        // map is clicked.
        google.maps.event.addListener(drawingManager, 'drawingmode_changed', clearSelection);
        google.maps.event.addListener(map, 'click', clearSelection);
        google.maps.event.addDomListener(document.getElementById('clear_marker'), 'click', deleteSelectedShape);
        buildColorPalette();

        // Create the search box and link it to the UI element.
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });
        refresh_location_service(location_id);
        $(".pac-container").hide();
    }
    