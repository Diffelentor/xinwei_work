<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--修改页面的小窗，被包含在manageFuturesData.jsp里，默认隐藏--%>
<div class="modal fade draggable-modal" id="futures_modify_div" tabindex="-1" role="basic" aria-hidden="true">

    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title">设备信息修改</h4>
            </div>
            <div class="modal-body">
                <div class="portlet-body form">
                    <form class="form-horizontal" role="form">
                        <div class="form-body">
                            <div class="form-group">
                                <label class="col-md-3 control-label">*代号</label>
                                <div class="col-md-9">
                                    <input type="hidden" id="id" name="id" value="">
                                    <input type="text" class="form-control" placeholder="请填写代号" id="futures_id" name="futures_id">
                                    <span class="help-block font-red display-none" id="reminder">
											代号不能为空</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label">名称</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="请填写名称" id="futures_name" name="futures_name">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label">开盘价</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="请填写开盘价" id="price_today_begin" name="price_today_begin">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label">昨结算</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="请填写昨结算" id="price_yesterday" name="price_yesterday">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label">最新价</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="请填写最新价" id="price_right_now" name="price_right_now">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label">最高价</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="请填写最高价" id="price_high" name="price_high">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label">最低价</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="请填写最低价" id="price_low" name="price_low">
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