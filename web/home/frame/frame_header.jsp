<%--
  Created by IntelliJ IDEA.
  User: Diffelentor
  Date: 2022/12/3
  Time: 15:39
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="page-header navbar navbar-fixed-top" id="page_header_wrapper">
    <!-- BEGIN HEADER INNER -->
    <div class="page-header-inner">
        <!-- BEGIN LOGO -->
        <div class="page-logo">
            <a href="../../home/main/index.jsp">
                <img src="../../assets/admin/layout/img/logo.png" alt="logo" class="logo-default"/>
            </a>
        </div>
        <!-- END LOGO -->
        <!-- BEGIN HORIZANTAL MENU -->
        <!-- DOC: Apply "hor-menu-light" class after the "hor-menu" class below to have a horizontal menu with white background -->
        <!-- DOC: This is desktop version of the horizontal menu. The mobile version is defined(duplicated) sidebar menu below. So the horizontal menu has 2 seperate versions -->
        <div class="hor-menu hidden-sm hidden-xs">
            <ul class="nav navbar-nav">
                <!-- DOC: Remove data-hover="dropdown" and data-close-others="true" attributes below to disable the horizontal opening on mouse hover -->
                <li class="classic-menu-dropdown">
                    <a href="../../home/main/index.jsp">
                        <i class="icon-home"></i>
                        首页
                        <span class="selected"></span>
                    </a>
                </li>
                <li class="classic-menu-dropdown">
                    <a data-toggle="dropdown" href="javascript:;" data-hover="megamenu-dropdown" data-close-others="true">
                        用户信息 <i class="fa fa-angle-down"></i>
                    </a>
                    <ul class="dropdown-menu pull-left">
                        <li>
                            <a href="../../home/user/user_list.jsp">
                                <i class="icon-tag"></i>
                                用户信息</a>
                        </li>
                        <li>
                            <a href="../../home/user/user_profile.jsp">

                                <i class="icon-home"></i>
                                个人空间</a>
                        </li>
                    </ul>
                </li>
                <li class="mega-menu-dropdown">
                    <a data-toggle="dropdown" href="javascript:;" class="dropdown-toggle" data-hover="megamenu-dropdown" data-close-others="true">
                        金融数据 <i class="fa fa-angle-down"></i>
                    </a>
                    <ul class="dropdown-menu" style="min-width: 400px;">
                        <li>
                            <!-- Content container to add padding -->
                            <div class="mega-menu-content">
                                <div class="row">
                                    <div class="col-md-6">
                                        <ul class="mega-menu-submenu">
                                            <li>
                                                <h3>金融数据</h3>
                                            </li>
                                            <li>
                                                <a href="../../maintain/trade/futuresData.jsp">
                                                    <i class="fa fa-bookmark-o"></i> 数据一览 </a>
                                            </li>
                                            <li id="managerTrade" name="managerTrade">
                                                <a href="../../maintain/manageTrade/manageFuturesData.jsp">
                                                    <i class="fa fa-bookmark-o"></i> 数据管理 </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="col-md-6">
                                        <ul class="mega-menu-submenu">
                                            <li>
                                                <h3>持仓</h3>
                                            </li>
                                            <li>
                                                <a href="../../maintain/control/position.jsp">
                                                    <i class="icon-basket"></i>
                                                    我的持仓</a>
                                            </li>
                                            <li>
                                                <a href="../../maintain/control/history.jsp">
                                                    <i class="icon-wallet"></i>
                                                    交易记录</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>

                <li class="classic-menu-dropdown ">
                    <a href="../../news/page/news.jsp">
                        <i class="icon-home"></i>
                        <span class="title">新闻</span>
                    </a>
                </li>
                <li class="classic-menu-dropdown ">
                    <a href="../../weather/page/index.jsp">
                        <i class="icon-home"></i>
                        <span class="title">天气</span>
                    </a>
                </li>
                <li class="classic-menu-dropdown ">
                    <a href="../../record/page/index.jsp">
                        <i class="icon-home"></i>
                        <span class="title">待办事项</span>
                    </a>
                </li>
                <li class="classic-menu-dropdown">
                    <a data-toggle="dropdown" href="javascript:;" data-hover="megamenu-dropdown" data-close-others="true">
                        More <i class="fa fa-angle-down"></i>
                    </a>
                    <ul class="dropdown-menu pull-left">
                        <li>
                            <a href="../../home/complain/complain_list.jsp">
                                <i class="fa fa-bookmark-o"></i>投诉</a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <i class="fa fa-user"></i> Section 2 </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <i class="fa fa-puzzle-piece"></i> Section 3 </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <i class="fa fa-gift"></i> Section 4 </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <i class="fa fa-table"></i> Section 5 </a>
                        </li>
                        <li class="dropdown-submenu">
                            <a href="javascript:;">
                                <i class="fa fa-envelope-o"></i> More options </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <a href="javascript:;">
                                        Second level link </a>
                                </li>
                                <li class="dropdown-submenu">
                                    <a href="javascript:;">
                                        More options </a>
                                    <ul class="dropdown-menu">
                                        <li>
                                            <a href="index.html">
                                                Third level link </a>
                                        </li>
                                        <li>
                                            <a href="index.html">
                                                Third level link </a>
                                        </li>
                                        <li>
                                            <a href="index.html">
                                                Third level link </a>
                                        </li>
                                        <li>
                                            <a href="index.html">
                                                Third level link </a>
                                        </li>
                                        <li>
                                            <a href="index.html">
                                                Third level link </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="index.html">
                                        Second level link </a>
                                </li>
                                <li>
                                    <a href="index.html">
                                        Second level link </a>
                                </li>
                                <li>
                                    <a href="index.html">
                                        Second level link </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- END HORIZANTAL MENU -->
        <!-- BEGIN HEADER SEARCH BOX -->
        <!-- DOC: Apply "search-form-expanded" right after the "search-form" class to have half expanded search box -->
        <form class="search-form" action="extra_search.html" method="GET">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Search..." name="query">
                <span class="input-group-btn">
				<a href="javascript:;" class="btn submit"><i class="icon-magnifier"></i></a>
				</span>
            </div>
        </form>
        <!-- END HEADER SEARCH BOX -->
        <!-- BEGIN RESPONSIVE MENU TOGGLER -->
        <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse">
        </a>
        <!-- END RESPONSIVE MENU TOGGLER -->
        <!-- BEGIN TOP NAVIGATION MENU -->
        <div class="top-menu">
            <ul class="nav navbar-nav pull-right">
                <!-- BEGIN NOTIFICATION DROPDOWN -->
                <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
                <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
                <li class="dropdown dropdown-user">
                    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                        <img alt="" class="img-circle" src="../../home/user/向晚.jpg"/>
                        <span class="username username-hide-on-mobile" id="const_username" name="const_username" >游客</span>
                        <input type="hidden" id="const_username1" name="const_username1" value="游客"/>
                        <input type="hidden" id="const_identity1" name="const_identity1" value="游客"/>
                        <input type="hidden" id="const_id1" name="const_id1" value=""/>
                        <input type="hidden" id="const_balance1" name="const_balance1" value="0"/>
                        <input type="hidden" id="const_password1" name="conconst_password_id1" value=""/>
                        <input type="hidden" id="const_email1" name="const_email1" value=""/>
                        <i class="fa fa-angle-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-default">
                        <li>
                            <a href="../../home/user/user_profile.jsp">
                                <i class="icon-user"></i> 个人空间 </a>
                        </li>
                        <li>
                            <a href="../../record/page/index.jsp">
                                <i class="icon-calendar"></i> 待办事项 </a>
                        </li>
                        <li>
                            <a href="../../maintain/control/position.jsp">
                                <i class="icon-rocket"></i> 我的持仓 <span class="badge badge-success">
							7 </span>
                            </a>
                        </li>
                        <li class="divider">
                        </li>
                        <li>
                            <a href="extra_lock.html">
                                <i class="icon-lock"></i> Lock Screen </a>
                        </li>
                        <li>
                            <a href="javascript:Get_Session.logout();">
                                <i class="icon-key"></i> Log Out </a>
                        </li>
                    </ul>
                </li>
                <!-- END USER LOGIN DROPDOWN -->
            </ul>
        </div>
        <!-- END TOP NAVIGATION MENU -->
    </div>
    <!-- END HEADER INNER -->
</div>
