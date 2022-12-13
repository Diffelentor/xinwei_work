<%--
  Created by IntelliJ IDEA.
  User: Diffelentor
  Date: 2022/10/17
  Time: 16:41
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<!--
Template Name: Metronic - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.5
Version: 3.3.0
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
    <!-- BEGIN PAGE LEVEL STYLES -->
    <link href="../../assets/admin/pages/css/login_my.css" rel="stylesheet" type="text/css"/>
    <!-- END PAGE LEVEL SCRIPTS -->

    <link rel="shortcut icon" href="favicon.ico"/>
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="login">
<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
<div class="menu-toggler sidebar-toggler">
</div>
<!-- END SIDEBAR TOGGLER BUTTON -->
<!-- BEGIN LOGO -->
<div class="logo">
    <div align="center" style="FONT-FAMILY: 华文行楷;color:#ffffff;font-size: 38px;">金融数据分析及模拟交易平台</div>
</div>
<!-- END LOGO -->
<!-- BEGIN LOGIN -->
<div class="content">
    <!-- BEGIN LOGIN FORM -->
    <form class="login-form" action="../../user_center_servlet_action?action=login" method="post">
        <div class="form-title">
            <span class="form-title">欢迎您的访问.</span>
            <span class="form-subtitle">请登录.</span>
        </div>
        <div class="alert alert-danger display-hide">
            <button class="close" data-close="alert"></button>
            <span>
			输入您的账号和密码. </span>
        </div>
        <div class="form-group">
            <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
            <label class="control-label visible-ie8 visible-ie9">用户名</label>
            <input class="form-control form-control-solid placeholder-no-fix" type="text" autocomplete="off" placeholder="用户名" name="username"/>
        </div>
        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">密码</label>
            <input class="form-control form-control-solid placeholder-no-fix" type="password" autocomplete="off" placeholder="密码" name="password"/>
        </div>
        <div class="form-actions">
            <button type="submit" class="btn btn-primary btn-block uppercase">登陆</button>
        </div>
        <div class="form-actions">
            <div class="pull-left">
                <label class="rememberme check">
                    <input type="checkbox" name="remember" value="1"/>记住密码 </label>
            </div>
            <div class="pull-right forget-password-block">
                <a href="javascript:;" id="forget-password" class="forget-password">忘记密码？</a>
            </div>
        </div>
        <div class="login-options">
            <h4 class="pull-left">其他登陆方式</h4>
            <ul class="social-icons pull-right">
                <li>
                    <a class="social-icon-color facebook" data-original-title="facebook" href="javascript:;"></a>
                </li>
                <li>
                    <a class="social-icon-color twitter" data-original-title="Twitter" href="javascript:;"></a>
                </li>
                <li>
                    <a class="social-icon-color googleplus" data-original-title="Goole Plus" href="javascript:;"></a>
                </li>
                <li>
                    <a class="social-icon-color linkedin" data-original-title="Linkedin" href="javascript:;"></a>
                </li>
            </ul>
        </div>
        <div class="create-account">
            <p>
                <a href="javascript:;" id="register-btn">注册账号</a>
            </p>
        </div>
    </form>
    <!-- END LOGIN FORM -->
    <!-- BEGIN FORGOT PASSWORD FORM -->
    <form class="forget-form" action="../../user_center_servlet_action?action=forget" method="post">
        <div class="form-title">
            <span class="form-title">忘记密码？</span>
            <span class="form-subtitle">请输入您的邮箱来重置密码.</span>
        </div>
        <div class="form-group">
            <input class="form-control placeholder-no-fix" type="text" autocomplete="off" placeholder="邮箱" name="email"/>
        </div>
        <div class="form-actions">
            <button type="button" id="back-btn" class="btn btn-default">返回</button>
            <button type="submit" class="btn btn-primary uppercase pull-right">确认</button>
        </div>
    </form>
    <!-- END FORGOT PASSWORD FORM -->
    <!-- BEGIN REGISTRATION FORM -->
    <form class="register-form" action="../../user_center_servlet_action?action=register" method="post">
        <div class="form-title">
            <span class="form-title">注册</span>
        </div>
        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">用户名</label>
            <input class="form-control placeholder-no-fix" type="text" autocomplete="off" placeholder="用户名" name="username"/>
        </div>
        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">邮箱</label>
            <input class="form-control placeholder-no-fix" type="text" autocomplete="off" id="email" placeholder="邮箱" name="email"/>
        </div>
        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">密码</label>
            <input class="form-control placeholder-no-fix" type="password" autocomplete="off" id="register_password" placeholder="密码" name="password"/>
        </div>
        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">确认密码</label>
            <input class="form-control placeholder-no-fix" type="password" autocomplete="off" placeholder="请再次输入您的密码" name="rpassword"/>
        </div>
        <div class="form-group margin-top-20 margin-bottom-20">
            <label class="check">
                <input type="checkbox" name="tnc"/>
                <span class="loginblue-font">我同意 </span>
                <a href="javascript:;" class="loginblue-link">服务条款</a>
                <span class="loginblue-font">和</span>
                <a href="javascript:;" class="loginblue-link">隐私政策 </a>
            </label>
            <div id="register_tnc_error">
            </div>
        </div>
        <div class="form-actions">
            <button type="button" id="register-back-btn" class="btn btn-default">返回</button>
            <button type="submit" id="register-submit-btn" class="btn btn-primary uppercase pull-right">确认</button>
        </div>
    </form>
    <!-- END REGISTRATION FORM -->
</div>
<div class="copyright hide">
    2014 © Metronic. Admin Dashboard Template.
</div>
<!-- END LOGIN -->
<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
<!-- BEGIN CORE PLUGINS -->
<script src="../../assets/global/plugins/jquery.min.js" type="text/javascript"></script>
<script src="../../assets/global/plugins/jquery-migrate.min.js" type="text/javascript"></script>
<script src="../../assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="../../assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
<script src="../../assets/global/plugins/uniform/jquery.uniform.min.js" type="text/javascript"></script>
<script src="../../assets/global/plugins/jquery.cokie.min.js" type="text/javascript"></script>
<!-- END CORE PLUGINS -->
<!-- BEGIN PAGE LEVEL PLUGINS -->
<script src="../../assets/global/plugins/jquery-validation/js/jquery.validate.min.js" type="text/javascript"></script>
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script src="../../assets/global/scripts/metronic.js" type="text/javascript"></script>
<script src="../../assets/admin/layout/scripts/layout.js" type="text/javascript"></script>
<script src="../../assets/admin/layout/scripts/demo.js" type="text/javascript"></script>
<script src="login.js" type="text/javascript"></script>

<script>
    jQuery(document).ready(function() {
        Metronic.init(); // init metronic core components
        Layout.init(); // init current layout
        Login.init();
        Demo.init();
    });
</script>
<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>
