<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
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
        答复率图
      </h3>
      <!-- END PAGE HEADER-->
      <!-- BEGIN PAGE CONTENT-->
      <!--页面开始=======================================================-->
      <!--设置页面ID-->
      <input type="hidden" id="page_id" name="page_id" value="advice_statistic">
      <div class="row">
        <button class="btn btn-lg" id="return_button"><i class="icon-arrow-left"></i></button>
      </div>
      <div class="row">
        <div class="col-md-12">
          <!-- BEGIN CHART PORTLET-->
          <div class="portlet light bordered">
            <div class="portlet-title">
              <div class="caption">
                <i class="icon-bar-chart font-green-haze"></i>
                <span class="caption-subject bold uppercase font-green-haze"> 建议管理</span>
                <span class="caption-helper">建议回复率统计</span>
              </div>
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
<script src="advice.js"></script>
</body>
<!-- END BODY -->
</html>
