function remove_location(location_id){
    $("div.location_"+location_id).remove();
    $.ajax({
        url: "/delete_location",
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

        }  
    });      
}