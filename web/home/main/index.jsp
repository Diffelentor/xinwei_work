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
                首页 <small>数据概况</small>
            </h3>
            <div class="page-bar">
                <ul class="page-breadcrumb">
                    <li>
                        <i class="fa fa-home"></i>
                        <a href="index.html">Home</a>
                        <i class="fa fa-angle-right"></i>
                    </li>
                    <li>
                        <a href="#">Data Tables</a>
                        <i class="fa fa-angle-right"></i>
                    </li>
                    <li>
                        <a href="#">Basic Datatables</a>
                    </li>
                </ul>
                <div class="page-toolbar">
                    <div class="btn-group pull-right">
                        <button type="button" class="btn btn-fit-height grey-salt dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="1000" data-close-others="true" aria-expanded="false">
                            Actions <i class="fa fa-angle-down"></i>
                        </button>
                        <ul class="dropdown-menu pull-right" role="menu">
                            <li>
                                <a href="#">Action</a>
                            </li>
                            <li>
                                <a href="#">Another action</a>
                            </li>
                            <li>
                                <a href="#">Something else here</a>
                            </li>
                            <li class="divider">
                            </li>
                            <li>
                                <a href="#">Separated link</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- END PAGE HEADER-->
            <input type="hidden" id="page_id" name="page_id" value="dash_board">
            <!-- BEGIN PAGE CONTENT-->
            <h3 class="page-title">
                Dashboard <small>reports & statistics</small>
            </h3>
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
                    <!-- Begin: left datas -->
                    <div class="portlet box blue-steel">
                        <div class="portlet-title">
                            <div class="caption">
                                <i class="fa fa-thumb-tack"></i>主要金融数据通览
                            </div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse">
                                </a>
                                <a href="javascript:;" class="reload">
                                </a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="tabbable-line">
                                <ul class="nav nav-tabs">
                                    <li class="active">
                                        <a href="#overview_1" data-toggle="tab">
                                            期货数据</a>
                                    </li>
                                    <li>
                                        <a href="#overview_2" data-toggle="tab">
                                            股票数据</a>
                                    </li>
                                    <li>
                                        <a href="#overview_3" data-toggle="tab">
                                            外汇数据 </a>
                                    </li>
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane active" id="overview_1">
                                        <div class="table-responsive">
                                            <table class="table table-striped table-hover table-bordered">
                                                <thead>
                                                <tr>
                                                    <th>
                                                        期货名称
                                                    </th>
                                                    <th>
                                                        期货代号
                                                    </th>
                                                    <th>
                                                        现价
                                                    </th>
                                                    <th>
                                                        今日涨跌幅
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody id="futures">
                                                <tr>
                                                    <td>
                                                        <a href="#" onclick="Page.onShowKlineFutures('AU0')">
                                                            黄金连续 </a>
                                                    </td>
                                                    <td>
                                                        AU0
                                                    </td>
                                                    <td>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" onclick="Page.onShowKlineFutures('AG0')">
                                                            白银连续</a>
                                                    </td>
                                                    <td>
                                                        AG0
                                                    </td>
                                                    <td>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" onclick="Page.onShowKlineFutures('AL2301')">
                                                            沪铝2301 </a>
                                                    </td>
                                                    <td>
                                                        AL2301
                                                    </td>
                                                    <td>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" onclick="Page.onShowKlineFutures('CU2301')">
                                                            沪铜2301 </a>
                                                    </td>
                                                    <td>
                                                        CU2301
                                                    </td>
                                                    <td>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" onclick="Page.onShowKlineFutures('FU2301')">
                                                            燃油2301</a>
                                                    </td>
                                                    <td>
                                                        FU2301
                                                    </td>
                                                    <td>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" onclick="Page.onShowKlineFutures('I2301')">
                                                            铁矿石2301</a>
                                                    </td>
                                                    <td>
                                                        I2301
                                                    </td>
                                                    <td>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" onclick="Page.onShowKlineFutures('P2301')">
                                                            棕榈2301 </a>
                                                    </td>
                                                    <td>
                                                        P2301
                                                    </td>
                                                    <td>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="tab-pane" id="overview_2">
                                        <div class="table-responsive">
                                            <table class="table table-striped table-hover table-bordered">
                                                <thead>
                                                <tr>
                                                    <th>
                                                        股票名称
                                                    </th>
                                                    <th>
                                                        股票代号
                                                    </th>
                                                    <th>
                                                        现价
                                                    </th>
                                                    <th>
                                                        今日涨跌幅
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody id="shares">
                                                <tr>
                                                    <td>
                                                        <a href="#" onclick="Page.onShowKline('sh000001')">
                                                            上证指数 </a>
                                                    </td>
                                                    <td>
                                                        sh000001
                                                    </td>
                                                    <td>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" onclick="Page.onShowKline('sh000300')">
                                                            沪深300 </a>
                                                    </td>
                                                    <td>
                                                        sh000300
                                                    </td>
                                                    <td>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" onclick="Page.onShowKline('sz399001')">
                                                            深证成指 </a>
                                                    </td>
                                                    <td>
                                                        sz399001
                                                    </td>
                                                    <td>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" onclick="Page.onShowKline('sz399006')">
                                                            创业板指 </a>
                                                    </td>
                                                    <td>
                                                        sz399006
                                                    </td>
                                                    <td>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" onclick="Page.onShowKline('sh60028')">
                                                            中国石化 </a>
                                                    </td>
                                                    <td>
                                                        sh600028
                                                    </td>
                                                    <td>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" onclick="Page.onShowKline('sh601857')">
                                                            中国石油</a>
                                                    </td>
                                                    <td>
                                                        sh601857
                                                    </td>
                                                    <td>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" onclick="Page.onShowKline('sz000858')">
                                                            五 粮 液 </a>
                                                    </td>
                                                    <td>
                                                        sz000858
                                                    </td>
                                                    <td>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" onclick="Page.onShowKline('sh600519')">
                                                            贵州茅台 </a>
                                                    </td>
                                                    <td>
                                                        sh600519
                                                    </td>
                                                    <td>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="tab-pane" id="overview_3">
                                        <div class="table-responsive">
                                            <table class="table table-striped table-hover table-bordered">
                                                <thead>
                                                <tr>
                                                    <th>
                                                       外汇名称
                                                    </th>
                                                    <th>
                                                        外汇代号
                                                    </th>
                                                    <th>
                                                        现价
                                                    </th>
                                                    <th>
                                                        今日涨跌幅
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody id="exchanges">
                                                <tr>
                                                    <td>
                                                        <a href="#" onclick="Page.onShowKlineExchanges('DINIW')">
                                                            美元指数 </a>
                                                    </td>
                                                    <td>
                                                        DINIW
                                                    </td>
                                                    <td>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" onclick="Page.onShowKlineExchanges('USDCNY')">
                                                            美元人民币 </a>
                                                    </td>
                                                    <td>
                                                        USDCNY
                                                    </td>
                                                    <td>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" onclick="Page.onShowKlineExchanges('CNYJPY')">
                                                            人民币日元 </a>
                                                    </td>
                                                    <td>
                                                        CNYJPY
                                                    </td>
                                                    <td>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" onclick="Page.onShowKlineExchanges('EURCNY')">
                                                            欧元人民币 </a>
                                                    </td>
                                                    <td>
                                                        EURCNY
                                                    </td>
                                                    <td>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" onclick="Page.onShowKlineExchanges('GBPCNY')">
                                                            英镑人民币 </a>
                                                    </td>
                                                    <td>
                                                        GBPCNY
                                                    </td>
                                                    <td>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a href="#" onclick="Page.onShowKlineExchanges('HKDCNY')">
                                                            港元人民币 </a>
                                                    </td>
                                                    <td>
                                                        HKDCNY
                                                    </td>
                                                    <td>
                                                    </td>
                                                    <td>
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
                    <!-- End: left data -->
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
                                <a href="javascript:;" class="reload">
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
                    <!-- Begin: data_graphs -->
                    <div class="portlet box red-sunglo">
                        <div class="portlet-title">
                            <div class="caption">
                                <i class="fa fa-bar-chart-o"></i>金融交易量
                            </div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse">
                                </a>
                                <a href="javascript:;" class="reload">
                                </a>
                            </div>
                            <ul class="nav nav-tabs" style="margin-right: 10px">
                                <li class="active">
                                    <a href="#portlet_tab1" data-toggle="tab" id="statistics_amounts_tab">
                                        期货 </a>
                                </li>
                                <li>
                                    <a href="#portlet_tab2" data-toggle="tab">
                                        股票 </a>
                                </li>
                            </ul>
                        </div>
                        <div class="portlet-body">
                            <div class="tab-content">
                                <div class="tab-pane active" id="portlet_tab1">
                                    <div id="statistics_futures" class="chart">
                                    </div>
                                </div>
                                <div class="tab-pane active" id="portlet_tab2">
                                    <div id="statistics_shares" class="chart">
                                    </div>
                                </div>
                            </div>
                            <div class="well no-margin no-border">
                                <div class="row">
                                    <div class="col-md-3 col-sm-3 col-xs-6 text-stat">
										<span class="label label-success">
										上证指数: </span>
                                        <h3>3176.33</h3>
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-6 text-stat">
										<span class="label label-info">
										道琼斯指数: </span>
                                        <h3>34005.04</h3>
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-6 text-stat">
										<span class="label label-danger">
										纳斯达克指数: </span>
                                        <h3>11143.74</h3>
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-6 text-stat">
										<span class="label label-warning">
										香港恒生指数: </span>
                                        <h3>19596.20</h3>
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
<script type="text/javascript" src="../../resource/js/echarts.min.js"></script>
</body>
<!-- END BODY -->
</html>