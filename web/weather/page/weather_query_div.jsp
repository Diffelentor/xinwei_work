<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--添加页面的小窗，被包含在manageFuturesData.jsp里，默认隐藏--%>
<div class="modal fade draggable-modal  bs-example-modal-lg" id="weather_query_div" tabindex="-1" role="basic" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content" style="width: 750px;">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                <h4 class="modal-title">查询最新天气</h4>
            </div>
            <div class="modal-body">
                <div class="portlet-body form">
                    <div>
                        <div class="row" id="weather_query_setup">
                            <div class="form-group">
                                <label class="control-label col-sm-2" style="font-size: 18px">城市</label>
                                <div class="col-md-3">
                                    <input id="city_new" type="text" class="form-control" value="" placeholder="请输入城市"/>
                                </div>
                                <div class="col-md-4">
                                    <button type="button"   class="btn blue" id="query_new_button" name="query_button">
                                        <i class="fa fa-search"></i>搜索</button>
                                    <button type="button"   class="btn default" id="reset_new_button" name="remake_button">
                                        <i class="fa fa-refresh"></i>重置</button>
                                </div>

                            </div>
                        </div>
                        <br/>
                        <br/>
                        <div class="row" id="datatable_tab">
                            <div class="col-md-13 ">
                                <table class="table table-striped table-bordered table-hover datatablenew" id="record_new_list">
                                    <thead>
                                    <tr>
                                        <th>
                                            城市
                                        </th>
                                        <th>
                                            温度
                                        </th>
                                        <th>
                                            天气
                                        </th>
                                        <th>
                                            风力
                                        </th>
                                        <th>
                                            创建时间
                                        </th>
                                        <th>
                                            操作
                                        </th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn default" data-dismiss="modal">取消</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<script type="text/javascript">

</script>