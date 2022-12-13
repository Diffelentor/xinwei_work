jQuery(document).ready(function() {
    Metronic.init(); // init metronic core componets
    Layout.init(); // init layout
    QuickSidebar.init(); // init quick sidebar
    Demo.init(); // init demo features
    Page.init();
    $('.layout-option', panel).val("boxed");
});
var Page = function() {
    var initPageControl=function(){
        pageId = $("#page_id").val();
        if(pageId == "dash_board"){
            initNewsPart();
        }
    };

    var initNewsPart=function () {
        getZXRDRecordList();
        getCJXWRecordList();
        getGJXWRecordList();
    }

    var getZXRDRecordList=function () {
        var data = {};
        $.post("../../news_file_servlet_action?action=get_index_zxrd",data,function(json){
            console.log(JSON.stringify(json));
            if(json.result_code == 0){
                var list = json.aaData;
                var html ="";
                if(list!=undefined && list.length>0){
                    for (var i = 0; i < list.length; i++){
                        var record = list[i];
                        html=html+"										<tr>";
                        html=html+"	                                        <td>";
                        html=html+"	                                            <a href=\"javascript:Page.onViewRecord("+record.id+")\">"+record.title+"</a>";
                        html=html+"	                                        </td>";
                        html=html+"	                                        <td>";
                        html=html+"                                            "+record.time;
                        html=html+"                                        </td>";
                        html=html+"                                     </tr>";
                    }
                }
                $("#zxrd_news").html(html);
            }
        });
    }

    var getCJXWRecordList=function () {
        var data = {};
        // data.keywords = $("#record_query_setup #key_word").val();
        $.post("../../news_file_servlet_action?action=get_index_cjxw",data,function(json){
            console.log(JSON.stringify(json));
            if(json.result_code == 0){
                var list = json.aaData;
                var html ="";
                if(list!=undefined && list.length>0){
                    for (var i = 0; i < list.length; i++){
                        var record = list[i];
                        html=html+"										<tr>";
                        html=html+"	                                        <td>";
                        html=html+"	                                            <a href=\"javascript:Page.onViewRecord("+record.id+")\">"+record.title+"</a>";
                        html=html+"	                                        </td>";
                        html=html+"	                                        <td>";
                        html=html+"                                            "+record.time;
                        html=html+"                                        </td>";
                        html=html+"                                     </tr>";
                    }
                }
                $("#cjxw_news").html(html);
            }
        });
    }

    var getGJXWRecordList=function () {
        var data = {};
        // data.keywords = $("#record_query_setup #key_word").val();
        $.post("../../news_file_servlet_action?action=get_index_gjxw",data,function(json){
            console.log(JSON.stringify(json));
            if(json.result_code == 0){
                var list = json.aaData;
                var html ="";
                if(list!=undefined && list.length>0){
                    for (var i = 0; i < list.length; i++){
                        var record = list[i];
                        html=html+"										<tr>";
                        html=html+"	                                        <td>";
                        html=html+"	                                            <a href=\"javascript:Page.onViewRecord("+record.id+")\">"+record.title+"</a>";
                        html=html+"	                                        </td>";
                        html=html+"	                                        <td>";
                        html=html+"                                            "+record.time;
                        html=html+"                                        </td>";
                        html=html+"                                     </tr>";
                    }
                }
                $("#gjxw_news").html(html);
            }
        });
    }

    var onViewRecord=function (id) {
        window.location.href="../../news/page/news_content.jsp?id="+id;
    };

    return {
        init: function() {
            initPageControl();
        },
        onViewRecord:function (id) {
            onViewRecord(id);
        }
    }
}();