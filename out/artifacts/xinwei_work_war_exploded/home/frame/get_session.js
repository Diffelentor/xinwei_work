jQuery(document).ready(function() {
    Get_Session.init();
});
var Get_Session = function() {
    var initSession=function(){
        var data={};
        data.action="get_session";
        $.post("../../user_center_servlet_action",data,function(json){
            console.log(JSON.stringify(json));
            if(json.result_code==0){
                $("#const_username").html(json.username);
            }
        })
    };
    return {
        init: function() {
            initSession();
        }
    }
}();