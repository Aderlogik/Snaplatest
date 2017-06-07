$(document).ready( function () {
    if($("#plan01")[0]){
        $("#plan01")[0].checked = true;
        $("#s1")[0].checked = true;
        $(".tab")[0].className = "tab active";
        $(".btn-bordered-small")[0].className = "btn btn-solid-small";
    }    
});

function set_sub_plan(subplanid, sub_plan_month, recurring_price){
	document.getElementById('sub_plan').value = subplanid;
        $("#selected_sub_plan_month").text(sub_plan_month);
        $("#recurring_fee_price").val(recurring_price);
        $("td#recurring_fee").text("$"+recurring_price);
        calculate_price();
}

function set_service(serviceid){
	document.getElementById('service_id').value = serviceid;
}

function set_plan(plan, el) {
	$(".tab").removeClass('active');
	$(el).addClass('tab active');
	document.getElementById('plan').value = plan;
        $("#selected_plan").text($(el).text());
        
        //show proper subplan
        $(".subplan").hide();
        $("div[subplan_for='"+plan+"']").show();
        
        //calculate service price
        calculate_price();
}

function set_schedule(schedule, el, name){
	$(".btn-solid-small").removeClass('btn btn-solid-small').addClass('btn btn-bordered-small');
	$(el).addClass('btn btn-solid-small');
	document.getElementById("schedule_id").value = schedule;
        document.getElementById("schedule_day").value = name;
}

function set_service_setup_period(ctrl){
    var service_name = $(ctrl).find("div.service-name").text();
    $(ctrl).closest("div.services-details").find("input").val(service_name);
}