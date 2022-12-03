<%--
  Created by IntelliJ IDEA.
  User: Diffelentor
  Date: 2022/10/16
  Time: 20:05
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!-- BEGIN SIDEBAR -->
<div class="page-sidebar-wrapper" id="page_sidebar_wrapper">
    <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
    <!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->
    <div class="page-sidebar navbar-collapse collapse">
        <!-- BEGIN SIDEBAR MENU -->
        <!-- DOC: Apply "page-sidebar-menu-light" class right after "page-sidebar-menu" to enable light sidebar menu style(without borders) -->
        <!-- DOC: Apply "page-sidebar-menu-hover-submenu" class right after "page-sidebar-menu" to enable hoverable(hover vs accordion) sub menu mode -->
        <!-- DOC: Apply "page-sidebar-menu-closed" class right after "page-sidebar-menu" to collapse("page-sidebar-closed" class must be applied to the body element) the sidebar sub menu mode -->
        <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
        <!-- DOC: Set data-keep-expand="true" to keep the submenues expanded -->
        <!-- DOC: Set data-auto-speed="200" to adjust the sub menu slide up/down speed -->
        <ul class="page-sidebar-menu" data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">
            <!-- DOC: To remove the sidebar toggler from the sidebar you just need to completely remove the below "sidebar-toggler-wrapper" LI element -->
            <li class="sidebar-toggler-wrapper">
                <!-- BEGIN SIDEBAR TOGGLER BUTTON -->
                <div class="sidebar-toggler">
                </div>
                <!-- END SIDEBAR TOGGLER BUTTON -->
            </li>
            <!-- DOC: To remove the search box from the sidebar you just need to completely remove the below "sidebar-search-wrapper" LI element -->
            <li class="start">
                <a href="../../home/main/index.jsp">
                    <i class="icon-home"></i>
                    <span class="title">首页</span>
                </a>
            </li>
            <li>
                <a href="javascript:;">
                    <i class="icon-basket"></i>
                    <span class="title">用户管理</span>
                    <span class="arrow "></span>
                </a>
                <ul class="sub-menu">
                    <li>
                        <a href="../../home/user/user_list.jsp">
                            <i class="icon-home"></i>
                            用户信息</a>
                    </li>
                    <li>
                        <a href="../../home/user/user_profile.jsp">
                            <i class="icon-tag"></i>
                            个人空间</a>
                    </li>
                    <li>
                        <a href="../../maintain/myPosition/myPosition.jsp">
                            <i class="icon-basket"></i>
                            我的持仓</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="javascript:;">
                    <i class="icon-rocket"></i>
                    <span class="title">金融信息</span>
                    <span class="arrow "></span>
                </a>
                <ul class="sub-menu">
                    <li>
                        <a href="../../maintain/trade/futuresData.jsp">
                            期货数据</a>
                    </li>
                    <li>
                        <a href="../../maintain/manageTrade/manageFuturesData.jsp">
                            期货管理</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="../../news/page/news.jsp">
                    <i class="icon-diamond"></i>
                    <span class="title">新闻</span>
                </a>
            </li>
            <li>
                <a href="javascript:;">
                    <i class="icon-bubble"></i>
                    <span class="title">天气</span>
                </a>
            </li>
            <li>
                <a href="javascript:;">
                    <i class="icon-settings"></i>
                    <span class="title">待办事项</span>
                </a>
            </li>
        </ul>
        <!-- END SIDEBAR MENU -->
    </div>
</div>
<!-- END SIDEBAR -->
