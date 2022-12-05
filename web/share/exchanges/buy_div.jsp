<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--添加页面的小窗，默认隐藏--%>
<div class="modal fade draggable-modal" id="buy_div" tabindex="-1" role="basic" aria-hidden="true">
    <div class="modal-dialog">
        <div class="portlet light bordered">
            <div class="portlet-title">
                <div class="caption font-green">
                    <i class="icon-pin font-green"></i>
                    <span class="caption-subject bold uppercase"> 买入</span>
                </div>
            </div>
            <div class="portlet-body form">
                <form role="form">
                    <div class="form-body">
                        <div class="form-group form-md-line-input form-md-floating-label has-error">
                            <input type="text" class="form-control" readonly value="You can't edit this" id="exchanges_id">
                            <label for="form_control_1">代号</label>
                        </div>
                        <div class="form-group form-md-line-input form-md-floating-label has-error">
                            <input type="text" class="form-control" readonly value="You can't edit this" id="exchanges_name">
                            <label for="form_control_1">名称</label>
                        </div>
                        <div class="form-group form-md-line-input form-md-floating-label has-error">
                            <input type="text" class="form-control" readonly value="You can't edit this" id="type">
                            <label for="form_control_1">类型</label>
                        </div>
                        <div class="form-group form-md-line-input form-md-floating-label has-error">
                            <input type="text" class="form-control" readonly value="You can't edit this" id="price_right_now">
                            <label for="form_control_1">价格</label>
                        </div>
                        <div class="form-group form-md-line-input form-md-floating-label has-success">
                            <input type="text" class="form-control" id="amount">
                            <label for="form_control_1">买入数量</label>
                            <span class="help-block font-red display-none" id="reminder">
											请输入正整数</span>
                        </div>
                        <div class="form-group form-md-line-input form-md-floating-label has-error display-none">
                            <input type="text" class="form-control" readonly value="You can't edit this" id="form_control_1">
                            <label for="form_control_1"></label>
                        </div>
                    </div>
                    <div class="form-actions noborder">
                        <button type="button" class="btn blue" id="buy_submit">购买</button>
                        <button type="button" class="btn default" data-dismiss="modal">取消</button>
                    </div>
                </form>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>