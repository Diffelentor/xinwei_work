<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--修改页面的小窗，被包含在manageFuturesData.jsp里，默认隐藏--%>
<div class="modal fade draggable-modal" id="weather_modify_div" tabindex="-1" role="basic" aria-hidden="true">

    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title">天气信息修改</h4>
            </div>
            <div class="modal-body">
                <div class="portlet-body form">
                    <form class="form-horizontal" role="form">
                        <div class="form-body">
                            <div class="form-group">
                                <label class="col-md-3 control-label">*城市</label>
                                <div class="col-md-9">
                                    <input type="hidden" id="id" name="id" value="">
                                    <input type="text" class="form-control" placeholder="请填写城市" id="city" name="city">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label">*温度</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="请填写温度" id="temperature" name="temperature">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label">*天气</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="请填写天气" id="humidity" name="humidity">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label">*风力</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="请填写风力" id="wind" name="wind">
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn default" data-dismiss="modal">取消</button>
                <button type="button" class="btn blue" id="submit_button" name="submit_button">确认修改</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>