
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="modal fade draggable-modal" id="comment_reply_div" name="comment_reply_div" tabindex="-1" role="basic" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title">回复评论</h4>
            </div>
            <div class="modal-body">
                <div class="portlet-body form">
                    <form class="form-horizontal" role="form">
                        <div class="form-body">
                            <div class="form-group">
                                <label class="col-md-3 control-label">昵称</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Enter text" id="reply_name" name="reply_name">
                                    <span class="help-block">
											请填写 </span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label">回复内容</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Enter text" id="reply_content" name="reply_content">
                                    <span class="help-block">
											请填写 </span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn default" data-dismiss="modal">取消</button>
                <button type="button" class="btn blue" id="submit_button" name="submit_button">发送</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>