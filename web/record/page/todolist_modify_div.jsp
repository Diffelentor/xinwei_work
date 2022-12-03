<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--修改页面的小窗，被包含在manageFuturesData.jsp里，默认隐藏--%>
<div class="modal fade draggable-modal" id="todolist_modify_div" tabindex="-1" role="basic" aria-hidden="true">

    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title">待办事项信息修改</h4>
            </div>
            <div class="modal-body">
                <div class="portlet-body form">
                    <form class="form-horizontal" role="form">
                        <div class="form-body">
                            <div class="form-group">
                                <label class="col-md-3 control-label">*内容</label>
                                <div class="col-md-9">
                                    <input type="hidden" id="id" name="id" value="">
                                    <input type="text" class="form-control" placeholder="请填写内容" id="content" name="content">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label">截止时间</label>
                                <div class="col-md-9">
                                    <input type="date" id="deadline"  class="form-control"/>
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