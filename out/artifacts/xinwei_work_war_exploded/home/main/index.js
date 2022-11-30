jQuery(document).ready(function() {
    Metronic.init(); // init metronic core componets
    Layout.init(); // init layout
    QuickSidebar.init(); // init quick sidebar
    Demo.init(); // init demo features
    Page.init();
});
var Page = function() {
    var initPageControl=function(){
        // initSession();
        pageId=$("#page_id").val();
        if(pageId=="dash_board"){
            initDeviceList();
            $("#device_button").click(function() {
                window.location.href="../../maintain/device/device_list.jsp";
            })
        }
    };
    var initDeviceList=function(){
        var data={};
        data.action="get_gps_status";
        $.post("../../device_file_servlet_action",data,function(json){
            console.log(JSON.stringify(json));
            if(json.result_code==0){
                var list=json.aaData;
                $("#gps_vehicle_active_number").html(json.gps_vehicle_active_number);
                if(list!=undefined && list.length>0){
                    for(var i=0;i<list.length;i++){
                        var record=list[i];
                        //$("#device_name").html(record.device_name);
                    }
                }
            }
        })
    };
    // var initSession=function(){
    //     var data={};
    //     data.action="get_session";
    //     $.post("../../user_center_servlet_action",data,function(json){
    //         console.log(JSON.stringify(json));
    //         if(json.result_code==0){
    //             $("#const_username").html(json.username);
    //         }
    //     })
    // };
    return {
        init: function() {
            initPageControl();
        },
        onDeleteRecord:function(id){
            onDeleteRecord(id);
        },
        onModifyRecord:function(id){
            onModifyRecord(id);
        },
        onViewRecord:function(id){
            onViewRecord(id);
        }
    }
}();