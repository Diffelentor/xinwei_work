jQuery(document).ready(function () {
    // initiate layout and plugins
    Metronic.init(); // init metronic core components
    Layout.init(); // init current layout
    QuickSidebar.init(); // init quick sidebar
    Demo.init(); // init demo features
    Page.init();
});

var Page = function () {

    var initPageControl=function () {
        pageId = $("#page_id").val();
        if(pageId == "news_list"){
            initNewsList();
        }
        if(pageId == "content_view"){
            initNewsContent();
        }
    };

    var initNewsList=function () {
        initNewsListControlEvent();
        initNewsRecordList();
    }

    var initNewsContent=function () {
        initNewsCommentControlEvent();
        initContentView();
        initCommentView();
    }

    var initNewsListControlEvent=function () {
        $("#help_button").click(function() {help();});
        $('#zxrd_button').click(function() {onZXRDTab();});
        $('#gjxw_button').click(function() {onGJXWTab();});
        $('#cjxw_button').click(function() {onCJXWTab();});
        $("#search_button").click(function () {onSearchRecord();});
        $('#comment_reply_div #submit_button').click(function() {onAddDivSubmit();});

    }

    var initNewsCommentControlEvent=function (){
        $("#comment_submit").click(function () {onSubmitComment();});
    }


    var initNewsRecordList=function () {
        getNewsRecordList();
        getCJXWRecordList();
        getGJXWRecordList();
    }

    var getNewsRecordList=function () {
        var data = {};
        data.keywords = $("#key_word").val();
        $.post("../../news_file_servlet_action?action=get_zxrd_record",data,function(json){
            console.log(JSON.stringify(json));
            if(json.result_code == 0){
                var list = json.aaData;
                var html ="";
                if(list!=undefined && list.length>0){
                    for (var i = 0; i < list.length; i++){
                        var record = list[i];
                        html=html+"										<tr class=\"active\">";
                        html=html+"	                                        <td>";
                        html=html+"	                                            "+record.time;
                        html=html+"	                                        </td>";
                        html=html+"	                                        <td>";
                        html=html+"                                            "+record.title;
                        html=html+"                                        </td>";
                        html=html+"                                        <td>";
                        html=html+"                                           <a href=\"javascript:Page.onViewRecord("+record.id+")\">详情</a>";
                        html=html+"                                        </td>";
                        html=html+"                                     </tr>";
                    }
                }
                $("#zxrd_news_content_div").html(html);
            }
        })
    }

    var getCJXWRecordList=function () {
        var data = {};
        data.keywords = $("#key_word").val();
        $.post("../../news_file_servlet_action?action=get_cjxw_record",data,function(json){
            console.log(JSON.stringify(json));
            if(json.result_code == 0){
                var list = json.aaData;
                var html ="";
                if(list!=undefined && list.length>0){
                    for (var i = 0; i < list.length; i++){
                        var record = list[i];
                        html=html+"										<tr class=\"active\">";
                        html=html+"	                                        <td>";
                        html=html+"	                                            "+record.time;
                        html=html+"	                                        </td>";
                        html=html+"	                                        <td>";
                        html=html+"                                            "+record.title;
                        html=html+"                                        </td>";
                        html=html+"                                        <td>";
                        html=html+"                                           <a href=\"javascript:Page.onViewRecord("+record.id+")\">详情</a>";
                        html=html+"                                        </td>";
                        html=html+"                                     </tr>";
                    }
                }
                $("#cjxw_news_content_div").html(html);
            }
        })
    }

    var getGJXWRecordList=function () {
        var data = {};
        data.keywords = $("#key_word").val();
        $.post("../../news_file_servlet_action?action=get_gjxw_record",data,function(json){
            console.log(JSON.stringify(json));
            if(json.result_code == 0){
                var list = json.aaData;
                var html ="";
                if(list!=undefined && list.length>0){
                    for (var i = 0; i < list.length; i++){
                        var record = list[i];
                        html=html+"										<tr class=\"active\">";
                        html=html+"	                                        <td>";
                        html=html+"	                                            "+record.time;
                        html=html+"	                                        </td>";
                        html=html+"	                                        <td>";
                        html=html+"                                            "+record.title;
                        html=html+"                                        </td>";
                        html=html+"                                        <td>";
                        html=html+"                                            <a href=\"javascript:Page.onViewRecord(" + record.id + ")\">详情</a>";
                        html=html+"                                        </td>";
                        html=html+"                                     </tr>";
                    }
                }
                $("#gjxw_news_content_div").html(html);
            }
        })
    }

    var onViewRecord=function (id) {
        window.location.href = "news_content.jsp?id="+id;
    };

    var initContentView=function () {
        var id=window.location.href.split("?")[1].split("=")[1];
        console.log(id);
        //var data = {"action":"get_news_content","id":id};
        var data = {};
        $.post("../../news_file_servlet_action?action=get_news_content&id="+id,data,function (json) {
            console.log(JSON.stringify(json));
            if(json.result_code == 0){

                var news_time = json.news_time;
                var news_title = json.news_title;
                var news_content = json.news_content;

                $("#content_news_title").html(news_title);
                $("#content_release_time").html(news_time);
                $("#content_news_content").html(news_content);
            } else {
                alert("[getNewsContent]与后端交互发生错误！！"+json.result_msg);
            }
        })
    };

    var initCommentView=function () {
        var id=window.location.href.split("?")[1].split("=")[1];
        var data = {};
        $.post("../../news_file_servlet_action?action=get_news_comment&id="+id,data,function (json) {
            console.log(JSON.stringify(json));
            if(json.result_code == 0){
                var list = json.aaData;
                var html ="";
                if(list!=undefined && list.length>0){
                    for (var i = 0; i < list.length; i++){
                        var record = list[i];
                        html=html+"			 	<br>";
                        html=html+"			 	<!-- Nested media object -->";
                        html=html+"            <div class=\"media\">";
                        html=html+"                <a href=\"javascript:;\" class=\"pull-left\">";
                        html=html+"                    <img alt=\"\" src=\"../../assets/admin/pages/media/blog/5.jpg\" class=\"media-object\" style=\"width: 70px; height: 70px; border-radius: 50% !important;\">";
                        html=html+"                </a>";
                        html=html+"                <div class=\"media-body\">";
                        html=html+"                    <p style='font-size: large'>";
                        html=html+"                        "+record.user_name;
                        html=html+"                    </p>";
                        // html=html+"                    <h4 class=\"media-heading\">发布时间 <span>";
                        html=html+"											"+record.submit_time+" / <a href=\"javascript:Page.onCommentReply("+record.id+");\">";
                        html=html+"											回复 </a>";
                        // html=html+"											</span>";
                        // html=html+"                    </h4>";
                        html=html+"	                            <h4>";
                        html=html+"	                                "+record.comment;
                        html=html+"	                            </h4>";                        html=html+"                </div>";
                        html=html+"            </div>";
                        html=html+"            <!--end media-->";
                        html=html+"            <hr>";
                    }
                }

                $("#news_comment").html(html);

            } else {
                alert("[getNewsContent]与后端交互发生错误！！"+json.result_msg);
            }
        })
    }

    var onCommentReply=function (id) {
        $("#comment_reply_div").modal("show");
    };

    var onAddDivSubmit=function () {
        $("#comment_reply_div").modal("hide");
        submitAddReplyDiv();
    }

    var submitAddReplyDiv=function(){
        var url="../../news_file_servlet_action";
        var data={};
        data.action="add_comment_reply";
        data.reply_name=$("#reply_name").val();
        data.reply_content=$("#reply_content").val();
        $.post(url,data,function(json){
            if(json.result_code==0){
                alert("回复成功！");
                window.location.reload();
            }
            else {
                alert("回复失败！");
                window.location.reload();
            }
        });
    }

    var onSubmitComment=function () {
        var id=window.location.href.split("?")[1].split("=")[1];
        var url="../../news_file_servlet_action";
        var data={};
        data.action="add_news_comment";
        data.news_id=id;
        data.user_name=$("#comment_add_div #user_name").val();
        data.news_comments=$("#comment_add_div #comment_detail").val();
        $.post(url,data,function(json){
            if(json.result_code==0){
                alert("发表评论成功！");
                window.location.reload();
            }else {
                alert("发表评论失败！");
            }
        });
    }

    var onSearchRecord=function () {
        initNewsRecordList();
    }
    //按钮切换界面
    var onZXRDTab=function () {
        $("#zxrd_tab").show();
        $("#gjxw_tab").hide();
        $("#cjxw_tab").hide();
    }
    var onGJXWTab=function () {
        $("#zxrd_tab").hide();
        $("#gjxw_tab").show();
        $("#cjxw_tab").hide();
    }
    var onCJXWTab=function () {
        $("#zxrd_tab").hide();
        $("#gjxw_tab").hide();
        $("#cjxw_tab").show();
    }

    //Page return 开始
    return {
        init: function () {
            initPageControl();
        },
        onViewRecord:function (id) {
            onViewRecord(id);
        },
        onCommentReply:function (id) {
            onCommentReply(id);
        }
    }
}();