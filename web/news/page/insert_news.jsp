<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2022/11/8
  Time: 20:50
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>发表文章</title>
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
            <h3 class="page-title">
                导入新闻
            </h3>

            <!--  返回首页  -->
            <div class="page-bar" >
                <ul class="page-breadcrumb">
                    <li>
                        <i class="fa fa-home"></i>
                        <a href="../../index.jsp">首页</a>
                        <i class="fa fa-angle-right"></i>
                    </li>
                    <li>
                        <a href="news.jsp">返回</a>
<%--                        <i class="fa fa-angle-right"></i>--%>
                    </li>
                </ul>
            </div>
            <!-- 返回首页结束 -->
<div>
    <div class="portlet light bg-inverse">
        <div class="portlet-body form">
            <!-- BEGIN FORM -->
            <form action="#" class="form-horizontal">
                <div class="form-body" style="margin-left: -150px">
                    <div class="form-group">
                        <label class="col-md-3 control-label">作者<span class="required">
													* </span>
                        </label>
                        <div class="col-md-4">
                            <input type="text" class="form-control" style="width: 600px" id="news_writer" name="news_writer">
                            <span class="help-block">
														请输入作者名 </span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">新闻标题<span class="required">
													* </span>
                        </label>
                        <div class="col-md-4">
                            <input type="text" class="form-control" style="width: 750px" id="news_title" name="news_title">
                            <span class="help-block">
														请输入标题名 </span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">新闻内容<span class="required">
													* </span>
                        </label>
                        <div class="col-md-4">
<%--                            <input type="text" style="height: 300px; width: 800px">--%>
                            <textarea class="col-md-10 form-control" style="width: 900px" rows="40" id="insert_news_content" name="insert_news_content"></textarea>

                            <span class="help-block">
														请编辑内容 </span>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <div class="row">
                        <div class="col-md-offset-3 col-md-4">
                            <button type="button" class="btn green" id="news_import" name="news_import">提交</button>
                            <button type="button" class="btn default" id="cancel_button" name="cancel_button">取消并返回首页</button>
                        </div>
                    </div>
                </div>
            </form>
            <!-- END FORM-->
        </div>
    </div>
</div>
        </div>
    </div>
</div>

<%@include file="../../home/frame/frame_footer.jsp"%>
<%@include file="../../home/frame/frame_javascript.jsp"%>

<script src="news_list.js" type="text/javascript"></script>
</body>

<input type="hidden" id="page_id" name="page_id" value="insert_news">

</html>
