<%--
  Created by IntelliJ IDEA.
  User: Diffelentor
  Date: 2022/10/15
  Time: 22:35
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
    <title>金融数据分析及模拟交易平台</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <meta content="" name="description"/>
    <meta content="" name="author"/>
    <%@include file="../../home/frame/frame_style.jsp"%>
    <link rel="shortcut icon" href="favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="dataTables.bootstrap.css" />

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
                用户信息管理 <small>用户信息表</small>
            </h3>
            <div class="page-bar">
                <ul class="page-breadcrumb">
                    <li>
                        <i class="fa fa-home"></i>
                        <a href="../main/index.jsp">首页</a>
                        <i class="fa fa-angle-right"></i>
                    </li>
                    <li>
                        <a href="user_list.jsp">用户信息</a>
                    </li>
                </ul>

            </div>
            <!-- END PAGE HEADER-->
            <!-- BEGIN PAGE CONTENT-->
            <div class="row">
                <div class="col-md-12">
                    <div class="portlet-body form" id="record_query_setup" name="record_query_setup">
                            <form class="form-horizontal" role="form">
                                <div class="form-body">
                                    <div class="form-group">
                                        <label class="col-md-1 control-label">用户名</label>
                                        <div class="col-md-2">
                                            <input type="text" class="form-control" placeholder="请输入用户名" id="username" name="username">
                                        </div>
                                        <label class="col-md-1 control-label">用户身份</label>
                                        <div class="col-md-2">
                                            <input type="text" class="form-control" placeholder="请输入用户身份" id="identity" name="identity">
                                        </div>
                                        <label class="col-md-1 control-label">用户邮箱</label>
                                        <div class="col-md-2">
                                            <input type="text" class="form-control" placeholder="请输入用户邮箱" id="email" name="email">
                                        </div>
                                        <div class="col-md-1">
                                        </div>
                                        <div class="col-md-2">
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
            </div>
            <div class="row">
                <div class="col-md-10 ">
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
                <div class="col-md-2">
                    <button type="button" style="float: right"  class="btn default" id="refresh_button" name="refresh_button">
                        <i class="fa fa-refresh"></i></button>
                </div>
            </div>
            <br>
<%--            <div class="row">--%>
<%--                <div class="col-md-6">--%>
<%--                    <button type="button" class="btn btn-primary" id="datatable_button" name="datatable_button">切换到DataTable</button>--%>
<%--                    <button type="button" class="btn btn-primary" id="table_button" name="table_button">切换到自定义Table</button>--%>
<%--                    <button type="button" class="btn btn-primary" id="bar_button" name="bar_button">切换到大横条</button>--%>
<%--                </div>--%>
<%--            </div>--%>
<%--            <div class="row display-none" id="bar_tab">--%>
<%--                <div class="col-md-6">--%>
<%--                    <div id="record_bar_div">--%>
<%--                    <div class="media">--%>
<%--                        <a href="javascript:;" class="pull-left">--%>
<%--                            <img alt="" src="../../assets/admin/pages/media/blog/7.jpg" class="media-object" style="width:50px;height:50px;border-radius: 50% !important;">--%>
<%--                        </a>--%>
<%--                        <div class="media-body">--%>
<%--                            <h4 class="media-heading">Media heading <span>--%>
<%--											2 days ago / <a href="javascript:;">--%>
<%--											Reply </a>--%>
<%--											</span>--%>
<%--                            </h4>--%>
<%--                            <p>--%>
<%--                                Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.--%>
<%--                            </p>--%>
<%--                        </div>--%>
<%--                    </div>--%>
<%--                    <hr>--%>
<%--                    </div>--%>
<%--                </div>--%>
<%--            </div>--%>
            <div class="row" id="datatable_tab">
                <div class="col-md-12">
                    <table class="table table-striped table-bordered table-hover datatable" id="user_record_list">
                        <thead>
                        <tr>
                            <th class="table-checkbox"><input type="checkbox" class="group-checkable" data-set="#record_list .checkboxes" /></th>
                            <th>用户名</th>
                            <th>用户密码</th>
                            <th>用户邮箱</th>
                            <th>用户身份</th>
                            <th>
                                用户余额
                            </th>
                            <th>操作</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
<%--            <div class="row display" id="table_tab">--%>
<%--                <div class="col-md-12">--%>
<%--                    <!-- BEGIN SAMPLE TABLE PORTLET-->--%>
<%--                    <div class="portlet box blue">--%>
<%--                        <div class="portlet-title">--%>
<%--                            <div class="caption">--%>
<%--                                <i class="fa fa-comments"></i>用户数据表--%>
<%--                            </div>--%>
<%--                            <div class="tools">--%>
<%--                                <a href="javascript:;" class="collapse">--%>
<%--                                </a>--%>
<%--                                <a href="#portlet-config" data-toggle="modal" class="config">--%>
<%--                                </a>--%>
<%--                                <a href="javascript:;" class="reload">--%>
<%--                                </a>--%>
<%--                                <a href="javascript:;" class="remove">--%>
<%--                                </a>--%>
<%--                            </div>--%>
<%--                        </div>--%>
<%--                        <div class="portlet-body">--%>
<%--                            <div class="table-scrollable">--%>
<%--                                <table class="table table-bordered table-hover">--%>
<%--                                    <thead>--%>
<%--                                    <tr>--%>
<%--                                        <th>--%>
<%--                                            Username--%>
<%--                                        </th>--%>
<%--                                        <th>--%>
<%--                                            password--%>
<%--                                        </th>--%>
<%--                                        <th>--%>
<%--                                            email--%>
<%--                                        </th>--%>
<%--                                        <th>--%>
<%--                                            is_manager--%>
<%--                                        </th>--%>
<%--                                        <th>--%>
<%--                                            modify--%>
<%--                                        </th>--%>
<%--                                    </tr>--%>
<%--                                    </thead>--%>
<%--                                    <tbody id="record_table_content_div" name="record_table_content_div">--%>
<%--                                    <tr class=\"active\">--%>
<%--                                        <td>--%>
<%--                                            aaaaa--%>
<%--                                        </td>--%>
<%--                                        <td>--%>
<%--                                            12345--%>
<%--                                        </td>--%>
<%--                                        <td>--%>
<%--                                            12345@qq.com--%>
<%--                                        </td>--%>
<%--                                        <td>--%>
<%--                                            Yes--%>
<%--                                        </td>--%>
<%--                                        <td>--%>
<%--                                         <a href="javascript:Page.onModifyRecord(record.id)">【修改】</a><a href="javascript:Page.onDeleteRecord(record.id)">【删除】</a>--%>
<%--                                        </td>--%>
<%--                                    </tr>--%>

<%--                                    </tbody>--%>
<%--                                </table>--%>
<%--                            </div>--%>
<%--                        </div>--%>
<%--                    </div>--%>
<%--                    <!-- END SAMPLE TABLE PORTLET-->--%>
<%--                </div>--%>

<%--            </div>--%>

            <!-- END PAGE CONTENT-->
        </div>
    </div>
    <!-- END CONTENT -->

</div>
<input type="hidden" id="page_id" name="page_id" value="user_list">
<!-- END CONTAINER -->
<!-- BEGIN FOOTER -->
<%@include file="../../home/frame/frame_footer.jsp"%>
<!-- END FOOTER -->

<%@include file="../../home/frame/frame_javascript.jsp"%>
<script type="text/javascript" src="jquery.dataTables.min.js"></script>
<script src="user.js" type="text/javascript"></script>

</body>
<!-- END BODY -->

</html>
<%@include file="user_modify_div.jsp"%>
<%@include file="user_add_div.jsp"%>
<%@include file="user_download_div.jsp"%>
