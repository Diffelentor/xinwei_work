<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="modal fade bs-modal-lg" id="record_reply_div" name="record_reply_div" tabindex="-1" role="basic" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title">建议回复</h4>
            </div>
            <div class="modal-body">
                <div class="portlet-body form">
                    <form action="#" id="form-username" class="form-horizontal form-bordered">
                        <div class="form-group last">
                            <div class="col-md-12">
                                <input type="hidden" id="advice_id" name="advice_id">
                                <textarea class="form-control" rows="6" placeholder="请输入您的回复" id="reply_input" name="reply_input"></textarea>
                                <p class="help-block">
                                    请在上方输入您的回复
                                </p>
                            </div>
                        </div>
                        <div class="form-actions">
                            <div class="row">
                                <div class="col-md-offset-9 col-md-3">
                                    <button type="submit" class="btn red" id="submit_button" name="submit_button"><i class="fa fa-check"></i>提交</button>
                                    <button type="button" class="btn default" data-dismiss="modal">取消</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
