<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<!--
Template Name: Metronic - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.5
Version: 4.1.0
Author: KeenThemes
Website: http://www.keenthemes.com/
Contact: support@keenthemes.com
Follow: www.twitter.com/keenthemes
Like: www.facebook.com/keenthemes
Purchase: http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes
License: You must have a valid license purchased only from themeforest(the above link) in order to legally use the theme for your project.
-->
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
    <meta charset="utf-8"/>
    <title>金融数据分析及模拟交易平台</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <meta content="" name="description"/>
    <meta content="" name="author"/>
    <%@include file="../../home/frame/frame_style.jsp"%>
    <link rel="shortcut icon" href="../../home/advice/favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="../../home/advice/dataTables.bootstrap.css" />

</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<!-- DOC: Apply "page-header-fixed-mobile" and "page-footer-fixed-mobile" class to body element to force fixed header or footer in mobile devices -->
<!-- DOC: Apply "page-sidebar-closed" class to the body and "page-sidebar-menu-closed" class to the sidebar menu element to hide the sidebar by default -->
<!-- DOC: Apply "page-sidebar-hide" class to the body to make the sidebar completely hidden on toggle -->
<!-- DOC: Apply "page-sidebar-closed-hide-logo" class to the body element to make the logo hidden on sidebar toggle -->
<!-- DOC: Apply "page-sidebar-hide" class to body element to completely hide the sidebar on sidebar toggle -->
<!-- DOC: Apply "page-sidebar-fixed" class to have fixed sidebar -->
<!-- DOC: Apply "page-footer-fixed" class to the body element to have fixed footer -->
<!-- DOC: Apply "page-sidebar-reversed" class to put the sidebar on the right side -->
<!-- DOC: Apply "page-full-width" class to the body element to have full width page without the sidebar menu -->
<body class="page-header-fixed page-quick-sidebar-over-content page-full-width page-boxed">
<%@include file="../../home/frame/frame_header.jsp"%>
<div class="clearfix">
</div>
<!-- BEGIN CONTAINER -->
<div class="page-container">
    <%@include file="../../home/frame/frame_left_sidebar.jsp"%>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">
            <!-- BEGIN 主页面头 -->
            <%@include file="../../home/frame/frame_page_header.jsp"%>
            <!-- END 主页面头 -->
            <h3 class="page-title">
                用户建议管理<small>用户建议列表</small>
            </h3>
            <div class="page-bar">
                <ul class="page-breadcrumb">
                    <li>
                        <i class="fa fa-home"></i>
                        <a href="../main/index.jsp">首页</a>
                        <i class="fa fa-angle-right"></i>
                    </li>
                    <li>
                        <a href="../../home/advice/advice_list.jsp">用户建议</a>
                    </li>
                </ul>

            </div>
            <!-- END PAGE HEADER-->
            <!-- BEGIN PAGE CONTENT col-md-offset-1 -->
            <div class="row">
                <div class="col-md-3 ">
                    <%--                    如果不将type类型定义为buton的话会被默认为submit类型--%>
                    <button type="button"  class="btn btn-circle btn-lg yellow-crusta" id="add_button" name="add_button">
                        <i class="fa fa-plus"></i> 新增</button>
                    <button type="button"  class="btn btn-circle btn-lg default" id="export_button" name="export_button">
                        <i class="fa fa-cloud-download"></i> 导出</button>
                    <button type="button" class="btn btn-circle btn-lg green" id="table_print_button" name="table_print_button">
                        <i class="fa fa-print"></i> 打印</button>
                    <button type="button" class="btn btn-circle btn-lg blue" id="statistic_button" name="statistic_button">
                        <i class="icon-bar-chart"></i> 统计</button>
                </div>
                <div class="col-md-8">
                    <div class="portlet-body form" id="record_query_setup" name="record_query_setup">
                        <form class="form-horizontal" role="form">
                            <div class="form-body">
                                <div class="form-group">
                                    <label class="col-md-2  control-label">关键字</label>
                                    <div class="col-md-3">
                                        <input type="text" class="form-control input-circle" placeholder="请输入内容关键字" id="keyword" name="keyword">
                                    </div>
                                    <div class="col-md-3">
                                        <button type="button"   class="btn blue" id="query_button" name="query_button">
                                            <i class="fa fa-search"></i>搜索</button>
                                        <button type="button"   class="btn default" id="remake_button" name="remake_button">
                                            <i class="fa fa-refresh"></i>重置</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-md-1">
                    <button type="button" style="float: right"  class="btn default" id="refresh_button" name="refresh_button">
                        <i class="fa fa-refresh"></i></button>
                </div>
            </div>
            <div class="row">
<%--                这里--%>
            </div>
            <br>
            <div class="clearfix">
                <div class="row" id="advice_bar" name="advice_bar">
                    <div class="col-md-6 col-sm-6">
                        <!-- BEGIN PORTLET-->
                        <div class="portlet light ">
                            <div class="portlet-title">
                                <div class="caption">
                                    <i class="icon-bubble font-red-sunglo"></i>
                                    <span class="caption-subject font-red-sunglo bold uppercase">建议</span>
                                </div>
                                <div class="actions">
                                    <a href="javascript:;" class="btn btn-circle blue-madison btn-sm">
                                        <i class="fa fa-plus"></i> Modify </a>
                                    <a href="javascript:;" class="btn btn-circle yellow-casablanca btn-sm">
                                        <i class="fa fa-reply"></i> Reply </a>
                                    <a href="javascript:;"class="btn btn-circle red-sunglo btn-sm">
                                        <i class="fa fa-fa-minus"></i> Delete </a>
                                    </button>
                                        <a class="btn btn-circle btn-icon-only btn-default fullscreen" href="javascript:;" data-original-title="" title="">
                                        </a>
                                </div>
                            </div>
                            <div class="portlet-body" id="chats">
                                <div class="scroller" style="height: 341px;" data-always-visible="1" data-rail-visible1="1">
                                    <ul class="chats">
                                        <li class="in">
                                            <img class="avatar" alt="" src="../../assets/admin/layout/img/avatar1.jpg"/>
                                            <div class="message">
											<span class="arrow">
											</span>
                                                <a href="javascript:;" class="name">
                                                    用户姓名 </a>
                                                <span class="datetime">
											at 20:09 </span>
                                                <span class="body">
											这是建议 </span>
                                            </div>
                                        <li class="out">
                                            <img class="avatar" alt="" src="../../assets/admin/layout/img/avatar2.jpg"/>
                                            <div class="message">
											<span class="arrow">
											</span>
                                                <a href="javascript:;" class="name">
                                                    回复人姓名 </a>
                                                <span class="datetime">
											at 20:11 </span>
                                                <span class="body">
											这是回复 </span>
                                            </div>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <!-- END PORTLET-->
                    </div>
                </div>
            </div>
        </div>
                </div>
            </div>
            <!-- END PAGE CONTENT-->
        </div>
    </div>
    <!-- END CONTENT -->

</div>
<input type="hidden" id="page_id" name="page_id" value="advice_list">
<!-- END CONTAINER -->
<!-- BEGIN FOOTER -->
<%@include file="../../home/frame/frame_footer.jsp"%>
<!-- END FOOTER -->

<%@include file="../../home/frame/frame_javascript.jsp"%>
<script type="text/javascript" src="../../home/advice/jquery.dataTables.min.js"></script>
<script src="../../home/advice/advice.js" type="text/javascript"></script>
</body>
<!-- END BODY -->

</html>
<%@include file="../../home/advice/advice_modify_div.jsp"%>
<%@include file="../../home/advice/advice_add_div.jsp"%>
<%@include file="../../home/advice/advice_download_div.jsp"%>
<%@include file="../../home/advice/advice_reply_div.jsp"%>