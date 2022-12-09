<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--修改页面的小窗，被包含在manageFuturesData.jsp里，默认隐藏--%>
<div class="modal bs-example-modal-lg" id="weather_statis_div" tabindex="-1">

    <div class="modal-dialog modal-lg">
        <div class="modal-content"  style="width: 750px">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title">近一小时天气信息统计</h4>
            </div>
            <div class="modal-body">
                <div id="statis_main" style="width: 700px;height:400px;"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn default" data-dismiss="modal">取消</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>