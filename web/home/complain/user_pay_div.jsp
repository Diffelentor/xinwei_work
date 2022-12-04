<%--
  Created by IntelliJ IDEA.
  User: Diffelentor
  Date: 2022/10/17
  Time: 8:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="modal fade draggable-modal" id="user_pay_div" name="user_pay_div" tabindex="-1" role="basic" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title">账户充值</h4>
            </div>
            <div class="modal-body">
                <div class="portlet-body form">
                    <form class="form-horizontal" role="form">
                        <div class="form-body">
                            <div class="form-group">
                                <label class="col-md-3 control-label">充值金额</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="请填写要充值的金额" id="pay_money" name="pay_money">
                                </div>
                            </div>
                        </div>
                        <div class="form-body">
                            <div class="form-group">
                                <label class="col-md-3 control-label">用户密码</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="请填写用户密码" id="pay_password" name="pay_password">
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn default" data-dismiss="modal">取消</button>
                <button type="button" class="btn blue" id="pay_submit_button" name="pay_submit_button">确认充值</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
