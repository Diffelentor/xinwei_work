<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--注意事项：不加第一行的这个东西会造成中文乱码--%>
<!DOCTYPE html>
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
    <link rel="stylesheet" type="text/css" href="../dataTables/dataTables.bootstrap.css"/>
    <!-- END THEME STYLES -->

    <link rel="shortcut icon" href="../dataTables/favicon.ico"/>
</head>
<body class="page-header-fixed page-quick-sidebar-over-content page-full-width page-boxed">
<%@include file="../../home/frame/frame_header.jsp"%>
<div class="clearfix">
</div>
<!-- BEGIN CONTAINER -->
<div class="page-container" id="page-container">
    <%@include file="../../home/frame/frame_left_sidebar.jsp"%>
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content" id="page-content">
            <%@include file="../../home/frame/frame_page_header.jsp"%>
            <h3 class="page-title">
                股票数据
            </h3>
            <div class="page-bar">
                <ul class="page-breadcrumb">
                    <li>
                        <i class="fa fa-home"></i>
                        <a href="index.html">首页</a>
                        <i class="fa fa-angle-right"></i>
                    </li>
                    <li>
                        <a href="#">金融信息</a>
                        <i class="fa fa-angle-right"></i>
                    </li>
                    <li>
                        <a href="#">股票数据</a>
                    </li>
                </ul>
            </div>
            <!-- END PAGE HEADER-->
            <!-- BEGIN PAGE CONTENT-->
            <!--页面开始=======================================================-->
            <!--设置页面ID-->
            <input type="hidden" id="page_id" name="page_id" value="shares_list_print_table">
            <div class="row">
                <div class="col-md-12">
                    <!-- BEGIN SAMPLE TABLE PORTLET-->
                    <div class="portlet">
                        <div class="portlet-title">
                            <div class="caption">
                                <i class="fa fa-bell-o"></i>股票数据表
                            </div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse">
                                </a>
                                <a href="javascript:;" class="collapse">
                                </a>
                                <a href="#portlet-config" data-toggle="modal" class="config">
                                </a>
                                <a href="javascript:;" class="reload">
                                </a>
                                <a href="javascript:;" class="remove">
                                </a>
                                <button type="button"   class="btn green" id="return_button" name="return_button" onclick="javascript:history.back(-1)">
                                    <i class="fa fa-refresh"></i>返回</button>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="table-scrollable">
                                <table class="table table-striped table-bordered table-advance table-hover">
                                    <thead>
                                    <tr>
                                        <th>
                                            股票代号
                                        </th>
                                        <th>
                                            股票名称
                                        </th>
                                        <th>
                                            开盘价
                                        </th>
                                        <th >
                                            昨结算
                                        </th>
                                        <th>
                                            最新价
                                        </th>
                                        <th>
                                            最高价
                                        </th>
                                        <th>
                                            最低价
                                        </th>
                                        <th>
                                            价格变化
                                        </th>
                                        <th>
                                            涨跌幅
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
                    <!-- END SAMPLE TABLE PORTLET-->
                </div>
            </div>
            <!--页面结束=======================================================-->
            <!-- END PAGE CONTENT-->
        </div>
    </div>
    <!-- END CONTENT -->
    <%@include file="../../home/frame/frame_right_sidebar.jsp"%>
</div>
<!-- END CONTAINER -->
<%@include file="../../home/frame/frame_footer.jsp"%>

<%@include file="../../home/frame/frame_javascript.jsp"%>
<%--本页专用的--%>
<script type="text/javascript" src="../dataTables/jquery.dataTables.min.js"></script>
<script src="sharesData.js"></script>
</body>
<!-- END BODY -->
</html>

