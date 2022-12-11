<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2022/11/6
  Time: 20:47
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>News</title>

    <%@include file="../../home/frame/frame_style.jsp"%>

</head>
<%--<body class="page-header-fixed page-quick-sidebar-over-content page-full-width page-boxed">--%>
<body class="page-header-fixed page-quick-sidebar-over-content page-full-width page-boxed">

<%@include file="../../home/frame/frame_header.jsp"%>
<div class="clearfix">
</div>

<div class="page-container">
    <%@include file="../../home/frame/frame_left_sidebar.jsp"%>

    <div class="page-content-wrapper">
        <div class="page-content">
            <%@include file="../../home/frame/frame_page_header.jsp"%>
<!-- BEGIN PAGE HEADER-->
<h3 class="page-title" style="padding-top: 20px; padding-left: 30px">财经新闻
</h3>
<div class="page-bar" >
    <ul class="page-breadcrumb">
        <li>
            <i class="fa fa-home"></i>
            <a href="../../home/main/index.jsp">首页</a>
            <i class="fa fa-angle-right"></i>
        </li>
        <li>
            <a href="news.jsp">返回</a>
<%--            <i class="fa fa-angle-right"></i>--%>
        </li>

    </ul>
</div>
<!-- END PAGE HEADER-->

<!-- BEGIN PAGE CONTENT
<div class="portlet light" style="background-color: rgb(241,243,250); padding-left: 80px"> -->
    <div class="portlet light" style="background-color: rgb(241,243,250);padding-left: 150px">
        <div class="portlet-body">
            <div class="row">
                <div class="col-md-12 news-page blog-page">
                    <div class="row">
                        <div class="col-md-9 blog-tag-data">
                            <div type="text" id="content_news_title" style="font-weight: bold; font-size: xx-large"></div>
                            <img src="../../assets/admin/pages/media/gallery/item_img1.jpg" class="img-responsive" alt="">
                            <div class="row">
                                <div class="col-md-6">
                                    <ul class="list-inline blog-tags">
                                        <li>
                                            <i class="fa fa-tags"></i>
                                            <label></label>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-md-6 blog-tag-data-inner">
                                    <ul class="list-inline">
                                        <li>
                                            <i class="fa fa-calendar"></i>
                                            <label>
                                                发布时间：</label>
                                            <div type="text" id="content_release_time"></div>
                                        </li>
                                        <li>
                                            <i class="fa fa-comments"></i>
                                            <a href="javascript:;">
                                                </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <br>
                            <div class="news-item-page">
                                <!-- 显示新闻内容  -->
                                <div type="text" id="content_news_content" style="font-size: larger"></div>

                            </div>

                            <hr>
                            <div class="media">
                                <h3>评论区</h3>

                                <div class="media-body" id="news_comment" name="news_comment">

                                </div>
                            </div>
                            <br>
                            <div class="post-comment" id="comment_add_div" name="comment_add_div">
                                <h3>发表评论</h3>
                                <form role="form" action="#">
                                <!--    <div class="form-group">
                                        <label class="control-label">用户名<span class="required">
													* </span>
                                        </label>
                                        <input type="text" class="form-control" id="user_name" name="user_name">
                                    </div>
-->
                                    <div class="form-group">
                                        <label class="control-label">评论内容<span class="required">
													* </span>
                                        </label>
                                        <textarea class="col-md-10 form-control" rows="8" id="comment_detail" name="comment_detail"></textarea>
                                    </div>
                                    <button class="margin-top-20 btn blue" type="button" id="comment_submit" name="comment_submit">提交评论</button>
                                </form>

                            </div>

                            <!--导入打印导出结束 -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<!-- END PAGE CONTENT-->
<!-- END CONTENT -->
        </div>
    </div>
</div>
<%@include file="../../home/frame/frame_footer.jsp"%>
<%@include file="../../home/frame/frame_javascript.jsp"%>

<script src="news_list.js" type="text/javascript"></script>

</body>

<input type="hidden" id="page_id" name="page_id" value="content_view">
</html>
<%@include file="add_reply_div.jsp"%>