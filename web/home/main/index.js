jQuery(document).ready(function() {
    Metronic.init(); // init metronic core componets
    Layout.init(); // init layout
    QuickSidebar.init(); // init quick sidebar
    Demo.init(); // init demo features
    Page.init();
    //$('.layout-option', panel).val("boxed");
});
var Page = function() {
    var initPageControl=function(){
        initNewsPart();
        initdataBar_left();
        initdataGraph_right();
    };
    var getdate = function (){
        const date  = new Date()
        // 获取当前时间的年月日
        return  dataStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} `
    }

    var initNewsPart=function () {
        getZXRDRecordList();
        getCJXWRecordList();
        getGJXWRecordList();
    }
    var getZXRDRecordList=function () {
        var data = {};
        $.post("../../news_file_servlet_action?action=get_index_zxrd",data,function(json){
            console.log(JSON.stringify(json));
            if(json.result_code == 0){
                var list = json.aaData;
                var html ="";
                if(list!=undefined && list.length>0){
                    for (var i = 0; i < list.length; i++){
                        var record = list[i];
                        html=html+"										<tr>";
                        html=html+"	                                        <td>";
                        html=html+"	                                            <a href=\"javascript:Page.onViewRecord("+record.id+")\">"+record.title+"</a>";
                        html=html+"	                                        </td>";
                        html=html+"	                                        <td>";
                        html=html+"                                            "+record.time;
                        html=html+"                                        </td>";
                        html=html+"                                     </tr>";
                    }
                }
                $("#zxrd_news").html(html);
            }
        });
    }
    var getCJXWRecordList=function () {
        var data = {};
        // data.keywords = $("#record_query_setup #key_word").val();
        $.post("../../news_file_servlet_action?action=get_index_cjxw",data,function(json){
            console.log(JSON.stringify(json));
            if(json.result_code == 0){
                var list = json.aaData;
                var html ="";
                if(list!=undefined && list.length>0){
                    for (var i = 0; i < list.length; i++){
                        var record = list[i];
                        html=html+"										<tr>";
                        html=html+"	                                        <td>";
                        html=html+"	                                            <a href=\"javascript:Page.onViewRecord("+record.id+")\">"+record.title+"</a>";
                        html=html+"	                                        </td>";
                        html=html+"	                                        <td>";
                        html=html+"                                            "+record.time;
                        html=html+"                                        </td>";
                        html=html+"                                     </tr>";
                    }
                }
                $("#cjxw_news").html(html);
            }
        });
    }
    var getGJXWRecordList=function () {
        var data = {};
        // data.keywords = $("#record_query_setup #key_word").val();
        $.post("../../news_file_servlet_action?action=get_index_gjxw",data,function(json){
            console.log(JSON.stringify(json));
            if(json.result_code == 0){
                var list = json.aaData;
                var html ="";
                if(list!=undefined && list.length>0){
                    for (var i = 0; i < list.length; i++){
                        var record = list[i];
                        html=html+"										<tr>";
                        html=html+"	                                        <td>";
                        html=html+"	                                            <a href=\"javascript:Page.onViewRecord("+record.id+")\">"+record.title+"</a>";
                        html=html+"	                                        </td>";
                        html=html+"	                                        <td>";
                        html=html+"                                            "+record.time;
                        html=html+"                                        </td>";
                        html=html+"                                     </tr>";
                    }
                }
                $("#gjxw_news").html(html);
            }
        });
    }
    var onViewRecord=function (id) {
        window.location.href="../../news/page/news_content.jsp?id="+id;
    };

    var initdataBar_left = function () {
        initfuture("futures","file");
        initshare("shares","file");
        initexchange("exchanges","file");
    }
    var initfuture = function (module,sub) {
        var trList = $("#futures").find("tr");
        for (var i=0;i<trList.length;i++) {
            var tdArr = trList.eq(i).find("td");
            var future_id = tdArr.eq(1).text().replace(/[\r\n]/g,"")//代号
            future_id = future_id.replace(/(^\s*)|(\s*$)/g, "");
            var url="../../"+module+"_"+sub+"_servlet_action";
            var data={};
            data.action="get_futures_record"
            data.futures_id=future_id;
            data.date = getdate();
            //post设置同步避免回调时延
            $.ajaxSettings.async = false;
            $.post(url,data,function (json) {
                if (json.result_code==0){
                    //console.log(JSON.stringify(json));
                    var record = json.aaData;
                    record=record[0];
                    var price = record.price_right_now;
                    var html = "";
                    var amplitude = (record.price_right_now - record.price_yesterday) / record.price_yesterday;
                    amplitude = Math.round(amplitude * 100000) / 1000;
                    if (amplitude > 0) {
                        html = '<div class="font-red">' + amplitude + '%</div>';
                    } else {
                        html = '<div class="font-green">' + amplitude + '%</div>';
                    }

                    tdArr.eq(2).text(price);
                    tdArr.eq(3).html(html);
                }else{
                    alert("[onExportRecord]与后端交互错误！"+json.result_smg);
                }
            })
        }
    }
    var initshare = function (module,sub) {
        var trList = $("#shares").find("tr");
        for (var i=0;i<trList.length;i++) {
            var tdArr = trList.eq(i).find("td");
            var share_id = tdArr.eq(1).text().replace(/[\r\n]/g,"")//代号
            share_id = share_id.replace(/(^\s*)|(\s*$)/g, "");
            var url="../../"+module+"_"+sub+"_servlet_action";
            var data={};
            data.action="get_shares_record"
            data.shares_id=share_id;
            data.date = getdate();
            //post设置同步避免回调时延
            $.ajaxSettings.async = false;
            $.post(url,data,function (json) {
                if (json.result_code==0){
                    //console.log(JSON.stringify(json));
                    var record = json.aaData;
                    record=record[0];
                    var price = record.price_right_now;
                    var html = "";
                    var amplitude = (record.price_right_now - record.price_pre) / record.price_pre;
                    amplitude = Math.round(amplitude * 100000) / 1000;
                    if (amplitude > 0) {
                        html = '<div class="font-red">' + amplitude + '%</div>';
                    } else {
                        html = '<div class="font-green">' + amplitude + '%</div>';
                    }

                    tdArr.eq(2).text(price);
                    tdArr.eq(3).html(html);
                }else{
                    alert("[onExportRecord]与后端交互错误！"+json.result_smg);
                }
            })
        }
    }
    var initexchange = function (module,sub) {
        var trList = $("#exchanges").find("tr");
        for (var i=0;i<trList.length;i++) {
            var tdArr = trList.eq(i).find("td");
            var exchange_id = tdArr.eq(1).text().replace(/[\r\n]/g,"")//代号
            exchange_id = exchange_id.replace(/(^\s*)|(\s*$)/g, "");
            var url="../../"+module+"_"+sub+"_servlet_action";
            var data={};
            data.action="get_exchanges_record"
            data.exchanges_id=exchange_id;
            data.date = getdate();
            //post设置同步避免回调时延
            $.ajaxSettings.async = false;
            $.post(url,data,function (json) {
                if (json.result_code==0){
                    //console.log(JSON.stringify(json));
                    var record = json.aaData;
                    record=record[0];
                    var price = record.price_right_now;
                    var html = "";
                    var amplitude = (record.price_right_now - record.price_yesterday) / record.price_yesterday;
                    amplitude = Math.round(amplitude * 100000) / 1000;
                    if (amplitude > 0) {
                        html = '<div class="font-red">' + amplitude + '%</div>';
                    } else {
                        html = '<div class="font-green">' + amplitude + '%</div>';
                    }

                    tdArr.eq(2).text(price);
                    tdArr.eq(3).html(html);
                }else{
                    alert("[onExportRecord]与后端交互错误！"+json.result_smg);
                }
            })
        }
    }

    var initdataGraph_right = function (){
        initdata_shares();
        initdata_futures();
        /*
        var id = $(".tab-pane.active").attr("id");
        if (id == 'portlet_tab1')
            initdata_futures();
        else
            initdata_shares();
         */
    }
    var initdata_futures = function () {
        /*get_data*/
        var buy_amount = [];
        var sell_amount = [];
        var url="../../futures_file_servlet_action";
        var futures_list = ['AU0','AG0','AL2301','CU2301','FU2301','I2301','P2301'];
        for (var i = 0; i < futures_list.length; i++){
            $.ajaxSettings.async = false;
            var data={};
            data.action="get_futures_record"
            data.futures_id=futures_list[i];
            data.date = getdate();
            $.post(url,data,function (json) {
                if (json.result_code==0){
                    //console.log(JSON.stringify(json));
                    var record = json.aaData;
                    record=record[0];
                    buy_amount.push(record.buy_amount);
                    sell_amount.push(-record.sell_amount);
                }else{
                    alert("[onExportRecord]与后端交互错误！"+json.result_smg);
                }
            })
        }
        /*配置echarts*/
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            title: {
                text: '主要期货交易额',
                left: '6%'
            },
            legend: {
                data: ['买入量', '卖出量'],
                left: '70%'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'value'
                }
            ],
            yAxis: [
                {
                    type: 'category',
                    axisTick: {
                        show: false
                    },
                    data: ['黄金连续', '白银连续', '沪铝2301', '沪铜2301', '燃油2301', '铁矿石2301', '棕榈2301']
                }
            ],
            series: [
                {
                    name: '买入量',
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'inside'
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: buy_amount
                },
                {
                    name: '卖出量',
                    type: 'bar',
                    stack: 'Total',
                    label: {
                        show: true,
                        position: 'left'
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: sell_amount
                }
            ]
        };

        var chartDom = document.getElementById('statistics_futures');
        var myChart = echarts.init(chartDom);
        option && myChart.setOption(option);
    }
    var initdata_shares = function () {
        /*get_data*/
        var deal_count = [];
        var deal_amount = [];
        var url="../../shares_file_servlet_action";
        var shares_list = ['sh000001','sh000300','sz399001','sz399006','sz399415'];
        for (var i = 0; i < shares_list.length; i++){
            $.ajaxSettings.async = false;
            var data={};
            data.action="get_shares_record"
            data.shares_id=shares_list[i];
            data.date = getdate();
            $.post(url,data,function (json) {
                if (json.result_code==0){
                    //console.log(JSON.stringify(json));
                    var record = json.aaData;
                    record=record[0];
                    deal_count.push(record.deal_count / 10000);
                    deal_amount.push(record.deal_amount / 1000000);
                }else{
                    alert("[onExportRecord]与后端交互错误！"+json.result_smg);
                }
            })
        }
        /*配置echarts*/
        var option = {
            title: {
                text: '主要国内股市交易额',
                left: '6%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            legend: {
                data: ['交易股数(万股)', '交易额(百万元)']
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['上证指数', '沪深300', '深证成指', '创业板指', 'I100'],
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '交易股数',
                    min: 0,
                    max: 4e6,
                    //interval: 50,
                    axisLabel: {
                        formatter: '{value} 万股'
                    }
                },
                {
                    type: 'value',
                    name: '交易额',
                    min: 0,
                    max: 2e6,
                    //interval: 5,
                    axisLabel: {
                        formatter: '{value} 百万元'
                    }
                }
            ],
            series: [
                {
                    name: '交易股数',
                    type: 'bar',
                    tooltip: {
                        valueFormatter: function (value) {
                            return value + ' 万股';
                        }
                    },
                    data: deal_count
                },
                {
                    name: '交易额',
                    type: 'bar',
                    tooltip: {
                        valueFormatter: function (value) {
                            return value + ' 百万元';
                        }
                    },
                    data: deal_amount
                }
            ]
        };

        var chartDom = document.getElementById('statistics_shares');
        var myChart = echarts.init(chartDom);
        option && myChart.setOption(option);
    }

    var on_show_kline_shares = function (shares_id) {
        window.location.href = "../../share/shares/shares_show_kline.jsp?shares_id=" + shares_id;
    }
    var on_show_kline_exchanges = function (exchanges_id) {
        window.location.href = "../../share/exchanges/exchanges_show_kline.jsp?exchanges_id=" + exchanges_id;
    }
    var on_show_kline_futures = function (futures_id) {
        window.location.href = "../../maintain/trade/futures_show_kline.jsp?futures_id=" + futures_id;
    }

    return {
        init: function() {
            initPageControl();
        },
        onViewRecord:function (id) {
            onViewRecord(id);
        },
        onShowKline: function (shares_id) {
            on_show_kline_shares(shares_id);
        },
        onShowKlineExchanges: function (exchanges_id) {
            on_show_kline_exchanges(exchanges_id);
        },
        onShowKlineFutures: function (futures_id) {
            on_show_kline_futures(futures_id);
        },
    }
}();