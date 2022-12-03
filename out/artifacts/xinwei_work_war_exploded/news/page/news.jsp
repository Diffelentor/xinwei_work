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

    <%@include file="frame_style.jsp"%>

</head>
<body class="page-header-fixed page-quick-sidebar-over-content ">
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
<%--<%@include file="../../home/frame/frame_left_sidebar.jsp"%>--%>

<!-- 这里插入广告开始 -->
<%--<div class="note note-success">--%>
<%--    <div>--%>
<%--        <a><img src="../../assets/admin/layout7/img/07.jpg" alt="" style="height: 100px; width: 100%"></a>--%>
<%--    </div>--%>
<%--    <p>广告字段</p>--%>
<%--</div>--%>
<!-- 这里插入广告结束 -->
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
            <i class="fa fa-angle-right"></i>
        </li>
        <li>
            <a href="#">News View</a>
        </li>
    </ul>
</div>
<!-- 返回首页结束 -->
<!-- 搜索新闻内容 开始 -->
<div class="row">
    <div class="col-md-6">
        <div class="portlet-body form" id="record_query_setup" name="record_query_setup">
            <form class="form-horizontal" role="form">
                <div class="form-body">
                    <div class="form-group">
                        <label class="col-md-3 control-label">关键字</label>
                        <div class="col-md-9">
                            <span style="margin-right: 10px">
                                <input type="text" style="padding: 5px" id="key_word" name="key_word">
                            </span>
                            <span>
                                <button type="button" class="btn btn-info" id="search_button" name="search_button">搜索</button>
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
<!--
 <ul class="nav nav-tabs">
        <li class="active" style="margin-left: 100px">
            <a href="#tab_1_1" data-toggle="tab">最新热点</a>
        </li>
        <li style="margin-left: 100px">
            <a href="#tab_1_2" data-toggle="tab">财经新闻</a>
        </li>
        <li style="margin-left: 100px">
            <a href="#tab_1_3" data-toggle="tab">国际新闻</a>
        </li>
    </ul>
 -->
    <div class="row">
        <div class="col-md-6">
            <button type="button" class="btn btn-info"  style="margin-left: 70px" id="zxrd_button" name="datatable_button">最新热点</button>
            <button type="button" class="btn btn-info" style="margin-left: 70px" id="cjxw_button" name="table_button">财经新闻</button>
            <button type="button" class="btn btn-info" style="margin-left: 70px" id="gjxw_button" name="bar_button">国际新闻</button>
        </div>
    </div>
    <!-- 头部导航 结束-->

    <!-- 最新热点显示开始 -->
    <div class="portlet-body" id="zxrd_tab">
        <div class="table-scrollable">
            <table class="table table-bordered table-hover">
                <thead>
                <tr >
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
                <tr >
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
                <tr >
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
<%@include file="frame_javascript.jsp"%>

<script src="news_list.js" type="text/javascript"></script>

</body>
<input type="hidden" id="page_id" name="page_id" value="news_list">
</html>
