<%--
  Created by IntelliJ IDEA.
  User: Diffelentor
  Date: 2022/10/17
  Time: 8:31
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="modal fade draggable-modal" id="record_modify_div" name="record_modify_div" tabindex="-1" role="basic" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title">用户信息修改</h4>
            </div>
            <div class="modal-body">
                <div class="portlet-body form">
                    <form class="form-horizontal" role="form">
                        <div class="form-body">
                            <div class="form-group hide">
                                <label class="col-md-3 control-label">id</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Enter text" id="id" name="id">
                                    <span class="help-block">
											请填写要修改的id </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label">用户名</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Enter text" id="username" name="username">
                                    <span class="help-block">
											请填写要修改的用户名 </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label">用户密码</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Enter text" id="password" name="password">
                                    <span class="help-block">
											请填写要修改的用户密码 </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label">用户邮箱</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Enter text" id="email" name="email">
                                    <span class="help-block">
											请填写要修改的用户邮箱 </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label">用户身份</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Enter text" id="identity" name="identity">
                                    <span class="help-block">
											请填写要修改的用户身份 </span>
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
