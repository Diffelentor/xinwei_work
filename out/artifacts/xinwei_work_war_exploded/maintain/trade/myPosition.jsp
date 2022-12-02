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
    <link rel="stylesheet" type="text/css" href="dataTables/dataTables.bootstrap.css"/>
    <!-- END THEME STYLES -->

    <link rel="shortcut icon" href="../device/favicon.ico"/>
</head>
<body class="page-header-fixed page-quick-sidebar-over-content ">
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
                我的持仓
            </h3>
            <div class="page-bar">
                <ul class="page-breadcrumb">
                    <li>
                        <i class="fa fa-home"></i>
                        <a href="index.html">首页</a>
                        <i class="fa fa-angle-right"></i>
                    </li>
                    <li>
                        <a href="#">持仓管理</a>
                        <i class="fa fa-angle-right"></i>
                    </li>
                    <li>
                        <a href="#">我的持仓</a>
                    </li>
                </ul>
            </div>
            <!-- END PAGE HEADER-->
            <!-- BEGIN PAGE CONTENT-->
            <!--页面开始=======================================================-->
            <!--设置页面ID-->
            <input type="hidden" id="page_id" name="page_id" value="futures_data">
            <div class="row">
                <div class="form-group">
                    <label class="control-label col-sm-1" style="font-size: 18px">期货代号</label>
                    <div class="col-md-2">
                        <input id="futures_number" type="text" class="form-control" value="" placeholder="请输入期货代号"/>
                    </div>
                    <label class="control-label col-sm-1" style="font-size: 18px">期货名称</label>
                    <div class="col-md-2">
                        <input id="futures_name" type="text" class="form-control" value="" placeholder="请输入期货名称"/>
                    </div>
                    <label class="control-label col-sm-1" style="font-size: 18px">账户</label>
                    <div class="col-md-2">
                        <input id="futures_user" type="text" class="form-control" value="" placeholder="请输入账户"/>
                    </div>
                    <div class="col-md-2">
                        <button type="button"   class="btn blue" id="search_button" name="search_button">
                            <i class="fa fa-search"></i>搜索</button>
                        <button type="button"   class="btn default" id="remake_button" name="remake_button">
                            <i class="fa fa-refresh"></i>重置</button>
                    </div>

                </div>
            </div>
            <div class="portlet box green-haze">
                <div class="portlet-body">

                    <br>
                    <br>
<%--                    按钮--%>
                    <div class="row">
                        <div class="col-md-10 ">
                            <%--                    如果不将type类型定义为buton的话会被默认为submit类型--%>
                            <button type="button"  class="btn btn-circle btn-lg default" id="datatable_button" name="datatable_button">
                                <i class="fa fa-cloud-download"></i> 导出</button>
                            <button type="button" class="btn btn-circle btn-lg blue" id="table_button" name="table_button">
                                <i class="icon-bar-chart"></i> 统计</button>
                            <button type="button" class="btn btn-circle btn-lg green" id="bar_button" name="bar_button">
                                <i class="fa fa-print"></i> 打印</button>
                        </div>
                        <div class="col-md-2">
                            <button type="button" style="float: right"  class="btn btn-lg default" id="history_button" name="history_button">
                                 历史记录</button>
                        </div>
                    </div>
                    <br>
                    <table class="table table-striped table-bordered table-hover" id="sample_5">
                        <thead>
                        <tr class="sorting">
                            <th>
                                期货代号
                            </th>
                            <th>
                                期货名称
                            </th>
                            <th>
                                期货类型
                            </th>
                            <th>
                                价格
                            </th>
                            <th >
                                数量
                            </th>
                            <th>
                                账户
                            </th>
                            <th>
                                交易方向
                            </th>
                            <th>
                                操作日期
                            </th>
                            <th>
                                操作
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                XAG
                            </td>
                            <td>
                                伦敦银（现货白银）
                            </td>
                            <td>
                                金属
                            </td>
                            <td>
                                24.37
                            </td>
                            <td>
                                100
                            </td>
                            <td>
                                43
                            </td>
                            <td>
                                开仓
                            </td>
                            <td>
                                2022-10-21 18:32:20
                            </td>
                            <td>
                                <a href="javascript:Page.onModifyRecord('+full.id+')">卖出</a>
                            </td>
                        </tr>


                        </tbody>
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
<script type="text/javascript" src="dataTables/jquery.dataTables.min.js"></script>
<script src="futuresData.js"></script>
<%--菜单栏的操作--%>
</body>
<!-- END BODY -->
</html>