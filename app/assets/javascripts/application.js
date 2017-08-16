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

function init_map(map_id){
    var map = new google.maps.Map(document.getElementById(map_id), {
      zoom: 15,
      center: new google.maps.LatLng(40.71, -74.00),
      mapTypeId: google.maps.MapTypeId.HYBRID,
      disableDefaultUI: true,
      zoomControl: true
    });
    return map;
}

function init_marker_of_map(map, title, position){
//    var icon = {
//      size: new google.maps.Size(71, 71),
//      origin: new google.maps.Point(0, 0),
//      anchor: new google.maps.Point(17, 34),
//      scaledSize: new google.maps.Size(25, 25)
//    };
    var marker = new google.maps.Marker({
        map: map,
        title: title,
        position: position
    });   
    return marker;
}

function init_drawing_manager_of_map(map){
    var polyOptions = {
      strokeWeight: 0,
      fillOpacity: 0.45,
      editable: true
    };    
    // Creates a drawing manager attached to the map that allows the user to draw
    // markers, lines, and shapes.
    drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      markerOptions: {
        draggable: true
      },
      polylineOptions: {
        editable: true
      },
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT  ,
        drawingModes: ['marker', 'polygon', 'polyline']
      },   
      rectangleOptions: polyOptions,
      circleOptions: polyOptions,
      polygonOptions: polyOptions,
      map: map
    });      
    return drawingManager
}

function initialize() {
  var input = document.getElementById('map_address');
  input.value = "";
  document.getElementById("area_in_sq_f").innerHTML = "";
  document.getElementById("area_in_acre").innerHTML = "";
  var map = init_map("map");

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
  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      console.log(place);
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      get_address_components(place);
      // Create a marker for each place.
      markers.push(init_marker_of_map(map, place.name, place.geometry.location));
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });  
}

function init_driveway_map(name, lat, lng){
  var input = document.getElementById('driveway_map_address');
  input.value = "";
  if(lat != "" && lng != ""){
    var myLatLng = {lat: parseFloat(lat), lng: parseFloat(lng)};
    var map = new google.maps.Map(document.getElementById("driveway_map"), {
      zoom: 15,
      center: myLatLng,
      mapTypeId: google.maps.MapTypeId.HYBRID,
      disableDefaultUI: true,
      zoomControl: true
    });
    
    init_marker_of_map(map, name, myLatLng);
  }else{
      var map = init_map("driveway_map");
  }
  // Creates a drawing manager attached to the map that allows the user to draw
  // markers, lines, and shapes.
  drivewayDrawingManager = init_drawing_manager_of_map(map);    
  google.maps.event.addListener(drivewayDrawingManager, 'overlaycomplete', function(e) {
    if (e.type != google.maps.drawing.OverlayType.MARKER) {
      // Switch back to non-drawing mode after drawing a shape.
      drivewayDrawingManager.setDrawingMode(null);
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
      document.getElementById("driveway_area_in_sq_f").innerHTML = area_in_sq_f;
      var salt_price = (area_in_sq_f * 0.067).toFixed(2);
      document.getElementById("salt_area").innerHTML = area_in_sq_f;
      document.getElementById("salt_price").innerHTML = "$" + salt_price;
      $("#salt_price").attr("data-price", salt_price);
      $("#driveway_area_in_acres_billing").text(area_in_acre);
      setSelection(newShape);
    }
  });  
  google.maps.event.addListener(drivewayDrawingManager, 'drawingmode_changed', clearSelection);
  google.maps.event.addListener(map, 'click', clearSelection);
  google.maps.event.addDomListener(document.getElementById('driveway_clear_marker'), 'click', deleteSelectedDrivewayShape);
  buildColorPalette(); 
  
  // Create the search box and link it to the UI element.
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });    
  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      console.log(place);
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      get_address_components(place);
      // Create a marker for each place.
      markers.push(init_marker_of_map(map, place.name, place.geometry.location));
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });    
}

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
      var biweekly_trial_min_changes = 55;
      var biweekly_seasonal_min_changes = 50;
//      var biweekly_floting_charges = 27.5;
      var biweekly_trial_floting_charges = 39.5;
      var biweekly_seasonal_floting_charges = 35.5;
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
      
      var biweekly_rate_of_service_for_monthly = biweekly_trial_min_changes;
      var biweekly_rate_of_service_for_seasonal = biweekly_seasonal_min_changes;
      if(mod_of_acre > 0){
        biweekly_rate_of_service_for_monthly = biweekly_trial_min_changes + ((mod_of_acre) * biweekly_trial_floting_charges);
        biweekly_rate_of_service_for_seasonal = biweekly_seasonal_min_changes + ((mod_of_acre) * biweekly_seasonal_floting_charges);
      }
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
        var extra_service_price = $("#extra_service_price_tr[data-price]").attr("data-price");
        if(extra_service_price !== undefined){
            total_price = parseFloat(total_price) + parseFloat(extra_service_price);
            $("#extra_service_price").val(extra_service_price);
        }
        $("#total_price").text("$"+total_price);
        $("#landscape_package_price").val(landscape_package_price);
        $("#landscape_package_fee").text("$"+landscape_package_price);
    }
  }
}