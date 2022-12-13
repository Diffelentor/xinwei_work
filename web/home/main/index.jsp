<%--
  Created by IntelliJ IDEA.
  User: Diffelentor
  Date: 2022/10/17
  Time: 19:08
  To change this template use File | Settings | File Templates.
--%>
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
    <title>管理系统</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <meta content="" name="description"/>
    <meta content="" name="author"/>
    <%@include file="../../home/frame/frame_style.jsp"%>
    <link rel="shortcut icon" href="favicon.ico"/>
    <!-- BEGIN PAGE LEVEL PLUGIN STYLES -->
    <link href="../../assets/global/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css" rel="stylesheet" type="text/css"/>
    <link href="../../assets/global/plugins/fullcalendar/fullcalendar.min.css" rel="stylesheet" type="text/css"/>
    <link href="../../assets/global/plugins/jqvmap/jqvmap/jqvmap.css" rel="stylesheet" type="text/css"/>

    <!-- END PAGE LEVEL PLUGIN STYLES -->
    <!-- BEGIN PAGE STYLES -->
    <link href="../../assets/admin/pages/css/tasks.css" rel="stylesheet" type="text/css"/>
    <!-- END THEME STYLES -->

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
<body class="page-quick-sidebar-over-content page-full-width page-boxed page-header-fixed">

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
                首页
            </h3>
            <div class="page-bar">
                <ul class="page-breadcrumb">
                    <li>
                        <i class="fa fa-home"></i>
                        <a href="index.jsp">Home</a>
                        <i class="fa fa-angle-right"></i>
                    </li>
                </ul>

            </div>
            <!-- END PAGE HEADER-->
            <input type="hidden" id="page_id" name="page_id" value="dash_board">
            <!-- BEGIN PAGE CONTENT-->
            <div class="tiles">
                <div class="tile double-down bg-blue-hoki">
                    <div class="tile-body">
                        <i class="fa fa-bell-o"></i>
                    </div>
                    <div class="tile-object">
                        <div class="name">
                            Notifications
                        </div>
                        <div class="number">
                            6
                        </div>
                    </div>
                </div>
                <div class="tile bg-red-sunglo">
                    <div class="tile-body">
                        <i class="fa fa-calendar"></i>
                    </div>
                    <div class="tile-object">
                        <div class="name">
                            Meetings
                        </div>
                        <div class="number">
                            12
                        </div>
                    </div>
                </div>
                <div class="tile double selected bg-green-turquoise">
                    <div class="corner">
                    </div>
                    <div class="check">
                    </div>
                    <div class="tile-body">
                        <h4>support@metronic.com</h4>
                        <p>
                            Re: Metronic v1.2 - Project Update!
                        </p>
                        <p>
                            24 March 2013 12.30PM confirmed for the project plan update meeting...
                        </p>
                    </div>
                    <div class="tile-object">
                        <div class="name">
                            <i class="fa fa-envelope"></i>
                        </div>
                        <div class="number">
                            14
                        </div>
                    </div>
                </div>
                <div class="tile selected bg-yellow-saffron">
                    <div class="corner">
                    </div>
                    <div class="tile-body">
                        <i class="fa fa-user"></i>
                    </div>
                    <div class="tile-object">
                        <div class="name">
                            Members
                        </div>
                        <div class="number">
                            452
                        </div>
                    </div>
                </div>
                <div class="tile double bg-blue-madison">
                    <div class="tile-body">
                        <img src="../../assets/admin/pages/media/profile/photo1.jpg" alt="">
                        <h4>Announcements</h4>
                        <p>
                            Easily style icon color, size, shadow, and anything that's possible with CSS.
                        </p>
                    </div>
                    <div class="tile-object">
                        <div class="name">
                            Bob Nilson
                        </div>
                        <div class="number">
                            24 Jan 2013
                        </div>
                    </div>
                </div>
                <div class="tile bg-purple-studio">
                    <div class="tile-body">
                        <i class="fa fa-shopping-cart"></i>
                    </div>
                    <div class="tile-object">
                        <div class="name">
                            Orders
                        </div>
                        <div class="number">
                            121
                        </div>
                    </div>
                </div>
                <div class="tile image selected">
                    <div class="tile-body">
                        <img src="../../assets/admin/pages/media/gallery/image2.jpg" alt="">
                    </div>
                    <div class="tile-object">
                        <div class="name">
                            Media
                        </div>
                    </div>
                </div>
                <div class="tile bg-green-meadow">
                    <div class="tile-body">
                        <i class="fa fa-comments"></i>
                    </div>
                    <div class="tile-object">
                        <div class="name">
                            Feedback
                        </div>
                        <div class="number">
                            12
                        </div>
                    </div>
                </div>
                <div class="tile double bg-grey-cascade">
                    <div class="tile-body">
                        <img src="../../assets/admin/pages/media/profile/photo2.jpg" alt="" class="pull-right">
                        <h3>@lisa_wong</h3>
                        <p>
                            I really love this theme. I look forward to check the next release!
                        </p>
                    </div>
                    <div class="tile-object">
                        <div class="name">
                            <i class="fa fa-twitter"></i>
                        </div>
                        <div class="number">
                            10:45PM, 23 Jan
                        </div>
                    </div>
                </div>
                <div class="tile bg-red-intense">
                    <div class="tile-body">
                        <i class="fa fa-coffee"></i>
                    </div>
                    <div class="tile-object">
                        <div class="name">
                            Meetups
                        </div>
                        <div class="number">
                            12 Jan
                        </div>
                    </div>
                </div>
                <div class="tile bg-green">
                    <div class="tile-body">
                        <i class="fa fa-bar-chart-o"></i>
                    </div>
                    <div class="tile-object">
                        <div class="name">
                            Reports
                        </div>
                        <div class="number">
                        </div>
                    </div>
                </div>
                <div class="tile bg-blue-steel">
                    <div class="tile-body">
                        <i class="fa fa-briefcase"></i>
                    </div>
                    <div class="tile-object">
                        <div class="name">
                            Documents
                        </div>
                        <div class="number">
                            124
                        </div>
                    </div>
                </div>
                <div class="tile image double selected">
                    <div class="tile-body">
                        <img src="../../assets/admin/pages/media/gallery/image4.jpg" alt="">
                    </div>
                    <div class="tile-object">
                        <div class="name">
                            Gallery
                        </div>
                        <div class="number">
                            124
                        </div>
                    </div>
                </div>
                <div class="tile bg-yellow-lemon selected">
                    <div class="corner">
                    </div>
                    <div class="check">
                    </div>
                    <div class="tile-body">
                        <i class="fa fa-cogs"></i>
                    </div>
                    <div class="tile-object">
                        <div class="name">
                            Settings
                        </div>
                    </div>
                </div>
                <div class="tile bg-red-sunglo">
                    <div class="tile-body">
                        <i class="fa fa-plane"></i>
                    </div>
                    <div class="tile-object">
                        <div class="name">
                            Projects
                        </div>
                        <div class="number">
                            34
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <!-- BEGIN ALERTS PORTLET-->
                    <div class="portlet purple box">
                        <div class="portlet-title">
                            <div class="caption">
                                <i class="fa fa-cogs"></i>Alerts
                            </div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse">
                                </a>
                                <a href="#portlet-config" data-toggle="modal" class="config">
                                </a>
                                <a href="javascript:;" class="reload">
                                </a>
                                <a href="javascript:;" class="remove">
                                </a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <h4 class="block">Default Alerts</h4>
                            <div class="alert alert-success">
                                <strong>Success!</strong> The page has been added.
                            </div>
                            <div class="alert alert-info">
                                <strong>Info!</strong> You have 198 unread messages.
                            </div>
                            <div class="alert alert-warning">
                                <strong>Warning!</strong> Your monthly traffic is reaching limit.
                            </div>
                            <div class="alert alert-danger">
                                <strong>Error!</strong> The daily cronjob has failed.
                            </div>
                            <h4 class="block">Dismissable Alerts</h4>
                            <div class="alert alert-warning alert-dismissable">
                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button>
                                <strong>Warning!</strong> Something went wrong. Please check.
                            </div>
                            <h4 class="block">Links in alerts</h4>
                            <div class="alert alert-success alert-dismissable">
                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button>
                                <strong>WOW!</strong> Well done and everything looks OK. <a href="" class="alert-link">
                                Please check this one as well </a>
                            </div>
                        </div>
                    </div>
                    <!-- END ALERTS PORTLET-->
                </div>
                <div class="col-md-4">
                    <!-- Begin: life time stats -->
                    <div class="portlet box blue-steel" id="news_part" name="news_part">
                        <div class="portlet-title">
                            <div class="caption">
                                <i class="fa fa-thumb-tack"></i>财经新闻
                            </div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse">
                                </a>
                                <a href="#portlet-config" data-toggle="modal" class="config">
                                </a>
                                <a href="javascript:;" class="reload">
                                </a>
                                <a href="javascript:;" class="remove">
                                </a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="tabbable-line">
                                <ul class="nav nav-tabs">
                                    <li class="active">
                                        <a href="#zxrd_part" data-toggle="tab">
                                            最新热点 </a>
                                    </li>
                                    <li>
                                        <a href="#cjxw_part" data-toggle="tab">
                                            财经新闻 </a>
                                    </li>
                                    <li>
                                        <a href="#gjxw_part" data-toggle="tab">
                                            国际新闻 </a>
                                    </li>
<%--                                    <li class="dropdown">--%>
<%--                                        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">--%>
<%--                                            Orders <i class="fa fa-angle-down"></i>--%>
<%--                                        </a>--%>
<%--                                        <ul class="dropdown-menu" role="menu">--%>
<%--                                            <li>--%>
<%--                                                <a href="#overview_4" tabindex="-1" data-toggle="tab">--%>
<%--                                                    Latest 10 Orders </a>--%>
<%--                                            </li>--%>
<%--                                            <li>--%>
<%--                                                <a href="#overview_4" tabindex="-1" data-toggle="tab">--%>
<%--                                                    Pending Orders </a>--%>
<%--                                            </li>--%>
<%--                                            <li>--%>
<%--                                                <a href="#overview_4" tabindex="-1" data-toggle="tab">--%>
<%--                                                    Completed Orders </a>--%>
<%--                                            </li>--%>
<%--                                            <li>--%>
<%--                                                <a href="#overview_4" tabindex="-1" data-toggle="tab">--%>
<%--                                                    Rejected Orders </a>--%>
<%--                                            </li>--%>
<%--                                        </ul>--%>
<%--                                    </li>--%>
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane active" id="zxrd_part">
                                        <div class="table-responsive">
                                            <table class="table table-striped table-hover table-bordered">
                                                <thead>
                                                <tr>
                                                    <th style="text-align: center;">
                                                        标题
                                                    </th>
<%--                                                    <th>--%>
<%--                                                        Price--%>
<%--                                                    </th>--%>
<%--                                                    <th>--%>
<%--                                                        Sold--%>
<%--                                                    </th>--%>
                                                    <th>
                                                        发布时间
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody id="zxrd_news" name="zxrd_news" style="font-size: medium;">
                                                <tr>
                                                    <td>
                                                        <a href="javascript:;">
                                                            最新热点部分 </a>
                                                    </td>
<%--                                                    <td>--%>
<%--                                                        $625.50--%>
<%--                                                    </td>--%>
<%--                                                    <td>--%>
<%--                                                        809--%>
<%--                                                    </td>--%>
                                                    <td>
                                                        <a href="javascript:;" class="btn default btn-xs green-stripe">
                                                            View </a>
                                                    </td>
                                                </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="tab-pane" id="cjxw_part">
                                        <div class="table-responsive">
                                            <table class="table table-striped table-hover table-bordered">
                                                <thead>
                                                <tr>
                                                    <th style="text-align: center;">
                                                        标题
                                                    </th>
<%--                                                    <th>--%>
<%--                                                        Price--%>
<%--                                                    </th>--%>
<%--                                                    <th>--%>
<%--                                                        Views--%>
<%--                                                    </th>--%>
                                                    <th>
                                                        发布时间
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody id="cjxw_news" name="cjxw_news" style="font-size: medium;">
                                                <tr>
                                                    <td>
                                                        <a href="javascript:;">
                                                            财经新闻部分 </a>
                                                    </td>
<%--                                                    <td>--%>
<%--                                                        $20.00--%>
<%--                                                    </td>--%>
<%--                                                    <td>--%>
<%--                                                        11190--%>
<%--                                                    </td>--%>
                                                    <td>
                                                        <a href="javascript:;" class="btn default btn-xs green-stripe">
                                                            View </a>
                                                    </td>
                                                </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="tab-pane" id="gjxw_part">
                                        <div class="table-responsive">
                                            <table class="table table-striped table-hover table-bordered">
                                                <thead>
                                                <tr>
                                                    <th style="text-align: center;">
                                                        标题
                                                    </th>
<%--                                                    <th>--%>
<%--                                                        Total Orders--%>
<%--                                                    </th>--%>
<%--                                                    <th>--%>
<%--                                                        Total Amount--%>
<%--                                                    </th>--%>
                                                    <th>
                                                        发布时间
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody id="gjxw_news" name="gjxw_news" style="font-size: medium;">
                                                <tr>
                                                    <td>
                                                        <a href="javascript:;">
                                                            国际新闻部分 </a>
                                                    </td>
<%--                                                    <td>--%>
<%--                                                        3--%>
<%--                                                    </td>--%>
<%--                                                    <td>--%>
<%--                                                        $625.50--%>
<%--                                                    </td>--%>
                                                    <td>
                                                        <a href="javascript:;" class="btn default btn-xs green-stripe">
                                                            View </a>
                                                    </td>
                                                </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <!-- Begin: life time stats -->
                    <div class="portlet box red-sunglo">
                        <div class="portlet-title">
                            <div class="caption">
                                <i class="fa fa-bar-chart-o"></i>Revenue
                            </div>
                            <div class="tools">
                                <a href="#portlet-config" data-toggle="modal" class="config">
                                </a>
                                <a href="javascript:;" class="reload">
                                </a>
                            </div>
                            <ul class="nav nav-tabs" style="margin-right: 10px">
                                <li>
                                    <a href="#portlet_tab2" data-toggle="tab" id="statistics_amounts_tab">
                                        Amounts </a>
                                </li>
                                <li class="active">
                                    <a href="#portlet_tab1" data-toggle="tab">
                                        Orders </a>
                                </li>
                            </ul>
                        </div>
                        <div class="portlet-body">
                            <div class="tab-content">
                                <div class="tab-pane active" id="portlet_tab1">
                                    <div id="statistics_1" class="chart">
                                    </div>
                                </div>
                                <div class="tab-pane" id="portlet_tab2">
                                    <div id="statistics_2" class="chart">
                                    </div>
                                </div>
                            </div>
                            <div class="well no-margin no-border">
                                <div class="row">
                                    <div class="col-md-3 col-sm-3 col-xs-6 text-stat">
										<span class="label label-success">
										Revenue: </span>
                                        <h3>$1,234,112.20</h3>
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-6 text-stat">
										<span class="label label-info">
										Tax: </span>
                                        <h3>$134,90.10</h3>
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-6 text-stat">
										<span class="label label-danger">
										Shipment: </span>
                                        <h3>$1,134,90.10</h3>
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-6 text-stat">
										<span class="label label-warning">
										Orders: </span>
                                        <h3>235090</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End: life time stats -->
                </div>
            </div>
            <!-- END PAGE CONTENT-->
        </div>
    </div>
    <!-- END CONTENT -->

</div>
<!-- END CONTAINER -->
<%@include file="../../home/frame/follow-us.jsp"%>
<!-- BEGIN FOOTER -->
<%@include file="../../home/frame/frame_footer.jsp"%>
<!-- END FOOTER -->

<%@include file="../../home/frame/frame_javascript.jsp"%>
<script type="text/javascript" src="jquery.dataTables.min.js"></script>
<script src="index.js" type="text/javascript"></script>

<%--<script src="news_part.js" type="text/javascript"></script>--%>
</body>
<!-- END BODY -->
</html>