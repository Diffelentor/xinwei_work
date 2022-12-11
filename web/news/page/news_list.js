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
        if (pageId == "insert_news"){
            initNewsImport();
        }
        if (pageId == "comments_list"){
            initCommentList();
        }
        if (pageId == "modify_news"){
            initNewsModifyPage();
        }
        if (pageId == "news_list_print"){
            initNewsListPrint();
        }
    };

    var Identity = sessionStorage.getItem("identity");

    //新闻列表
    var initNewsList=function () {
        if (Identity == '管理员'){
            $("#show_comments").attr("style","visibility:visible;");
        }
        initNewsListControlEvent();
        initNewsRecordList();
    }

    //评论列表
    var initCommentList=function () {
        initCommentListControlEvent();
        initCommentRecordList();
    }

    var initNewsContent=function () {
        initNewsCommentControlEvent();
        initContentView();
        initCommentView();
    }

    var initNewsImport=function () {
        initNewsImportControlEvent();
    }

    //修改新闻页面
    var initNewsModifyPage=function () {
        initNewsModifyControlEvent();
        initNewsModifyView();
    }

    var initNewsListPrint=function () {
        initNewsListPrintPage();
    }

    var initNewsListControlEvent=function () {
        $("#help_button").click(function() {help();});
        $('#zxrd_button').click(function() {onZXRDTab();});
        $('#gjxw_button').click(function() {onGJXWTab();});
        $('#cjxw_button').click(function() {onCJXWTab();});
        $("#record_query_setup #search_button").click(function () {onSearchRecord();});
        $("#export_button").click(function () {onExportNewsRecord();});
        $("#add_news_button").click(function () {onAddNewsButton();});  //手动添加新闻
        $("#show_comments").click(function () {onShowCommentsButton()}); //管理评论列表
        $("#news_print_button").click(function () {onNewsPrintButton();});
        $("#statistics_button").click(function () {onNewsStatisticButton();});
    }

    var initNewsCommentControlEvent=function (){
        $("#comment_submit").click(function () {onSubmitComment();});
        $("#comment_reply_div #submit_button").click(function() {onAddDivSubmit();});
    }

    var initNewsImportControlEvent=function () {
        $("#news_import").click(function () {onSubmitNewsInfo();});
        $("#cancel_button").click(function () {onCancelButton();});
    }

    //=====================================入口函数开始===============================
    var initNewsRecordList=function () {
        getNewsRecordList();
        getCJXWRecordList();
        getGJXWRecordList();
    }

    var initNewsListPrintPage=function () {
        $(".page-container").attr("style","margin-top:0px");
        var url = "../../news_file_servlet_action";
        var data = {};
        data.action = "get_zxrd_record";
        $.post(url,data,function (json) {
            console.log(JSON.stringify(json));
            if(json.result_code==0){
                var list=json.aaData;
                var html="";
                if(list!=undefined && list.length>0){
                    for(var i=0;i<list.length;i++){
                        var record=list[i];

                        html=html+"                          	 		<tr>";
                        html=html+"                                        <td>";
                        html=html+"                                            "+record.id;
                        html=html+"                                        </td>";
                        html=html+"                                        <td>";
                        html=html+"                                            "+record.title;
                        html=html+"                                        </td>";
                        html=html+"                                        <td>";
                        html=html+"                                            "+record.writer;
                        html=html+"                                        </td>";
                        html=html+"                                        <td>";
                        html=html+"                                            "+record.time;
                        html=html+"                                        </td>";
                        // html=html+"                                        <td>";
                        // html=html+"                                            "+record.balance;
                        // html=html+"                                        </td>";
                        html=html+"                                    </tr>";
                    }
                }
                $("#print_news_list_div").html(html);
                window.print();
            }
        });
    }

    var initCommentRecordList=function () {
        var url = "../../news_file_servlet_action";
        var data = {};
        data.action = "get_news_comment";
        $.post(url,data,function (json) {
            console.log(JSON.stringify(json));
            if (json.result_code == 0) {
                var list = json.aaData;
                var html = "";
                if (list != undefined && list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        var record = list[i];
                        html = html + "										<tr class=\"warning\">";
                        html = html + "	                                        <td>";
                        html = html + "	                                            " + (i + 1);
                        html = html + "	                                        </td>";
                        html = html + "	                                        <td>";
                        html = html + "                                            " + record.user_name;
                        html = html + "                                        </td>";
                        html = html + "	                                        <td>";
                        html = html + "                                            " + record.comment;
                        html = html + "                                        </td>";
                        html = html + "	                                        <td>";
                        html = html + "                                            " + record.submit_time;
                        html = html + "                                        </td>";
                        html = html + "                                        <td>";
                        html = html + "                                           <a href=\"javascript:Page.onDeleteComment(" + record.id + ")\">【删除】</a><a href=\"javascript:(" + record.id + ")\">【修改】</a>";
                        html = html + "                                        </td>";
                        html = html + "                                     </tr>";
                    }
                }
                $("#news_comment_div").html(html);
            }
        })

    }

    var getNewsRecordList=function () {
        var data = {};
        data.keywords = $("#record_query_setup #key_word").val();
        $.post("../../news_file_servlet_action?action=get_zxrd_record",data,function(json){
            console.log(JSON.stringify(json));
            if(json.result_code == 0){
                var list = json.aaData;
                var html ="";
                if (Identity == '管理员')
                {
                    if(list!=undefined && list.length>0){
                        for (var i = 0; i < list.length; i++){
                            var record = list[i];
                            html=html+"										<tr class=\"highlight\">";
                            html=html+"	                                        <td>";
                            html=html+"	                                            "+record.time;
                            html=html+"	                                        </td>";
                            html=html+"	                                        <td>";
                            html=html+"                                            "+record.title;
                            html=html+"                                        </td>";
                            html=html+"                                        <td>";
                            html=html+"                                           <a href=\"javascript:Page.onViewRecord("+record.id+")\">【详情】</a><a href=\"javascript:Page.onModifyNews("+record.id+")\">【修改】</a><a href=\"javascript:Page.onDeleteNews("+record.id+")\">【删除】</a>";
                            html=html+"                                        </td>";
                            html=html+"                                     </tr>";
                        }
                    }
                } else {
                    if(list!=undefined && list.length>0){
                        for (var i = 0; i < list.length; i++){
                            var record = list[i];
                            html=html+"										<tr class=\"highlight\">";
                            html=html+"	                                        <td>";
                            html=html+"	                                            "+record.time;
                            html=html+"	                                        </td>";
                            html=html+"	                                        <td>";
                            html=html+"                                            "+record.title;
                            html=html+"                                        </td>";
                            html=html+"                                        <td>";
                            html=html+"                                           <a href=\"javascript:Page.onViewRecord("+record.id+")\">【详情】</a>";
                            html=html+"                                        </td>";
                            html=html+"                                     </tr>";
                        }
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
                    if (Identity == '管理员'){
                        for (var i = 0; i < list.length; i++){
                            var record = list[i];
                            html=html+"										<tr class=\"highlight\">";
                            html=html+"	                                        <td>";
                            html=html+"	                                            "+record.time;
                            html=html+"	                                        </td>";
                            html=html+"	                                        <td>";
                            html=html+"                                            "+record.title;
                            html=html+"                                        </td>";
                            html=html+"                                        <td>";
                            html=html+"                                           <a href=\"javascript:Page.onViewRecord("+record.id+")\">【详情】</a><a href=\"javascript:Page.onModifyNews("+record.id+")\">【修改】</a><a href=\"javascript:Page.onDeleteNews("+record.id+")\">【删除】</a>";
                            html=html+"                                        </td>";
                            html=html+"                                     </tr>";
                        }
                    } else {
                        for (var i = 0; i < list.length; i++){
                            var record = list[i];
                            html=html+"										<tr class=\"highlight\">";
                            html=html+"	                                        <td>";
                            html=html+"	                                            "+record.time;
                            html=html+"	                                        </td>";
                            html=html+"	                                        <td>";
                            html=html+"                                            "+record.title;
                            html=html+"                                        </td>";
                            html=html+"                                        <td>";
                            html=html+"                                           <a href=\"javascript:Page.onViewRecord("+record.id+")\">【详情】</a>";
                            html=html+"                                        </td>";
                            html=html+"                                     </tr>";
                        }
                    }
                }
                $("#cjxw_news_content_div").html(html);
            }
        });
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
                    if (Identity == '管理员'){
                        for (var i = 0; i < list.length; i++){
                            var record = list[i];
                            html=html+"										<tr class=\"highlight\">";
                            html=html+"	                                        <td>";
                            html=html+"	                                            "+record.time;
                            html=html+"	                                        </td>";
                            html=html+"	                                        <td>";
                            html=html+"                                            "+record.title;
                            html=html+"                                        </td>";
                            html=html+"                                        <td>";
                            html=html+"                                            <a href=\"javascript:Page.onViewRecord("+record.id+")\">【详情】</a><a href=\"javascript:Page.onModifyNews("+record.id+")\">【修改】</a><a href=\"javascript:Page.onDeleteNews("+record.id+")\">【删除】</a>";
                            html=html+"                                        </td>";
                            html=html+"                                     </tr>";
                        }
                    } else {
                        for (var i = 0; i < list.length; i++){
                            var record = list[i];
                            html=html+"										<tr class=\"highlight\">";
                            html=html+"	                                        <td>";
                            html=html+"	                                            "+record.time;
                            html=html+"	                                        </td>";
                            html=html+"	                                        <td>";
                            html=html+"                                            "+record.title;
                            html=html+"                                        </td>";
                            html=html+"                                        <td>";
                            html=html+"                                            <a href=\"javascript:Page.onViewRecord("+record.id+")\">【详情】</a>";
                            html=html+"                                        </td>";
                            html=html+"                                     </tr>";
                        }
                    }
                }
                $("#gjxw_news_content_div").html(html);
            }
        });
    }

    var onViewRecord=function (id) {
        window.location.href="news_content.jsp?id="+id;
    };

    var onModifyNews=function (id) {
        window.location.href="modify_news.jsp?id="+id;
    }

     var initNewsModifyView=function () {
         var id=window.location.href.split("?")[1].split("=")[1];
         var url = "../../news_file_servlet_action";
         var data = {};
         data.id = id;
         data.action = "modify_news_content";
         $.post(url,data,function (json) {
             console.log(JSON.stringify(json));
             if (json.result_code == 0){
                 //var news_time = json.news_time;
                 var news_title = json.news_title;
                 var news_content = json.news_content;
                 var news_writer = json.news_writer;

                 $("#modify_news_title").val(news_title);
                 //$("#content_release_time").html(news_time);
                 $("#modify_news_content").val(news_content);
                 $("#modify_news_writer").val(news_writer);
             } else {
                 alert("[getNewsContent]与后端交互发生错误！！"+json.result_msg);
             }
         });
     }

    var initNewsModifyControlEvent=function () {
        $("#cancel_modify_button").click(function () {onCancelButton();});
        $("#modify_news_button").click(function () {onModifyNewsSubmitButton();});
    }

    var initContentView=function () {
        var id=window.location.href.split("?")[1].split("=")[1];
        //console.log(id);
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
        // var Identity = $("#const_identity1").val();
        // var Identity = sessionStorage.getItem("identity");
        console.log("这是用户权限："+Identity);
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

    var onDeleteNews=function (id) {
        var url = "../../news_file_servlet_action";
        var data = {};
        data.action = "delete_news_record";
        data.news_ID = id;
        $.post(url,data,function (json) {
            console.log(JSON.stringify(json));
            if(json.result_code == 0){
                alert("已经删除该条新闻！");
                window.location.reload();
            }
            else {
                alert("删除该条新闻失败！");
                window.location.reload();
            }
        });
    };

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

    var onSubmitNewsInfo=function () {
        var url = "../../news_getdata_servlet_action";
        var data = {};
        data.action = "insert_news_info";
        data.writer = $("#news_writer").val();
        data.title = $("#news_title").val();
        data.news_content = $("#insert_news_content").val();
        $.post(url,data,function (json) {
            console.log(JSON.stringify(json));
            if(json.result_code==0){
                alert("发表新闻成功！");
                window.location.href="news.jsp";
                //window.location.href="news_content.jsp?id="+id;
            }else {
                alert("发表新闻失败！");
                window.location.href="news.jsp";
                //window.location.href="news_content.jsp?id="+id;
            }
        });
    }

    var onModifyNewsSubmitButton=function () {
        var id=window.location.href.split("?")[1].split("=")[1];
        var url = "../../news_file_servlet_action";
        var data = {};
        data.action = "modify_news_submit";
        data.id = id;
        data.writer = $("#modify_news_writer").val();
        data.title = $("#modify_news_title").val();
        data.news_content = $("#modify_news_content").val();
        $.post(url,data,function (json) {
            console.log(JSON.stringify(json));
            if(json.result_code==0){
                alert("修改新闻成功！");
                window.location.href="news.jsp";
                //window.location.href="news_content.jsp?id="+id;
            }else {
                alert("修改新闻失败！");
                window.location.href="news.jsp";
                //window.location.href="news_content.jsp?id="+id;
            }
        });
    }

    var onCancelButton=function () {
        window.location.href="news.jsp";
    }

    var onSearchRecord=function () {
        initNewsRecordList();
    }

    var onExportNewsRecord=function () {
        var url = "../../news_file_servlet_action";
        var data = {"action":"export_news_record"};
        $.post(url,data,function (json) {
            if(json.result_code==0){
                console.log(JSON.stringify(json));
                $("#record_download_div #download_url").attr("href",json.download_url);
                $("#record_download_div").modal("show");
            }else{
                alert("[onExportRecord]与后端交互错误！"+json.result_msg);
            }
        })
    }

    var onAddNewsButton=function () {
        window.location.href="insert_news.jsp";
    }

    var onNewsPrintButton=function () {
        window.open("news_list_print.jsp");
    }

    var onNewsStatisticButton=function () {
        window.location.href = "news_statistic.jsp";
    }

    var onShowCommentsButton=function () {
        window.location.href="../comments/comment_list.jsp";
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
        },
        onDeleteNews:function (id) {
            onDeleteNews(id);
        },
        onModifyNews:function (id) {
            onModifyNews(id);
        }
    }
}();