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
                $("#const_username1").val(json.username);
                $("#const_identity1").val(json.identity);
                $("#const_id1").val(json.id);
                $("#const_balance1").val(json.balance);
                $("#const_password1").val(json.password);
                $("#const_email1").val(json.email);
                console.log(JSON.stringify(json));
            }
        })
    };
    return {
        init: function() {
            initSession();
        }
    }
}();