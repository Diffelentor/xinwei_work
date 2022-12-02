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

    }

    var initNewsCommentControlEvent=function (){
        $("#comment_submit").click(function () {onSubmitComment();});
        $("#comment_reply_div #submit_button").click(function() {onAddDivSubmit();});

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
        window.location.href="news_content.jsp?id="+id;
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
        var Identity = $("#const_identity1").val();
        $.post("../../news_file_servlet_action?action=get_news_comment&id="+id,data,function (json) {
            console.log(JSON.stringify(json));
            if(json.result_code == 0){
                var list = json.aaData;
                var list2 = json.bbData;
                var html ="";
                if(list!=undefined && list.length>0){
                    for (var i = 0; i < list.length; i++){
                        var record = list[i];
                        html=html+"            <hr style='background-color: black !important;'>";
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
                        if(Identity == '管理员'){
                            html=html+"                       <a href=\"javascript:Page.onDeleteComment("+record.id+")\">删除</a>";
                        }
                        // html=html+"											</span>";
                        // html=html+"                    </h4>";
                        html=html+"	                            <h4>";
                        html=html+"	                                "+record.comment;
                        html=html+"	                            </h4>";                        html=html+"                </div>";
                        html=html+"            </div>";
                        html=html+"            <!--end media-->";
                        if (json.result_code1 == 0){
                            if(list2!=undefined && list2.length>0){
                                for(var j = 0; j < list2.length; j++){
                                    var reply  =list2[j];
                                    console.log("显示评论的回复！");
                                    if (reply.reply_id == record.id){
                                        //html=html+"			 	<br>";
                                        html=html+"			 	<!-- 显示评论回复的内容 -->";
                                        html=html+"            <div class=\"media\" style=\"margin-left: 80px \">";
                                        html=html+"                <a href=\"javascript:;\" class=\"pull-left\">";
                                        html=html+"                    <img alt=\"\" src=\"../../assets/admin/pages/media/users/avatar80_1.jpg\" class=\"media-object\" style=\"width: 50px; height: 50px; border-radius: 50% !important;\">";
                                        html=html+"                </a>";
                                        html=html+"                <div class=\"media-body\">";
                                        html=html+"                    <p style='font-size: medium'>";
                                        html=html+"                        "+reply.name;
                                        html=html+"                    </p>";
                                        //html=html+"											"+reply.time;
                                        html=html+"	                            <h6>";
                                        html=html+"	                                "+reply.reply+"&nbsp &nbsp &nbsp &nbsp &nbsp"+reply.time;
                                        html=html+"	                            </h6>";                        html=html+"                </div>";
                                        html=html+"            </div>";
                                        html=html+"            <!--end media-->";
                                        html=html+"            <hr>";
                                    }
                                }
                            }
                        }
                    }
                }

                $("#news_comment").html(html);

            } else {
                alert("[getNewsContent]与后端交互发生错误！！"+json.result_msg);
            }
        })
    }

    var commentID;
    var onCommentReply=function (id) {
        commentID = id;
        $("#comment_reply_div").modal("show");
    };
    var onDeleteComment=function (id) {
        var url = "../../news_file_servlet_action";
        var data = {};
        data.action = "delete_news_comment";
        data.commentID = id;
        $.post(url,data,function(json){
            console.log(JSON.stringify(json));
            if(json.result_code == 0){
                alert("已经删除评论！");
                window.location.reload();
            }
            else {
                alert("删除评论失败！");
                window.location.reload();
            }
        });
    };

    var onAddDivSubmit=function () {
        $("#comment_reply_div").modal("hide");
        submitAddReplyDiv();
    }

    var submitAddReplyDiv=function(){
        var url="../../news_file_servlet_action";
        var data={};
        data.commentId = commentID;
        data.action="add_comment_reply";
        data.reply_name = $("#const_username1").val();
        //data.reply_name=$("#reply_name").val();
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
        //data.user_name=$("#comment_add_div #user_name").val();
        data.user_name =$("#const_username1").val();
        data.news_comments=$("#comment_add_div #comment_detail").val();
        console.log(data);
        $.post(url,data,function(json){
            if(json.result_code==0){
                alert("发表评论成功！");
                window.location.reload();
                //window.location.href="news_content.jsp?id="+id;
            }else {
                alert("发表评论失败！");
                //window.location.href="news_content.jsp?id="+id;
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
        },
        onDeleteComment:function (id) {
            onDeleteComment(id);
        }
    }
}();