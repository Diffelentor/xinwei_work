<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--注意事项：不加第一行的这个东西会造成中文乱码--%>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
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

    <link rel="shortcut icon" href="../dataTables/favicon.ico"/>
</head>
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
            <%@include file="../../home/frame/frame_page_header.jsp"%>
            <h3 class="page-title">
                统计图
            </h3>
            <!-- END PAGE HEADER-->
            <!-- BEGIN PAGE CONTENT-->
            <!--页面开始=======================================================-->
            <!--设置页面ID-->
            <input type="hidden" id="page_id" name="page_id" value="news_statistic">
            <div class="row">
                <div class="col-md-12">
                    <!-- BEGIN CHART PORTLET-->
                    <div class="portlet light bordered">
                        <div class="portlet-title">
                            <div class="caption">
                                <i class="icon-bar-chart font-green-haze"></i>
                                <span class="caption-subject bold uppercase font-green-haze"> 新闻统计</span>
                                <span class="caption-helper">录入新闻数量统计</span>
                            </div>
                            <button type="button" style="position: relative; left: 76%" class="btn green" id="return_button" name="return_button" onclick="javascript:history.back(-1)">
                                <i class="fa fa-refresh"></i>返回</button>
                            <div class="tools">
                                <a href="javascript:;" class="collapse">
                                </a>
                                <a href="#portlet-config" data-toggle="modal" class="config">
                                </a>
                                <a href="javascript:;" class="reload">
                                </a>
                                <a href="javascript:;" class="fullscreen">
                                </a>
                                <a href="javascript:;" class="remove">
                                </a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div id="chart_1" class="chart" style="height: 500px;">
                            </div>
                        </div>
                    </div>
                    <!-- END CHART PORTLET-->
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
<!-- BEGIN PAGE LEVEL PLUGINS -->
<script src="../../assets/global/plugins/amcharts/amcharts/amcharts.js" type="text/javascript"></script>
<script src="../../assets/global/plugins/amcharts/amcharts/serial.js" type="text/javascript"></script>
<script src="../../assets/global/plugins/amcharts/amcharts/pie.js" type="text/javascript"></script>
<script src="../../assets/global/plugins/amcharts/amcharts/radar.js" type="text/javascript"></script>
<script src="../../assets/global/plugins/amcharts/amcharts/themes/light.js" type="text/javascript"></script>
<script src="../../assets/global/plugins/amcharts/amcharts/themes/patterns.js" type="text/javascript"></script>
<script src="../../assets/global/plugins/amcharts/amcharts/themes/chalk.js" type="text/javascript"></script>
<!-- END PAGE LEVEL PLUGINS -->
<script type="text/javascript" src="../dataTables/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="../../resource/js/echarts.min.js"></script>
<script src="news_statistics.js"></script>
</body>
<!-- END BODY -->
</html>

