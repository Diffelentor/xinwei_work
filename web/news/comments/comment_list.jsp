<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2022/11/6
  Time: 12:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>财经新闻</title>

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
            财经新闻
        </h3>

<div class="page-bar" >
    <ul class="page-breadcrumb">
        <li>
            <i class="fa fa-home"></i>
            <a href="../../home/main/index.jsp">首页</a>
            <i class="fa fa-angle-right"></i>
        </li>
        <li>
            <a href="../page/news.jsp">返回</a>
<%--            <i class="fa fa-angle-right"></i>--%>
        </li>
    </ul>
</div>
<!-- 返回首页结束 -->
<div >
    <button type="button" class="btn btn-circle default purple-stripe btn-lg" id="print_comment_button" name="print_comment_button">打印
        <i class="fa fa-file-o"></i>
    </button>
    <button type="button" class="btn btn-circle default purple-stripe btn-lg" id="export_button" name="export_button">导出
        <i class="fa fa-calendar"></i>
    </button>
    <button type="button" class="btn btn-circle default purple-stripe btn-lg" id="statistics_button" name="statistics_button">统计
        <i class="fa fa-bar-chart-o"></i>
    </button>

</div>
        <!-- 搜索新闻内容 开始 -->
<div class="row">
    <div class="col-md-6">
        <div class="portlet-body form" id="comment_query_setup" name="comment_query_setup">
            <form class="form-horizontal" role="form">
                <div class="form-body">
                    <div class="form-group">
<%--                        <label class="col-md-3 control-label">关键字</label>--%>
                        <div class="col-md-9">
                            <span style="margin-right: 10px">
                                <input type="text" style="padding: 5px;margin-top: 10px;width: 250px" id="key_word" name="key_word">
                            </span>
                            <span>
                                <button type="button" class="btn btn-circle btn-primary grey-cascade" id="search_button" name="search_button">搜索
                                <i class="fa fa-search"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<!--搜索新闻内容 结束 -->

<div id="body_div" name="body_div">
    <!-- 头部导航 开始-->

    <!-- 头部导航 结束-->

    <!-- 评论列表显示开始 -->
    <div class="portlet-body">
        <div class="table-scrollable">
            <table class="table table-bordered table-hover">
                <thead>
                <tr style="background-color: rgba(179,189,190,0.63)">
                    <th>
                        #
                    </th>
                    <th>
                        发布者
                    </th>
                    <th>
                        评论内容
                    </th>
                    <th>
                        发布时间
                    </th>
                    <th>
                        操作
                    </th>
                </tr>
                </thead>
                <tbody id="news_comment_div">

                </tbody>
            </table>
        </div>
    </div>
    <!-- ===============评论列表显示开始=============== -->

</div>
    </div>
</div>
</div>
<%@include file="../../home/frame/frame_footer.jsp"%>
<%@include file="../../home/frame/frame_javascript.jsp"%>

<script src="comment_list.js" type="text/javascript"></script>

</body>
<input type="hidden" id="page_id" name="page_id" value="comments_list">
</html>

<%@include file="comment_download_div.jsp"%>
<%@include file="comment_modify_div.jsp"%>