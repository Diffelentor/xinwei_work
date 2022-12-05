<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="modal fade draggable-modal" id="shares_download_div" tabindex="-1" role="basic" aria-hidden="true">
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
                                <label class="col-md-3 control-label">下载链接</label>
                                <div class="col-md-9">
                                    <span><a href="" id="download_shares_rar_url" name="download_rar_url">点击下载rar</a></span>
                                    <br>
                                    <span><a href="" id="download_shares_xls_url" name="download_xls_url">点击下载xls</a></span>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn blue" id="finish_download_button">下载完毕</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>