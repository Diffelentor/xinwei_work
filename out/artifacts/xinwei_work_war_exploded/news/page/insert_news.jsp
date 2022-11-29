<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2022/11/8
  Time: 20:50
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>发表文章</title>
    <%@include file="frame_style.jsp"%>
</head>
<body>
<div>
    <div class="portlet light bg-inverse">
        <div class="portlet-title">
            <div class="caption">
                <i class="icon-equalizer font-red-sunglo"></i>
                <span class="caption-subject font-red-sunglo bold uppercase">编辑您要发表的新闻</span>
                <span class="caption-helper">以下为必填内容</span>
            </div>

        </div>
        <div class="portlet-body form">
            <!-- BEGIN FORM-->
            <form action="#" class="form-horizontal">
                <div class="form-body">
                    <div class="form-group">
                        <label class="col-md-3 control-label">作者<span class="required">
													* </span>
                        </label>
                        <div class="col-md-4">
                            <input type="text" class="form-control">
                            <span class="help-block">
														请输入作者名 </span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">新闻标题<span class="required">
													* </span>
                        </label>
                        <div class="col-md-4">
                            <input type="text" class="form-control">
                            <span class="help-block">
														请输入标题名 </span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label">新闻内容<span class="required">
													* </span>
                        </label>
                        <div class="col-md-4">
                            <input type="text" style="height: 300px; width: 800px">
                            <span class="help-block">
														请编辑内容 </span>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <div class="row">
                        <div class="col-md-offset-3 col-md-4">
                            <button type="submit" class="btn green">提交</button>
                            <button type="button" class="btn default">取消并返回首页</button>
                        </div>
                    </div>
                </div>
            </form>
            <!-- END FORM-->
        </div>
    </div>
</div>


<%@include file="frame_javascript.jsp"%>

</body>
</html>
