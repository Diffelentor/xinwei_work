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

    <link rel="shortcut icon" href="../dataTables/favicon.ico"/>
</head>
<body class="page-header-fixed page-quick-sidebar-over-content page-full-width page-boxed">
<%@include file="../../home/frame/frame_header.jsp"%>
<div class="clearfix">
</div>
<!-- BEGIN CONTAINER -->
<div class="page-container">
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">
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
            <input type="hidden" id="page_id" name="page_id" value="shares_data">
            <div class="row" id="record_query_setup">
                <div class="form-group">
                    <label class="control-label col-sm-1" style="font-size: 18px">股票代号</label>
                    <div class="col-md-2">
                        <input id="shares_id" type="text" class="form-control" value="" placeholder="请输入股票代号"/>
                    </div>
                    <label class="control-label col-sm-1" style="font-size: 18px">股票名称</label>
                    <div class="col-md-2">
                        <input id="shares_name" type="text" class="form-control" value="" placeholder="请输入股票名称"/>
                    </div>
                    <label class="control-label col-sm-1" style="font-size: 18px">日期</label>
                    <div class="col-md-2">
                        <input id="date" type="text" class="form-control" value="" placeholder="请输入日期"/>
                    </div>
                    <div class="col-md-2">
                        <button type="button"   class="btn blue" id="query_button" name="query_button">
                        <i class="fa fa-search"></i>搜索</button>
                        <button type="button"   class="btn default" id="remake_button" name="remake_button">
                            <i class="fa fa-refresh"></i>重置</button>
                    </div>

                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-md-12">
                    <%--                    如果不将type类型定义为buton的话会被默认为submit类型--%>
                    <button type="button"  class="btn btn-circle btn-lg default" id="export_button" name="export_button">
                        <i class="fa fa-cloud-download"></i> 导出</button>
                    <button type="button" class="btn btn-circle btn-lg blue" id="table_button" name="table_button">
                        <i class="icon-bar-chart"></i> 统计</button>
                    <button type="button" class="btn btn-circle btn-lg green" id="table_print_button" name="table_print_button">
                        <i class="fa fa-print"></i> 打印</button>
                    <div style="float:right;">
                        <button type="button" style="float: right"  class="btn default" id="refresh_button" name="history_button">
                            <i class="fa fa-refresh"></i></button>
                        <button type="button"   class="btn green" id="show_futures" name="show_futures">
                            <i class="fa fa-search"></i>期货</button>
                        <button type="button"   class="btn green" id="show_shares" name="show_shares">
                            <i class="fa fa-search"></i>股票</button>
                        <button type="button"   class="btn green" id="show_exchange" name="show_exchange">
                            <i class="fa fa-search"></i>外汇</button>
                    </div>
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
                            <th>
                                交易额
                            </th>
                            <th>
                                更新时间
                            </th>
                            <th>
                                状态
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
<%@include file="../../share/shares/shares_download_div.jsp"%>
<%@include file="../../share/shares/buy_div.jsp"%>
<script src="sharesData.js"></script>
</body>
<!-- END BODY -->
</html>
