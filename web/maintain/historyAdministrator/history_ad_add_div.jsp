<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--添加页面的小窗，默认隐藏--%>
<div class="modal fade draggable-modal" id="history_ad_add_div" tabindex="-1" role="basic" aria-hidden="true">
    <div class="modal-dialog">
        <div class="portlet light bordered">
            <div class="portlet-title">
                <div class="caption font-green">
                    <i class="icon-pin font-green"></i>
                    <span class="caption-subject bold uppercase"> 添加记录</span>
                </div>
            </div>
            <div class="portlet-body form">
                <form role="form">
                    <div class="form-body">
                        <div class="form-group form-md-line-input form-md-floating-label has-success">
                            <input type="text" class="form-control" id="user_name">
                            <label for="form_control_1">用户名</label>
                            <span class="help-block font-red display-none" id="reminder">
											用户名不能为空</span>
                        </div>
                        <div class="form-group form-md-line-input form-md-floating-label has-success">
                            <input type="text" class="form-control" id="futures_id">
                            <label for="form_control_1">期货代号</label>
                        </div>
                        <div class="form-group form-md-line-input form-md-floating-label has-success">
                            <input type="text" class="form-control" id="futures_name">
                            <label for="form_control_1">期货名称</label>
                        </div>
                        <div class="form-group form-md-line-input form-md-floating-label has-success">
                            <input type="text" class="form-control" id="type">
                            <label for="form_control_1">类型</label>
                        </div>
                        <div class="form-group form-md-line-input form-md-floating-label has-success">
                            <input type="text" class="form-control" id="price_bought">
                            <label for="form_control_1">买入时价格</label>
                        </div>
                        <div class="form-group form-md-line-input form-md-floating-label has-success">
                            <input type="text" class="form-control" id="amount">
                            <label for="form_control_1">数量</label>
                        </div>
                        <div class="form-group form-md-line-input form-md-floating-label has-success">
                            <input type="text" class="form-control" id="forward">
                            <label for="form_control_1">交易方向</label>
                        </div>
                        <div class="form-group form-md-line-input form-md-floating-label has-success">
                            <input type="text" class="form-control" id="price_sale">
                            <label for="form_control_1">卖出时价格</label>
                        </div>
                        <div class="form-group form-md-line-input form-md-floating-label has-error display-none">
                            <input type="text" class="form-control" readonly value="You can't edit this" id="form_control_1">
                            <label for="form_control_1"></label>
                        </div>
                    </div>
                    <div class="form-actions noborder">
                        <button type="button" class="btn blue" id="submit">添加</button>
                        <button type="button" class="btn default" id="cancel">取消</button>
                    </div>
                </form>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>