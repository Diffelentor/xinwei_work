<%--
  Created by IntelliJ IDEA.
  User: Diffelentor
  Date: 2022/12/2
  Time: 15:23
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>

<html lang="en">

<head>
    <meta charset="utf-8"/>
    <title>个人信息</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <meta content="" name="description"/>
    <meta content="" name="author"/>
    <%@include file="../../home/frame/frame_style.jsp"%>
    <!-- BEGIN PAGE LEVEL STYLES -->
    <link href="../../assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css" rel="stylesheet" type="text/css"/>
    <link href="../../assets/admin/pages/css/profile.css" rel="stylesheet" type="text/css"/>
    <link href="../../assets/admin/pages/css/tasks.css" rel="stylesheet" type="text/css"/>
    <!-- END PAGE LEVEL STYLES -->
    <link rel="shortcut icon" href="favicon.ico"/>
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
<!-- BEGIN HEADER -->
<%@include file="../../home/frame/frame_header.jsp"%>
<!-- END HEADER -->
<div class="clearfix">
</div>
<!-- BEGIN CONTAINER -->
<div class="page-container">
    <!-- BEGIN SIDEBAR -->
    <%@include file="../../home/frame/frame_left_sidebar.jsp"%>
    <!-- END SIDEBAR -->
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">
            <!-- BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM-->
            <%@include file="../../home/frame/frame_page_header.jsp"%>
            <!-- BEGIN PAGE HEADER-->
            <div class="page-bar">
                <ul class="page-breadcrumb">
                    <li>
                        <i class="fa fa-home"></i>
                        <a href="index.html">Home</a>
                        <i class="fa fa-angle-right"></i>
                    </li>
                    <li>
                        <a href="#">Pages</a>
                        <i class="fa fa-angle-right"></i>
                    </li>
                    <li>
                        <a href="#">New User Profile</a>
                    </li>
                </ul>

            </div>
            <!-- END PAGE HEADER-->
            <!-- BEGIN PAGE CONTENT-->
            <div class="row margin-top-20">
                <div class="col-md-12">
                    <!-- BEGIN PROFILE SIDEBAR -->
                    <div class="profile-sidebar" id="basic_inf" name="basic_inf">
                        <!-- PORTLET MAIN -->
                        <div class="portlet light profile-sidebar-portlet">
                            <!-- SIDEBAR USERPIC -->
                            <div class="profile-userpic">
                                <img src="../../home/user/向晚.jpg" class="img-responsive" alt="">
                            </div>
                            <!-- END SIDEBAR USERPIC -->
                            <!-- SIDEBAR USER TITLE -->
                            <div class="profile-usertitle">
                                <div class="profile-usertitle-name" id="basic_username" name="basic_username">
                                    游客
                                </div>
                                <div class="profile-usertitle-job" id="basic_identity" name="basic_identity">
                                    普通用户
                                </div>
                            </div>
                            <!-- END SIDEBAR USER TITLE -->
                            <!-- SIDEBAR BUTTONS -->
                            <div class="profile-userbuttons">
                                <button type="button" class="btn btn-circle green-haze btn-sm">Follow</button>
                                <button type="button" class="btn btn-circle btn-danger btn-sm">Message</button>
                            </div>
                            <!-- END SIDEBAR BUTTONS -->
                        </div>
                        <!-- END PORTLET MAIN -->
                        <!-- PORTLET MAIN -->
                        <div class="portlet light">
                            <!-- STAT -->
                            <div class="row list-separated profile-stat">
                                <div class="col-md-4 col-sm-4 col-xs-6">
                                    <div class="uppercase profile-stat-title">
                                        37
                                    </div>
                                    <div class="uppercase profile-stat-text">
                                        Projects
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-6">
                                    <div class="uppercase profile-stat-title">
                                        51
                                    </div>
                                    <div class="uppercase profile-stat-text">
                                        Tasks
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-6">
                                    <div class="uppercase profile-stat-title">
                                        61
                                    </div>
                                    <div class="uppercase profile-stat-text">
                                        Uploads
                                    </div>
                                </div>
                            </div>
                            <!-- END STAT -->
                            <div>
                                <h4 class="profile-desc-title">About Marcus Doe</h4>
                                <span class="profile-desc-text"> Lorem ipsum dolor sit amet diam nonummy nibh dolore. </span>
                                <div class="margin-top-20 profile-desc-link">
                                    <i class="fa fa-globe"></i>
                                    <a href="http://www.keenthemes.com">www.keenthemes.com</a>
                                </div>
                                <div class="margin-top-20 profile-desc-link">
                                    <i class="fa fa-twitter"></i>
                                    <a href="http://www.twitter.com/keenthemes/">@keenthemes</a>
                                </div>
                                <div class="margin-top-20 profile-desc-link">
                                    <i class="fa fa-facebook"></i>
                                    <a href="http://www.facebook.com/keenthemes/">keenthemes</a>
                                </div>
                            </div>
                        </div>
                        <!-- END PORTLET MAIN -->
                    </div>
                    <!-- END BEGIN PROFILE SIDEBAR -->
                    <!-- BEGIN PROFILE CONTENT -->
                    <div class="profile-content">
                        <br><br><br>
                        <div class="row">
                            <div class="col-md-12">
                                <!-- BEGIN PORTLET-->
                                <div class="portlet-body form">
                                    <form id="form-username" class="form-horizontal form-bordered">
                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">用户名</label>
                                            <div class="col-sm-4">
                                                <div class="input-group">
                                        <span class="input-group-addon">
                                        <i class="fa fa-user"></i>
                                        </span>
                                                    <input  readonly="readonly" type="hidden" id="id" name="id" class="form-control"/>
                                                    <input type="text" id="username" name="username" class="form-control"/>
                                                </div>
                                                <p class="help-block">
                                                    E.g: 向晚, 戛然, 乃琳, 贝拉.<br>
                                                </p>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">用户密码</label>
                                            <div class="col-sm-4">
                                                <div class="input-group">
                                        <span class="input-group-addon">
                                        <i class="fa fa-search"></i>
                                        </span>
                                                    <input type="text" id="password" name="password" class="form-control"/>
                                                </div>
                                                <p class="help-block">
                                                    E.g: 12345, 8888.</code>
                                                </p>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-3 control-label">用户邮箱</label>
                                            <div class="col-sm-4">
                                                <div class="input-group">
                                        <span class="input-group-addon">
                                        <i class="fa fa-cogs"></i>
                                        </span>
                                                    <input type="text" id="email" name="email" class="form-control"/>
                                                </div>
                                                <p class="help-block">
                                                    E.g: 12345@163.com.</code>
                                                </p>
                                            </div>
                                        </div>
                                        <div class="form-group ">
                                            <label class="col-sm-3 control-label">用户身份</label>
                                            <div class="col-sm-4">
                                                <div class="input-group">
                                        <span class="input-group-addon">
                                        <i class="fa fa-check"></i>
                                        </span>
                                                    <input  readonly="readonly" type="text" id="identity" name="identity" class="form-control"/>
                                                </div>
                                                <p class="help-block">
                                                    E.g: 普通用户/管理员.</code>
                                                </p>
                                            </div>
                                        </div>
                                        <div class="form-group ">
                                            <label class="col-sm-3 control-label">账户余额</label>
                                            <div class="col-sm-4">
                                                <div class="input-group">
                                        <span class="input-group-addon">
                                        <i class="fa fa-check"></i>
                                        </span>
                                                    <input type="text" readonly="readonly" id="balance" name="balance" class="form-control"/>
                                                </div>
                                                <p class="help-block">
                                                    E.g: 你觉得你有多少钱.</code>
                                                </p>
                                            </div>
                                        </div>
                                        <div class="form-actions">
                                            <div class="row">
                                                <div class="col-md-offset-3 col-md-9">
                                                    <button type="button" class="btn purple" id="submit_button" name="submit_button"><i class="fa fa-check"></i>确认修改</button>
                                                    <button type="button" class="btn green" id="pay_button" name="pay_button"><i class="fa fa-credit-card"></i>账户充值</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <!-- END PORTLET-->
                            </div>
                        </div>
                    </div>
                    <!-- END PROFILE CONTENT -->
                </div>
            </div>
            <!-- END PAGE CONTENT-->
        </div>
    </div>
    <!-- END CONTENT -->
    <!-- BEGIN QUICK SIDEBAR -->
    <%@include file="../../home/frame/frame_right_sidebar.jsp"%>
    <!-- END QUICK SIDEBAR -->
</div>
<!-- END CONTAINER -->
<!-- BEGIN FOOTER -->
<%@include file="../../home/frame/frame_footer.jsp"%>
<!-- END FOOTER -->
<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->

<script src="../../assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js" type="text/javascript"></script>
<script src="../../assets/global/plugins/jquery.sparkline.min.js" type="text/javascript"></script>
<%@include file="../../home/frame/frame_javascript.jsp"%>
<script src="user_profile.js" type="text/javascript"></script>

</body>
<!-- END BODY -->
</html>
<%@include file="user_pay_div.jsp"%>