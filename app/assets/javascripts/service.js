function set_service(service_id){
    document.getElementById('service_id').value = service_id;
    show_extra_services(service_id);
    var name = $("input.location_name").val();
    var lat = $("input.location_latitude").val();
    var lng = $("input.location_longitude").val();
    console.log("Here");
    init_driveway_map(name, lat, lng);
}

function edit_extra_service(service_id){
    $('.service_check').prop('checked', false);
    show_extra_services(service_id);
}

function reset_service(){
     $(".service_check:checked").removeAttr('checked');
     $(".add_service_seccess").hide();
     $(".extra_service_default").show();
}

function set_schedule(schedule, el, name){
    $("#schedule_day_section").find(".btn-solid-small").removeClass('btn btn-solid-small').addClass('btn btn-bordered-small');
    $(el).addClass('btn btn-solid-small');
    document.getElementById("schedule_id").value = schedule;
    document.getElementById("schedule_day").value = name;
    $("span#day_selected").text('"'+name+'"');
    //get selected service id
    //get selected season id
    get_all_available_slots();
}

function set_plowing_inch(ctrl){
   $("#plowing_inch_section").find(".btn-solid-small").removeClass('btn btn-solid-small').addClass('btn btn-bordered-small'); 
   $(ctrl).addClass('btn btn-solid-small');
   $("#plowing_inch").val($(ctrl).text());
}

function get_all_available_slots(){
    var season_ids = [];
    var selected_service_id = $("input.service_check:checked").val();
    var service_frequency = $("input.service_check:checked").attr("data-frequency");
    $("div.service_"+selected_service_id).find("div.serviceList.selected").each(function(){
        season_ids.push($(this).attr("data-id"));
    });
    if (season_ids.length === 0) {
        $("div.service_"+selected_service_id+" div#available_slots").html("");
        return;
    }
    var selected_day = $("input#schedule_id").val();
    if(selected_day == ""){
       alert("Please select day of the week");
       return;
    }
    selected_day = parseInt(selected_day);
    if(selected_day == 7){
        selected_day = 0;
    }
    
    $.ajax({
        url: "/get_available_slots_for_service",
        type: "post",
        dataType: "json",
        data: {
            "selected_day": selected_day,
            "season_ids": season_ids
        },
        beforeSend: function() {
        },
        complete: function() {
        },
        success: function(data) {
            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
                "July", "Aug", "Sept", "Oct", "Nov", "Dec"
            ];
            var html = '<div class="row">';
            var total_seasons = data["available_days"].length;
            $.each(data["available_days"], function( index, value ) {
                var border_css = "";
                if(total_seasons > 1 && index == 0){
                  border_css = "border-right"
                }
                var total_months = Object.keys(value["days"]).length;
                var outer_css = "col-md-4";
                var inner_css = "col-md-6";
                if(total_months == 3){
                    outer_css = "col-md-6";
                    inner_css = "col-md-4";
                }else if(total_months == 4){
                 outer_css = "col-md-6";
                 inner_css = "col-md-3";
                }
                html += '<div class="season_slot '+outer_css+'  '+border_css+'">'+
                            '<h2>'+value["season"]+'</h2>';
                            $.each(value["days"], function( month, days ) {
                                html += '<div class="'+inner_css+' season_dates">'+
                                           '<div class="row">'+
                                             '<div class="col-md-6"><h3 class="no-margin">'+month+'</h3></div>'+
                                           '</div>';
                                           $.each(days, function( index, day ) { 
                                              var default_day = "";
                                              if(day[1]){//default week of the service
                                                 default_day = "selected"
                                              }
                                              var month_day_html = ""; 
                                              var date = new Date(day[2]);
                                              var formatted_short_day = date.getDate();
                                              var formatted_day = date.getDate() + " " + monthNames[date.getMonth()] + ", " + date.getFullYear();
                                              if(day[0]){//day already passed
                                                  month_day_html = '<span class="label label-default passed_date">'+formatted_short_day+'th</span>';
                                              }else{
                                                  month_day_html = '<a href="javascript:void(0);" class="label label-default gray-label '+
                                                                        default_day+'" data-date="'+formatted_day+'">'+formatted_short_day+'th</a>';
                                              }
                                              html += '<div class="row">'+
                                                        '<div class="col-md-12">'+month_day_html+'</div>'+
                                                      '</div>';  
                                           });
                                html += '</div>';
                            });
                html += '</div>';
          });
          html += '</div>';
          $("div.service_"+selected_service_id+" div#available_slots").html(html);
          $("div.service_"+selected_service_id+" div#season_range").text(data["season_range"]);
          var selected_season = $("div.service_"+selected_service_id).find("div.serviceList.selected").find(".service-name").text();
          $("div.service_"+selected_service_id+" span#season_selected").text(selected_season);
          var frequency = [];
          $("div.service_"+selected_service_id+" div.season_dates a.selected").each(function() { frequency.push($(this).attr("data-date"))});
          $("div.service_"+selected_service_id+" span#frequency_selected").text(frequency.join(" & "));
          if(service_frequency == "1"){
            $(".gray-label").click(function () {
                $(this).closest(".season_slot").find(".gray-label").removeClass("selected");
                build_recap_text(this);
            });    
          }else{
            $(".gray-label").click(function () {
                $(this).closest(".season_dates").find(".gray-label").removeClass("selected");
                build_recap_text(this);
            });
          }
        }  
    });    
}

function build_recap_text(ctrl){
    $(ctrl).toggleClass("selected");
    var frequency = [];
    $(ctrl).closest("div.services-details").find("div.season_dates a.selected").each(function () {
        frequency.push($(this).attr("data-date"));
    });
    $(ctrl).closest("div.services-details").find("span#frequency_selected").text(frequency.join(" & "));    
}
function add_extra_service(service_id){
    var edit_link_html = "<a href='javascript:void(0);' onclick='edit_extra_service("+service_id+");'>Edit</a>";
    $("#s"+service_id).closest("tr").find("td#edit_service").html(edit_link_html);
    var html = "<input type='hidden' name='subcription_extra_service["+service_id+"][\"service_id\"]' value='"+service_id+"' />";
    $("#selected_extra_services").append(html);
    $(".services-details").hide();
    $(".add_service_seccess").show();
    $(".service_check:checked").removeAttr('checked');
    $("#s"+service_id).closest("td").html('<i class="fa fa-check" aria-hidden="true" style="color:#31ad00;"></i>');
    $('html, body').animate({
        scrollTop: $(".add_service_seccess").offset().top - 100
    }, 1000);
    
    //add extra service in billing section
    var tr_html = "<tr id='extra_service_price_tr'>"+
                  "<td>"+$(".service_name_"+service_id).text()+"</td>"+
                  "<td>$0</td></tr>";    
    $( tr_html ).insertBefore(".final_total_tr");
}

function add_plowing_trigger_point(service_id){
    if($("#driveway_area_in_sq_f").text() === ""){
        alert("Please select area on driveway map.");
        return;
    }  
    if($("#plowing_inch").val() === ""){
        alert("Plase select plowing inch");
        return;
    }    
    var plowing_inch =  parseInt($("#plowing_inch").val());
    var plowing_area = parseFloat($("#driveway_area_in_sq_f").text());
    var plowing_price = (plowing_area * 0.054 * (plowing_inch-2)).toFixed(2);
    $("#plowing_inch").attr("data-price", plowing_price);
    var html = "<input type='hidden' name='subcription_extra_service["+service_id+"][\"service_id\"]' value='"+service_id+"' />";
    html += "<input type='hidden' name='subcription_extra_service["+service_id+"][\"price\"]' value='"+plowing_price+"' />";
    $("#selected_extra_services").append(html);        
    $("#extra_service_price_tr[data-service-id='"+service_id+"']").remove();
    $("#trigger_point_success").text("Added");
    var total_price = plowing_price;
//    if($("#salt_price").attr("data-price") !== undefined){
//        total_price = parseFloat(total_price) + parseFloat($("#salt_price").attr("data-price"));
//    }
    //add extra service in billing section
    var tr_html = "<tr id='extra_service_price_tr' data-service-id='"+service_id+"' data-price='"+total_price+"'>"+
                  "<td>"+$(".service_name_"+service_id).text()+"</td>"+
                  "<td>$"+total_price+"</td></tr>";    
    $( tr_html ).insertBefore(".final_total_tr");        
    calculate_price();
}

function add_salting_extra_service(service_id){
    if($("#driveway_area_in_sq_f").text() === ""){
        alert("Please select area on driveway map.");
    }else{
        var edit_link_html = "<a href='javascript:void(0);' onclick='edit_extra_service("+service_id+");'>Edit</a>";
        $("#s"+service_id).closest("tr").find("td#edit_service").html(edit_link_html);
        var salting_price = $("#salt_price").attr("data-price");
        var html = "<input type='hidden' name='subcription_extra_service["+service_id+"][\"service_id\"]' value='"+service_id+"' />";
        html += "<input type='hidden' name='subcription_extra_service["+service_id+"][\"salting_price\"]' value='"+salting_price+"' />";
        html += "<input type='hidden' name='subcription_extra_service["+service_id+"][\"salting\"]' value='1' />";
        $("#selected_extra_services").append(html);
        $(".services-details").hide();
        $(".add_service_seccess").show();
        $(".service_check:checked").removeAttr('checked');
        $("#s"+service_id).closest("td").html('<i class="fa fa-check" aria-hidden="true" style="color:#31ad00;"></i>');
        $('html, body').animate({
            scrollTop: $(".add_service_seccess").offset().top - 100
        }, 1000);
        $("#extra_service_price_tr[data-service-id='"+service_id+"']").remove();
        var total_price = parseFloat(salting_price);
        if($("#plowing_inch").attr("data-price") !== undefined){
            total_price = parseFloat(total_price) + parseFloat($("#plowing_inch").attr("data-price"));
        }  
        //add extra service in billing section
        var tr_html = "<tr id='extra_service_price_tr' data-service-id='"+service_id+"' data-price='"+total_price+"'>"+
                      "<td>"+$(".service_name_"+service_id).text()+"</td>"+
                      "<td>$"+total_price+"</td></tr>";    
        $(tr_html).insertBefore(".final_total_tr");
        calculate_price();
    }
}

function show_extra_services(service_id) {
    if ($(".add_service_seccess").is(":visible")) {
        $(".service_check:checked").removeAttr('checked');
        $(".add_service_seccess").effect("pulsate", {times: 1}, 1000);
    } else {
        $(".services-details").hide();
        $(".add_service_seccess").hide();
        $(".extra_service_default").hide();
        $(".service_"+service_id).show();
    }
} 

function add_mulching_section(service_id, ctrl){
    var service_desc = $("div.service_"+service_id+" p#service_desc").text();
    var mulch_html = $("div.service_"+service_id+" div.mulch-holder").html();
    var service_html = "<div style='text-align:right'>"+
                        "<button class='btn btn-add-gray' onclick='close_mulching_section("+service_id+", this)'>Close</button>"+
                       "</div>"+
                       "<div style='text-align:left !important'>"+
                        "<h4>Description</h4>"+
                        "<p id='service_desc'>"+service_desc+"</p>"+
                        "<h4>What type of mulch are you looking for?</h4>"+
                        "<div class='row mulch-holder' id='content-1'>"+
                        mulch_html+
                        "</div>"+
                       "</div>";
    $(ctrl).closest("div#extra_section").html(service_html);            
}

function close_mulching_section(service_id, ctrl){
    var html = "<button class='btn btn-add-gray' onclick='add_mulching_section("+service_id+", this);'>ADD MULCHING</button>";
    $(ctrl).closest("div#extra_section").html(html);    
    
}

function add_edging_section(service_id, ctrl){
    var service_desc = $("div.service_"+service_id+" p#service_desc").text();
    var service_html = "<div style='text-align:right'>"+
                       "<button class='btn btn-add-gray' onclick='close_edging_section("+service_id+", this)'>Close</button>"+
                       "<div style='text-align:left !important'>"+
                        "<h4>Description</h4>"+
                        "<p id='service_desc'>"+service_desc+"</p>"+
                       "</div>";
    $(ctrl).closest("div#extra_section").html(service_html);            
}

function close_edging_section(service_id, ctrl) {
    var html = "<button class='btn btn-add-gray' onclick='add_edging_section(" + service_id + ", this);'>ADD MULCHING</button>";
    $(ctrl).closest("div#extra_section").html(html);
}

function refresh_location_service(location_id){
    $.ajax({
        url: "/refresh_location_service",
        type: "post",
        dataType: "json",
        data: {
        "location_id": location_id
        },
        beforeSend: function() {
        },
        complete: function() {
        },
        success: function(data) {    
            console.log(data);
            $("#subscription_location_attributes_address").val(data["location"]["address"]);
            $("#subscription_location_attributes_city").val(data["location"]["city"]);
            $("#subscription_location_attributes_state").val(data["location"]["state"]);
            $("#subscription_location_attributes_zip").val(data["location"]["zip"]);
            $("#subscription_location_attributes_country").val(data["location"]["country"]);
            $("#subscription_location_attributes_latitude").val(data["location"]["latitude"]);
            $("#subscription_location_attributes_longitude").val(data["location"]["longitude"]);
            $("#subscription_location_attributes_map_url").val(data["location"]["map_url"]); 
            
            document.getElementById("area_in_sq_f").innerHTML = data["location"]["area_in_feet"];
            document.getElementById("area_in_acre").innerHTML = data["location"]["area_in_acres"];
            $("#subscription_location_attributes_area_in_feet").val(data["location"]["area_in_feet"]);
            $("#subscription_location_attributes_area_in_acres").val(data["location"]["area_in_acres"]);
            $("#area_in_acres_billing").text(data["location"]["area_in_acres"]);
            
            $("a[id^='plan_']").removeClass("active");
            $("div.subplan").hide();
            
            $("#plan_"+data["plan_id"]).removeClass("tab");
            $("#plan_"+data["plan_id"]).addClass("tab active");
            $("div[subplan_for="+data["plan_id"]+"]").show();
            $("input#sub-plan-"+data["sub_plan_id"]).attr("checked", "checked");
            
            $("a[data-schedule-id='"+data["schedule_id"]+"']").click();
            
            $.each(data["extra_service_ids"], function (index, value) {
                add_extra_service(value);
            });
            calculate_price();
        }
   })
}