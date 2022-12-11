<%--
  Created by IntelliJ IDEA.
  User: Diffelentor
  Date: 2022/12/11
  Time: 13:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link href="../../home/main/website.css" rel="stylesheet">
    <title>website</title>
</head>
<body>
<div class="HDU-ITMO">
<%--    <img src="../img/8.png" alt="HDU-ITMO" height="80">--%>
</div>
<div class="card-top">
    <div class="card">
        <form class="login-form" action="../../user_center_servlet_action?action=login" method="post">
            <h4 class="title">登录</h4>
            <div class="field">
                <svg class="input-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                    <path d="M684.987733 587.093333a324.266667 324.266667 0 1 0-380.1088 0A460.868267 460.868267 0 0 0 34.133333 1006.933333h102.4a358.4 358.4 0 1 1 716.8 0h102.4A460.868267 460.868267 0 0 0 684.987733 587.093333zM273.066667 324.266667a221.866667 221.866667 0 1 1 443.733333 0 221.866667 221.866667 0 0 1-443.733333 0z" p-id="9804"></path></svg>
                <input autocomplete="off" id="logusername" placeholder="用户名" class="input-field" name="username" type="text">
            </div>
            <div class="field">
                <svg class="input-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                    <path d="M512 16A304 304 0 0 0 208 320v80H192A112 112 0 0 0 80 512v384c0 61.824 50.176 112 112 112h640A112 112 0 0 0 944 896V512A112 112 0 0 0 832 400h-16V320A304 304 0 0 0 512 16z m208 384h-416V320a208 208 0 1 1 416 0v80zM192 496h640a16 16 0 0 1 16 16v384a16 16 0 0 1-16 16H192a16 16 0 0 1-16-16V512A16 16 0 0 1 192 496z" p-id="9664"></path></svg>
                <input autocomplete="off" id="logpass" placeholder="密码" class="input-field" name="password" type="password">
            </div>
            <button class="btn" type="submit">登录</button>
            <div class="necessary-links">
                <a href="#" class="btn-link">忘记密码？</a>
                <a href="#" class="btn-link">立即注册</a>
            </div>
        </form>
    </div>
</div>
<div class="bottom-informations">
    <ul>
        <li class="bottom-information">电话:(+86 10) 6666 8888</li>
    </ul>
</div>
<div class="copyright">&copy; 2022 XM06</div>
<%@include file="../../home/frame/frame_javascript.jsp"%>
<script src="../../assets/global/plugins/jquery-validation/js/jquery.validate.min.js" type="text/javascript"></script>
<script src="login.js" type="text/javascript"></script>
</body>
</html>