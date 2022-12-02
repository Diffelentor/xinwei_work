var module="user";
var sub="center";
/*================================================================================*/
jQuery(document).ready(function() {
    // initiate layout and plugins
    Metronic.init(); // init metronic core components
    Layout.init(); // init current layout
    QuickSidebar.init(); // init quick sidebar
    Demo.init(); // init demo features
    Page.init();
});
/* ================================================================================ */
//关于页面的控件生成等操作都放在Page里
var Page = function() {
    var id=null;
    /*----------------------------------------入口函数  开始----------------------------------------*/
    var initPageControl=function(){
        if(getUrlParam("id")==null){
            id=sessionStorage.getItem("id");
        }
        else{
            id=getUrlParam("id");
        }
        if(sessionStorage.getItem("identity")=="管理员"){
            $("#identity").removeAttr('readonly');
            $("#balance").removeAttr('readonly');
        }
        if(id==null || id==""){
            console.log("当前以游客身份登录。");
        }
        else{
            initUserProfile();
        }

    };
    var initUserProfile=function(){
        initUserProfileControlEvent();
        initUserRecordProfile();
    };
    /*------------------------------针对各个页面的入口 结束------------------------------*/
    var getUrlParam=function(name){
        //获取url中的参数
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return decodeURI(r[2]); return null; //返回参数值，如果是中文传递，就用decodeURI解决乱码，否则用unescape
    };

    var initUserProfileControlEvent=function(){
        $('#submit_button').click(function() {onModifySubmit();});
    };

    var initUserRecordProfile=function(){
        var data={};
        data.id=id;
        data.action="get_user_record";
        var url="../../"+module+"_"+sub+"_servlet_action";
        $.post(url,data,function(json){
            console.log(JSON.stringify(json));
            if(json.result_code==0){
                var record = json.aaData;
                record=record[0];
                $("#basic_inf #basic_username").html(record.username);
                $("#basic_inf #basic_identity").html(record.identity);
                $("#id").val(record.id);
                $("#username").val(record.username);
                $("#identity").val(record.identity);
                $("#password").val(record.password);
                $("#email").val(record.email);
                $("#balance").val(record.balance);
            }
        })
    };

    var onModifySubmit=function(id){
        if(confirm("您确定要修改用户信息吗？")){
            var url="../../"+module+"_"+sub+"_servlet_action";
            var data={};
            data.action="modify_user_record";
            data.id=$("#id").val();
            data.username=$("#username").val();
            data.password=$("#password").val();
            data.email=$("#email").val();
            data.identity=$("#identity").val();
            data.balance=$("#balance").val();
            $.post(url,data,function(json){
                if(json.result_code==0){
                    alert("已经完成设备修改。");
                    window.location.reload();
                }
            });
        }
    };

    //Page return 开始
    return {
        init: function() {
            initPageControl();
        }
    };
}();//Page
/*================================================================================*/