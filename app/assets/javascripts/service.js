$(document).ready( function () {
	$("#plan01")[0].checked = true;
	$("#s1")[0].checked = true;
	$(".tab")[0].className = "tab active";
	$(".btn-bordered-small")[0].className = "btn btn-solid-small";
});

function set_sub_plan(subplanid){
	document.getElementById('sub_plan').value = subplanid;
}

function set_service(serviceid){
	document.getElementById('service_id').value = serviceid;
}

function set_plan (plan, el) {
	console.log("I am here");
	console.log(el);
	$(".tab").removeClass('active');
	$(el).addClass('tab active');
	document.getElementById('plan').value = plan;
}