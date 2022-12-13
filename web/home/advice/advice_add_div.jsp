<%--
  Created by IntelliJ IDEA.
  User: Diffelentor
  Date: 2022/10/17
  Time: 8:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="modal fade bs-modal-lg" id="record_add_div" name="record_add_div" tabindex="-1" role="basic" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title">填写建议</h4>
            </div>
            <div class="modal-body">
                <div class="portlet-body form">
                    <form action="#" id="form-username" class="form-horizontal form-bordered">
                        <div class="form-group last">
                            <div class="col-md-12">
                                <textarea class="form-control" rows="6" placeholder="请输入您的建议" id="complain_input" name="complain_input"></textarea>
                                <p class="help-block">
                                    请在上方输入您的建议
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