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
	<title>期货交易系统</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
	<meta http-equiv="Content-type" content="text/html; charset=utf-8">
	<meta content="" name="description"/>
	<meta content="" name="author"/>

	<%@include file="../../home/frame/frame_style.jsp"%>
	<link rel="stylesheet" type="text/css" href="../dataTables/dataTables.bootstrap.css"/>
	<link rel="stylesheet" type="text/css" href="../../assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css"/>
	<!-- END THEME STYLES -->

	<link rel="shortcut icon" href="../dataTables/favicon.ico"/>
</head>
<body class="page-header-fixed page-quick-sidebar-over-content page-full-width ">
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
				天气管理
			</h3>
			<div class="page-bar">
				<ul class="page-breadcrumb">
					<li>
						<i class="fa fa-home"></i>
						<a href="index.html">首页</a>
						<i class="fa fa-angle-right"></i>
					</li>
					<li>
						<a href="#">天气</a>
					</li>
				</ul>
			</div>
			<!-- END PAGE HEADER-->
			<!-- BEGIN PAGE CONTENT-->
			<!--页面开始=======================================================-->
			<!--设置页面ID-->
			<input type="hidden" id="page_id" name="page_id" value="manage_weather_data">
			<div class="row" id="record_query_setup">
				<div class="form-group">
					<label class="control-label col-sm-1" style="font-size: 18px">城市</label>
					<div class="col-md-2">
						<input id="city" type="text" class="form-control" value="" placeholder="请输入城市"/>
					</div>
					<div class="col-md-2">
						<button type="button"   class="btn blue" id="query_button" name="query_button">
							<i class="fa fa-search"></i>搜索</button>
						<button type="button"   class="btn default" id="reset_button" name="reset_button">
							<i class="fa fa-refresh"></i>重置</button>
					</div>

				</div>
			</div>
			<br>
			<div class="row">
				<div class="col-md-10 ">
					<%--                    如果不将type类型定义为buton的话会被默认为submit类型--%>
					<button type="button"  class="btn btn-circle btn-lg yellow-crusta" id="newquery_button" name="newquery_button">
						<i class="fa fa-search"></i>查询最新天气</button>
						<button type="button"  class="btn btn-circle btn-lg default" id="export_button" name="export_button">
							<i class="fa fa-cloud-download"></i> 导出</button>
						<button type="button"  class="btn btn-circle btn-lg blue" id="statis_button" name="statis_button">
							<i class="icon-bar-chart"></i>统计</button>
					<button type="button"  class="btn btn-circle btn-lg red-pink" id="delete_button" name="delete_button">
                                <span class="glyphicon glyphicon-remove-sign">
                                    </span> 删除</button>
				</div>
				<div class="col-md-2">
					<button type="button" style="float: right"  class="btn default" id="refresh_button" name="history_button">
						<i class="fa fa-refresh"></i></button>
				</div>
			</div>
			<br>
			<div class="row" id="datatable_tab">
				<div class="col-md-12 ">
					<table class="table table-striped table-bordered table-hover datatable" id="record_list">
						<thead>
						<tr>
							<th class="table-checkbox"><input type="checkbox" class="group-checkable" data-set="#record_list .checkboxes" /></th>
							<th>
								城市
							</th>
							<th>
								温度
							</th>
							<th>
								天气
							</th>
							<th>
								风力
							</th>
							<th>
								创建时间
							</th>
							<th>
								操作
							</th>
						</tr>
						</thead>
					</table>
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
<script src="weatherData.js"></script>
<script type="text/javascript" src="../../assets/global/plugins/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="../../assets/global/plugins/echarts.js"></script>
<script type="text/javascript" src="../../assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
</body>
<!-- END BODY -->
</html>
<%@include file="weather_statis_div.jsp"%>
<%@include file="weather_query_div.jsp"%>
<%@include file="weather_modify_div.jsp"%>
