var module="advice";
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
    /*----------------------------------------入口函数  开始----------------------------------------*/
    var initPageControl=function(){
        if($("#page_id").val()=="advice_list_print"){
            initAdviceListPrint();
        }
        else if($("#page_id").val()=="advice_statistic"){
            initAdviceStatistic();
        }
        else{
            initAdviceList();
        }
    };
    /*----------------------------------------入口函数  结束----------------------------------------*/
    var columnsData=undefined;
    var recordResult=undefined;
    var chartData=[];
    /*----------------------------------------业务函数  开始----------------------------------------*/
    /*------------------------------针对各个页面的入口  开始------------------------------*/
    var initAdviceList=function(){
        initAdviceListControlEvent();
        initAdviceRecordList();
    };

    var initAdviceStatistic=function () {
        initAdviceStatisticControlEvent();
        $.ajaxSettings.async = false;	//禁止异步方式，否则第一个函数还没执行完就会执行第二个了
        initAdviceStatisticRecord();
        $.ajaxSettings.async = true;
        initBarChart();
    };

    /*------------------------------针对各个页面的入口 结束------------------------------*/
    var getUrlParam=function(name){
        //获取url中的参数
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return decodeURI(r[2]); return null; //返回参数值，如果是中文传递，就用decodeURI解决乱码，否则用unescape
    };
    var initAdviceListControlEvent=function(){
        $('#add_button').click(function() {onAddRecord();});
        $('#record_modify_div #submit_button').click(function() {onModifyDivSubmit();});
        $('#record_add_div #submit_button').click(function() {onAddDivSubmit();});
        $('#record_reply_div #submit_button').click(function() {onReplyDivSubmit();});
        $('#query_button').click(function() {onQueryRecord();});
        $('#export_button').click(function() {onExportRecord();});
        $('#table_print_button').click(function() {onTablePrint();});
        $('#statistic_button').click(function() {onStatisticRecord();});
        $('#remake_button').click(function() {onRemake();});
        $('#refresh_button').click(function() {onRemake();});	//另一个刷新按钮
    };
    var initAdviceStatisticControlEvent=function () {
        $('#return_button').click(function() {returnBack();});
    };
    var returnBack=function () {
        history.go(-1);
    };

    var onTablePrint=function(){
        window.location.href="advice_list_print.jsp";
    };
    var onStatisticRecord=function () {
        window.location.href="advice_statistic.jsp";
    };

    var initAdviceStatisticRecord=function () {
        var url = "../../"+module+"_"+sub+"_servlet_action";
        var data={"action":"get_count_isreplied"};
        $.post(url,data,function (json) {
            console.log(JSON.stringify(json));
            var html="";
            if(json.result_code == 0){
                console.log(JSON.stringify(json));
                chartData.push({"category":"已回复","column-1":json.count_answer});
                chartData.push({"category":"未回复","column-1":json.count_question-json.count_answer});
                console.log(JSON.stringify(chartData));
            }else {
                alert("查询数据错误："+json.result_smg);
            }
        })
    };

    var initBarChart=function () {
        var chart = AmCharts.makeChart("chart_1",{
            "type"    : "pie",
            // "theme": "dark",
            "pathToImages": Metronic.getGlobalPluginsPath() + "amcharts/amcharts/images/",
            "titleField"  : "category",
            "valueField"  : "column-1",
            "dataProvider"  : chartData,
            "depth3D": 15,
            "angle": 30,//3d倾斜度
            "marginTop": 60,//距离上下左右的距离
            "marginBottom": 0,
            "marginRight": 25,
            "marginLeft": 25,

        });
        $('#chart_1').closest('.portlet').find('.fullscreen').click(function() {
            chart.invalidateSize();
        });
    };

    var onRemake=function () {
        window.location.reload();
    };
    var onAddRecord=function(){
        $('#record_add_div').modal("show");
        console.log("开始添加");
    };

    var initAdviceRecordList=function(){
        if (sessionStorage.getItem("identity") == "管理员") {
            console.log("管理员登录");
            id="";
            getAdviceRecordtable_manager();
        } else{
            $("#username_div").css("visibility","hidden");;
            getAdviceRecordtable();
        }

    };
    var onDeleteRecord = function(id){
        if(confirm("您确定要删除这条建议吗？")){
            console.log(id);
            if(id>-1){
                var url="../../"+module+"_"+sub+"_servlet_action";
                var data={};
                data.action="delete_advice_record";
                data.advice_id=id;
                $.post(url,data,function(json){
                    console.log(JSON.stringify(json));
                    if(json.result_code==0){
                        window.location.reload();
                    }
                })
            }
        }
    };
    var onModifyRecord=function(id){
        var url="../../"+module+"_"+sub+"_servlet_action";
        var data={};
        data.action="get_advice_record";
        data.advice_id=id;
        $.post(url,data,function(json){
            console.log(JSON.stringify(json));
            if(json.result_code==0) {
                var record = json.aaData;
                record=record[0];
                $("#record_modify_div #advice_id").val(record.advice_id);
                $("#record_modify_div #advice_input").val(record.content);
                $("#record_modify_div").modal("show");
            }
        })
    };


    var onReplyRecord=function(id){
        $("#record_reply_div #advice_id").val(id);
        $("#record_reply_div").modal("show");
    };

    var getAdviceRecordtable=function(){
        var data={};
        data.username=sessionStorage.getItem("username");
        data.keyword=$('#record_query_setup #keyword').val();
        $.post("../../"+module+"_"+sub+"_servlet_action?action=get_advice_record",data,function(json){
            console.log(JSON.stringify(json));
            var html="";
            if(json.result_code==0){
                var list=json.aaData;
                if(list!=undefined && list.length>0){
                    for(var i=0;i<list.length;i++){
                        var record=list[i];
                        html=html+"<div class='col-md-6 col-sm-6'>";
                        html=html+"<div class='portlet light'>";
                        html=html+"<div class='portlet-title'>";
                        html=html+"<div class='caption'>";
                        html=html+"<i class='icon-bubble font-red-sunglo'>";
                        html=html+"</i>";
                        html=html+"<span class='caption-subject font-red-sunglo bold uppercase'>建议";
                        html=html+"</span>";
                        html=html+"</div>";
                        html=html+"<div class='actions'>";
                        html=html+"<a href='javascript:Page.onModifyRecord("+record.advice_id+");' class='btn btn-circle blue-madison btn-sm'>";
                        html=html+"<i class='fa fa-plus'>";
                        html=html+"</i>";
                        html=html+" 修改</a>";
                        html=html+"<a href='javascript:Page.onDeleteRecord("+record.advice_id+");' class='btn btn-circle red-sunglo btn-sm'>";
                        html=html+"<i class='fa fa-fa-minus'>";
                        html=html+"</i>";
                        html=html+"删除</a>";
                        html=html+"</button>";
                        html=html+"<a class='btn btn-circle btn-icon-only btn-default fullscreen' href='javascript:;' data-original-title='' title=''>";
                        html=html+"</a>";
                        html=html+"</div>";
                        html=html+"</div>";
                        html=html+"<div class='portlet-body' id='chats'>";
                        html=html+"<div class='scroller' style='height: 341px;' data-always-visible='1' data-rail-visible1='1'>";
                        html=html+"<ul class='chats'>";
                        html=html+"<li class='in'>";
                        html=html+"<img class='avatar' alt='' src='default_avatar.png'/>";
                        html=html+"<div class='message'>";
                        html=html+"<span class='arrow'>";
                        html=html+"</span>";
                        html=html+"<a href='javascript:;' class='name'> "+record.username;
                        html=html+"</a>";
                        html=html+"<span class='datetime'> at "+record.release_time;
                        html=html+"</span>";
                        html=html+"<span class='body'> "+record.content;
                        html=html+"</span>";
                        html=html+"</div>";
                        html=html+"<li class='out'>";
                        html=html+"<img class='avatar' alt='' src='default_avatar.png'/>";
                        html=html+"<div class='message'>";
                        html=html+"<span class='arrow'>";
                        html=html+"</span>";
                        html=html+"<a href='javascript:;' class='name'> 管理员";
                        html=html+"</a>";
                        html=html+"<span class='datetime'> at "+record.reply_time;
                        html=html+"</span>";
                        html=html+"<span class='body'> "+record.reply;
                        html=html+"</span>";
                        html=html+"</div>";
                        html=html+"</ul>";
                        html=html+"</div>";
                        html=html+"</div>";
                        html=html+"</div>";
                        html=html+"</div>";


                    }
                }

            }
            $("#advice_bar").html(html);
        })
    };

    var getAdviceRecordtable_manager=function(){
        var data={}
        data.username=$('#record_query_setup #username').val();
        data.keyword=$('#record_query_setup #keyword').val();
        $.post("../../"+module+"_"+sub+"_servlet_action?action=get_advice_record",data,function(json){
            console.log(JSON.stringify(json));
            var html="";
            if(json.result_code==0){
                var list=json.aaData;
                if(list!=undefined && list.length>0){
                    for(var i=0;i<list.length;i++){
                        var record=list[i];
                        html=html+"<div class='col-md-6 col-sm-6'>";
                        html=html+"<div class='portlet light'>";
                        html=html+"<div class='portlet-title'>";
                        html=html+"<div class='caption'>";
                        html=html+"<i class='icon-bubble font-red-sunglo'>";
                        html=html+"</i>";
                        html=html+"<span class='caption-subject font-red-sunglo bold uppercase'>建议";
                        html=html+"</span>";
                        html=html+"</div>";
                        html=html+"<div class='actions'>";
                        html=html+"<a href='javascript:Page.onReplyRecord("+record.advice_id+");' class='btn btn-circle yellow-casablanca btn-sm'>";
                        html=html+"<i class='fa fa-reply'>";
                        html=html+"</i>";
                        html=html+" 回复</a>";
                        html=html+"<a href='javascript:Page.onDeleteRecord("+record.advice_id+");' class='btn btn-circle red-sunglo btn-sm'>";
                        html=html+"<i class='fa fa-fa-minus'>";
                        html=html+"</i>";
                        html=html+"删除</a>";
                        html=html+"</button>";
                        html=html+"<a class='btn btn-circle btn-icon-only btn-default fullscreen' href='javascript:;' data-original-title='' title=''>";
                        html=html+"</a>";
                        html=html+"</div>";
                        html=html+"</div>";
                        html=html+"<div class='portlet-body' id='chats'>";
                        html=html+"<div class='scroller' style='height: 341px;' data-always-visible='1' data-rail-visible1='1'>";
                        html=html+"<ul class='chats'>";
                        html=html+"<li class='in'>";
                        html=html+"<img class='avatar' alt='' src='default_avatar.png'/>";
                        html=html+"<div class='message'>";
                        html=html+"<span class='arrow'>";
                        html=html+"</span>";
                        html=html+"<a href='javascript:;' class='name'> "+record.username;
                        html=html+"</a>";
                        html=html+"<span class='datetime'> at "+record.release_time;
                        html=html+"</span>";
                        html=html+"<span class='body'> "+record.content;
                        html=html+"</span>";
                        html=html+"</div>";
                        html=html+"<li class='out'>";
                        html=html+"<img class='avatar' alt='' src='default_avatar.png'/>";
                        html=html+"<div class='message'>";
                        html=html+"<span class='arrow'>";
                        html=html+"</span>";
                        html=html+"<a href='javascript:;' class='name'> 管理员";
                        html=html+"</a>";
                        html=html+"<span class='datetime'> at "+record.reply_time;
                        html=html+"</span>";
                        html=html+"<span class='body'> "+record.reply;
                        html=html+"</span>";
                        html=html+"</div>";
                        html=html+"</ul>";
                        html=html+"</div>";
                        html=html+"</div>";
                        html=html+"</div>";
                        html=html+"</div>";
                    }
                }

            }
            $("#advice_bar").html(html);
        })
    };

    var onModifyDivSubmit=function(){
        $("#record_modify_div").modal("hide");
        submitModifyRecordDiv();
    };

    var onAddDivSubmit=function(){
        $("#record_add_div").modal("hide");
        submitAddRecordDiv();
    };

    var onReplyDivSubmit=function(){
        $("#record_reply_div").modal("hide");
        submitReplyRecordDiv();
    };


    var submitModifyRecordDiv=function(){
        if(confirm("您确定要修改该条建议吗？")){
            var url="../../"+module+"_"+sub+"_servlet_action";
            var data={};
            data.action="modify_advice_record";
            data.advice_id=$("#record_modify_div #advice_id").val();
            data.content=$("#record_modify_div #advice_input").val();
            $.post(url,data,function(json){
                if(json.result_code==0){
                    alert("已经完成建议修改。");
                    window.location.reload();
                }
            });
        }
    };

    var submitAddRecordDiv=function(){
        if(confirm("您确定要添加该记录吗？")){
            var url="../../"+module+"_"+sub+"_servlet_action";
            var data={};
            data.action="add_advice_record";
            data.username=sessionStorage.getItem("username");
            data.content=$("#record_add_div #advice_input").val();
            console.log($("#record_add_div #advice_input").val());
            $.post(url,data,function(json){
                console.log(json.toString());
                if(json.result_code==0){
                    alert("已提交建议。");
                    window.location.reload();
                }
            });
        }
    };

    var submitReplyRecordDiv=function(id){
        if(confirm("您确定要添加该回复吗？")){
            var url="../../"+module+"_"+sub+"_servlet_action";
            var data={};
            data.action="update_reply_record";
            data.advice_id=$("#record_reply_div #advice_id").val();
            data.reply=$("#record_reply_div #reply_input").val();
            console.log($("#record_reply_div #reply_input").val());
            $.post(url,data,function(json){
                console.log(json.toString());
                if(json.result_code==0){
                    alert("已提交回复。");
                    window.location.reload();
                }
            });
        }
    };

    var onViewRecord=function(id){
        window.location.href="complain_profile.jsp?id="+id;
    };

    var returnback=function(){
        history.go(-1);
    };

    var onQueryRecord=function () {
        initAdviceRecordList();
    };

    var onExportRecord=function () {
        $('#record_download_div').modal("show");
        var url="../../"+module+"_"+sub+"_servlet_action";
        var data={"action":"export_advice_record"};
        $.post(url,data,function(json){
            if(json.result_code==0){
                console.log(JSON.stringify(json));
                $('#record_download_div #download_url').attr("href","javascript:window.open('"+json.download_url+"')");
                $('#record_download_div').modal("show");
            }else{
                alert("[onExportRecord]与后端加护错误！"+json.result_msg);
            }
        });
    };

    var initAdviceListPrint=function(){
        $(".page-container").attr("style","margin-top:0px");
        $.post("../../"+module+"_"+sub+"_servlet_action?action=get_advice_record",function(json){
            console.log(JSON.stringify(json));
            if(json.result_code==0){
                var list=json.aaData;
                var html="";
                if(list!=undefined && list.length>0){
                    for(var i=0;i<list.length;i++){
                        var record=list[i];
                        html=html+"<div class='col-md-6 col-sm-6'>";
                        html=html+"<div class='portlet light'>";
                        html=html+"<div class='portlet-title'>";
                        html=html+"<div class='caption'>";
                        html=html+"<i class='icon-bubble font-red-sunglo'>";
                        html=html+"</i>";
                        html=html+"<span class='caption-subject font-red-sunglo bold uppercase'>建议";
                        html=html+"</span>";
                        html=html+"</div>";
                        html=html+"<div class='actions'>";
                        html=html+"</button>";
                        html=html+"<a class='btn btn-circle btn-icon-only btn-default fullscreen' href='javascript:;' data-original-title='' title=''>";
                        html=html+"</a>";
                        html=html+"</div>";
                        html=html+"</div>";
                        html=html+"<div class='portlet-body' id='chats'>";
                        html=html+"<div class='scroller' style='height: 341px;' data-always-visible='1' data-rail-visible1='1'>";
                        html=html+"<ul class='chats'>";
                        html=html+"<li class='in'>";
                        html=html+"<img class='avatar' alt='' src='../../assets/admin/layout/img/avatar2.jpg'/>";
                        html=html+"<div class='message'>";
                        html=html+"<span class='arrow'>";
                        html=html+"</span>";
                        html=html+"<a href='javascript:;' class='name'> "+record.username;
                        html=html+"</a>";
                        html=html+"<span class='datetime'> at "+record.release_time;
                        html=html+"</span>";
                        html=html+"<span class='body'> "+record.content;
                        html=html+"</span>";
                        html=html+"</div>";
                        html=html+"<li class='out'>";
                        html=html+"<img class='avatar' alt='' src='default_avatar.png'/>";
                        html=html+"<div class='message'>";
                        html=html+"<span class='arrow'>";
                        html=html+"</span>";
                        html=html+"<a href='javascript:;' class='name'> 管理员";
                        html=html+"</a>";
                        html=html+"<span class='datetime'> at "+record.reply_time;
                        html=html+"</span>";
                        html=html+"<span class='body'> "+record.reply;
                        html=html+"</span>";
                        html=html+"</div>";
                        html=html+"</ul>";
                        html=html+"</div>";
                        html=html+"</div>";
                        html=html+"</div>";
                        html=html+"</div>";
                    }
                }
                $("#print_advice_bar").html(html);
                window.print();		//因为这个JQ封装的的这个post是以异步的方式进行执行，所以要在这里调用这个接口，不然打印的是html没有修改后的东西。
            }
        })
    };


    //Page return 开始
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
        },
        onReplyRecord:function(id){
            onReplyRecord(id);
        }
    };
}();//Page
/*================================================================================*/
