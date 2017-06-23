$(document).ready( function () {
    if($("#plan01")[0]){
        $("#plan01")[0].checked = true;
        $("#s1")[0].checked = true;
        $(".tab")[0].className = "tab active";
        $(".btn-bordered-small")[0].className = "btn btn-solid-small";
    }    
});

function set_service(service_id){
    document.getElementById('service_id').value = service_id;
    show_extra_services(service_id);
}

function reset_service(){
     $(".service_check:checked").removeAttr('checked');
     $(".add_service_seccess").hide();
}

function set_schedule(schedule, el, name){
    $(".btn-solid-small").removeClass('btn btn-solid-small').addClass('btn btn-bordered-small');
    $(el).addClass('btn btn-solid-small');
    document.getElementById("schedule_id").value = schedule;
    document.getElementById("schedule_day").value = name;
    $("span#day_selected").text('"'+name+'"');
}

function get_all_available_slots(ctrl, season_id){
    var selected_day = parseInt($("input#schedule_id").val());
    if(selected_day == 7){
        selected_day = 0;
    }
    $.ajax({
        url: "/get_available_slots_for_service",
        type: "post",
        dataType: "json",
        data: {
            "selected_day": selected_day,
            "season_id": season_id
        },
        beforeSend: function() {
        },
        complete: function() {
        },
        success: function(data) {
            console.log(data);   
            var html = '<div class="row">';
            var total_seasons = data["available_days"].length;
            $.each(data["available_days"], function( index, value ) {
                var border_css = "";
                if(total_seasons > 1 && index ==0){
                  border_css = "border-right"
                }
                var total_months = Object.keys(value["days"]).length;
                var outer_css = "col-md-4";
                var inner_css = "col-md-6";
                if(total_months > 2){
                    outer_css = "col-md-6"
                    inner_css = "col-md-4";
                }
                html += '<div class="'+outer_css+'  '+border_css+'">'+
                            '<h2>'+value["season"]+'</h2>';
                            $.each(value["days"], function( month, days ) {
                                html += '<div class="'+inner_css+'">'+
                                           '<div class="row">'+
                                             '<div class="col-md-6"><h3 class="no-margin">'+month+'</h3></div>'+
                                           '</div>';
                                           $.each(days, function( index, day ) { 
                                              var default_day = "";
                                              if(day[0]){
                                                 default_day = "selected"
                                              }
                                              html += '<div class="row">'+
                                                        '<div class="col-md-12"><span class="label label-default gray-label '+default_day+'">'+day[1]+'th</span></div>'+
                                                      '</div>';  
                                           });
                                html += '</div>';
                            });
                html += '</div>';
          });
          html += '</div>';
          console.log(html);
          $("div.service_"+data["service_id"]+" div#available_slots").html(html);
          $("div.service_"+data["service_id"]+" div#season_range").text(data["season_range"]);
        }  
    });    
}

function add_extra_service(service_id){
    var html = "<input type='hidden' name='subcription_extra_service["+service_id+"][\"service_id\"]' value='"+service_id+"' />";
    $("#selected_extra_services").append(html);
    $(".services-details").hide();
    $(".add_service_seccess").show();
    $(".service_check:checked").removeAttr('checked');
    $("#s"+service_id).closest("td").html('<i class="fa fa-check" aria-hidden="true" style="color:#31ad00;"></i>');
    $('html, body').animate({
        scrollTop: $(".add_service_seccess").offset().top - 100
    }, 1000);
}

function show_extra_services(service_id) {
    console.log("service_id - " + service_id);
    if ($(".add_service_seccess").is(":visible")) {
        $(".service_check:checked").removeAttr('checked');
        $(".add_service_seccess").effect("pulsate", {times: 1}, 1000);
    } else {
        $(".services-details").hide();
        $(".add_service_seccess").hide();
        $(".service_"+service_id).show();
    }
} 