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
<div class="clearfix">
</div>
<!-- BEGIN CONTAINER -->
<div class="page-container">
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">

            <div class="row" id="datatable_tab">
                <div class="col-md-12">
                    <div class="portlet">
                        <div class="portlet-title">
                            <div class="caption">
                                <i class="fa fa-bell-o"></i>用户管理
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
                            <div class="table-scrollable">
                        <table class="table table-striped table-bordered table-advance table-hover">
                            <thead>
                            <tr>
                                <th >
                                    用户名
                                </th>
                                <th>
                                    用户密码
                                </th>
                                <th>
                                    用户邮箱
                                </th>
                                <th>
                                    用户身份
                                </th>
                                <th>
                                    用户余额
                                </th>
                            </tr>
                            </thead>
                            <tbody id="print_table_content_div">
                            <tr>
                                <td class="highlight">
                                    <div class="success">
                                    </div>
                                    <a href="javascript:;">
                                        RedBull </a>
                                </td>
                                <td class="hidden-xs">
                                    Mike Nilson
                                </td>
                                <td>
                                    2560.60$
                                </td>
                                <td>
                                    <a href="javascript:;" class="btn default btn-xs purple">
                                        <i class="fa fa-edit"></i> Edit </a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                        </div>
                    </div>
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
<input type="hidden" id="page_id" name="page_id" value="user_list_print">
<!-- END CONTAINER -->
<!-- BEGIN FOOTER -->
<!-- END FOOTER -->

<%@include file="../../home/frame/frame_javascript.jsp"%>
<script type="text/javascript" src="jquery.dataTables.min.js"></script>
<script src="user.js" type="text/javascript"></script>
</body>
<!-- END BODY -->

</html>