
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="modal fade draggable-modal" id="comment_modify_div" name="comment_modify_div" tabindex="-1" role="basic" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title">修改评论</h4>
            </div>
            <div class="modal-body">
                <div class="portlet-body form">
                    <form class="form-horizontal" role="form">
                        <div class="form-body">
                            <div class="form-group">
<%--                                <label class="col-md-3 control-label">评论ID</label>--%>
                                <div class="col-md-9">
                                    <input type="hidden" class="form-control" placeholder="Enter text" id="id" name="id">
<%--                                    <span class="help-block">--%>
<%--											请填写 </span>--%>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label">用户名</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Enter text" id="user_name" name="user_name">
                                    <span class="help-block">
											请填写要修改的用户昵称 </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label">评论内容</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Enter text" id="comment" name="comment">
                                    <span class="help-block">
											请修改 </span>
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