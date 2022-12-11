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
<%--<body class="page-header-fixed page-quick-sidebar-over-content ">--%>
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
            <a href="news.jsp">返回</a>
<%--            <i class="fa fa-angle-right"></i>--%>
        </li>

    </ul>
</div>
<!-- 返回首页结束 -->

        <button type="button" class="btn btn-circle default blue-stripe btn-lg" id="add_news_button" name="add_news_button">发表文章
            <i class="fa fa-plus"></i>
        </button>
        <button type="button" class="btn btn-circle default red-stripe btn-lg" id="export_button" name="export_button">导出
            <i class="fa fa-calendar"></i>
        </button>
        <button type="button" class="btn btn-circle default green-stripe btn-lg" id="news_print_button" name="news_print_button">打印
            <i class="fa fa-file-o"></i>
        </button>
        <button type="button" class="btn btn-circle default yellow-stripe btn-lg" id="statistics_button" name="statistics_button">统计
            <i class="fa fa-bar-chart-o"></i>
        </button>

        <button type="button" class="btn btn-circle default blue-stripe btn-lg" id="show_comments" name="show_comments" style="visibility: hidden;">评论管理
            <i class="fa fa-envelope"></i>
        </button>

        <!-- 搜索新闻内容 开始 -->
<div class="row">
    <div class="col-md-12" id="record_query_setup" name="record_query_setup">
<%--        <div class="portlet-body form" >--%>
<%--            <form class="form-horizontal" role="form">--%>
<%--                <div class="form-body">--%>
<%--                    <div class="form-group">--%>
<%--                        <label class="col-md-3 control-label">关键字</label>--%>
                        <div class="col-md-12" style="margin: 20px;">
<%--                            <span style="margin-right: 10px">--%>
                                <input type="text" style="padding: 5px;margin-top: 10px;width: 250px;box-shadow: 0px 0px 1px 1px dimgrey;" id="key_word" name="key_word"">
<%--                            </span>--%>
<%--                            <span>--%>
                                <button type="button" class="btn btn-circle btn-primary grey-cascade" style="margin-left: 20px;" id="search_button" name="search_button">搜索
                                <i class="fa fa-search"></i>
                                </button>
<%--                            </span>--%>
                            <!-- 头部导航 开始-->
<%--                            <div class="row">--%>
                                <div style="float: right;">
                                    <button type="button" class="btn btn-circle btn-info bg-red-flamingo" id="zxrd_button" name="datatable_button">最新热点
                                        <i class="fa fa-link"></i>
                                    </button>
                                    <button type="button" class="btn btn-circle btn-info bg-yellow-lemon" id="cjxw_button" name="table_button">财经新闻
                                        <i class="fa fa-link"></i>
                                    </button>
                                    <button type="button" class="btn btn-circle btn-info bg-blue-steel" id="gjxw_button" name="bar_button">国际新闻
                                        <i class="fa fa-link"></i>
                                    </button>
                                </div>
<%--                            </div>--%>
                            <!-- 头部导航 结束-->
                        </div>

<%--                </div>--%>
<%--            </form>--%>
<%--        </div>--%>
    </div>
</div>
<!--搜索新闻内容 结束 -->

<div id="body_div" name="body_div">
<%--    <!-- 头部导航 开始-->--%>

<%--    <div class="row">--%>
<%--        <div class="col-md-6">--%>
<%--            <button type="button" class="btn btn-circle btn-info default"  style="margin-left: 70px" id="zxrd_button" name="datatable_button">最新热点--%>
<%--                <i class="fa fa-link"></i>--%>
<%--            </button>--%>
<%--            <button type="button" class="btn btn-circle btn-info default" style="margin-left: 70px" id="cjxw_button" name="table_button">财经新闻--%>
<%--                <i class="fa fa-link"></i>--%>
<%--            </button>--%>
<%--            <button type="button" class="btn btn-circle btn-info default" style="margin-left: 70px" id="gjxw_button" name="bar_button">国际新闻--%>
<%--                <i class="fa fa-link"></i>--%>
<%--            </button>--%>
<%--        </div>--%>
<%--    </div>--%>
<%--    <!-- 头部导航 结束-->--%>

    <!-- 最新热点显示开始 -->
    <div class="portlet-body" id="zxrd_tab">
        <div class="table-scrollable">
            <table class="table table-bordered table-hover">
                <thead>
                <tr style="background-color: rgba(255,234,232,0.63)">
                    <th style="text-align: center; color: #664E74">
                        发布日期
                    </th>
                    <th style="text-align: center; color: #664E74">
                        标题
                    </th>
                    <th style="text-align: center; color: #664E74">
                        操作
                    </th>
                </tr>
                </thead>
                <tbody id="zxrd_news_content_div" name="zxrd_news_content_div">
                <!--
                                <tr>
                    <th style="text-align: center;font-size: 18px;font-weight: 400">
                        2022年11月8日
                    </th>
                    <th style="text-align: center;font-size: 18px;font-weight: 400 ">
                        外储规模回升：10月末为30524亿美元，保持总体稳定
                    </th>
                    <th style="text-align: center;font-size: 18px;font-weight: 400">
                        <a href="news_content.jsp">查看详情</a>
                    </th>
                </tr>
                -->
                </tbody>
            </table>
        </div>
    </div>
    <!-- ===============最新热点显示结束=============== -->
    <!-- ===============财经新闻显示开始=============== -->
    <div class="portlet-body display-none" id="cjxw_tab">
        <div class="table-scrollable">
            <table class="table table-bordered table-hover">
                <thead>
                <tr class="warning">
                    <th style="text-align: center; color: #664E74">
                        发布日期
                    </th>
                    <th style="text-align: center; color: #664E74">
                        标题
                    </th>
                    <th style="text-align: center; color: #664E74">
                        操作
                    </th>
                </tr>
                </thead>
                <tbody id="cjxw_news_content_div" name="cjxw_news_content_div">
                <!--
                 <tr>
                    <th style="text-align: center;font-size: 18px;font-weight: 400">
                        2022年11月9日
                    </th>
                    <th style="text-align: center;font-size: 18px;font-weight: 400 ">
                        亿元"乌龙指"真相曝光！中金所盘后披露原因
                    </th>
                    <th style="text-align: center;font-size: 18px;font-weight: 400">
                        <a href="news_content.jsp">查看详情</a>
                    </th>
                </tr>
                 -->
                </tbody>
            </table>
        </div>
    </div>
    <!-- ===============财经新闻显示结束=============== -->
    <!-- ===============国际新闻显示开始=============== -->
    <div class="portlet-body display-none" id="gjxw_tab">
        <div class="table-scrollable">
            <table class="table table-bordered table-hover">
                <thead>
                <tr style="background-color: rgba(229,243,255,0.63);">
                    <th style="text-align: center; color: #664E74">
                        发布日期
                    </th>
                    <th style="text-align: center; color: #664E74">
                        标题
                    </th>
                    <th style="text-align: center; color: #664E74">
                        操作
                    </th>
                </tr>
                </thead>
                <tbody id="gjxw_news_content_div" name="gjxw_news_content_div">
                <!--
                <tr>
                    <th style="text-align: center;font-size: 18px;font-weight: 400">
                        2022年11月10日
                    </th>
                    <th style="text-align: center;font-size: 18px;font-weight: 400 ">
                        或超167亿美元！美国迎来史上“最烧钱”中期选举
                    </th>
                    <th style="text-align: center;font-size: 18px;font-weight: 400">
                        <a href="news_content.jsp">查看详情</a>
                    </th>
                </tr>
                 -->
                </tbody>
            </table>
        </div>
    </div>
    <!-- 国际新闻显示结束 -->
</div>
    </div>
</div>
</div>
<%@include file="../../home/frame/frame_footer.jsp"%>
<%@include file="../../home/frame/frame_javascript.jsp"%>

<script src="news_list.js" type="text/javascript"></script>

</body>
<input type="hidden" id="page_id" name="page_id" value="news_list">
</html>

<%@include file="device_download_div.jsp"%>