$(document).ready( function () {
    if($("#plan01")[0]){
        $("#plan01")[0].checked = true;
        $("#s1")[0].checked = true;
        $(".tab")[0].className = "tab active";
        $(".btn-bordered-small")[0].className = "btn btn-solid-small";
    }    
});

function set_sub_plan(subplanid, sub_plan_month){
	document.getElementById('sub_plan').value = subplanid;
        $("#selected_sub_plan_month").text(sub_plan_month);
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
}

function set_schedule(schedule, el, name){
	$(".btn-solid-small").removeClass('btn btn-solid-small').addClass('btn btn-bordered-small');
	$(el).addClass('btn btn-solid-small');
	document.getElementById("schedule_id").value = schedule;
        document.getElementById("schedule_day").value = name;
}