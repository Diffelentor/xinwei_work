var module = "shares";
var sub = "file";
/*================================================================================*/
jQuery(document).ready(function () {
    Metronic.init(); // init metronic core components
    Layout.init(); // init current layout
    QuickSidebar.init(); // init quick sidebar
    Demo.init(); // init demo features
    Page.init();
});
/* ================================================================================ */
//关于页面的控件生成等操作都放在Page里
var Page = function () {
    /*----------------------------------------入口函数  开始----------------------------------------*/
    var initPageControl = function () {
        pageId = $("#page_id").val();
        if (pageId == "shares_data") {
            initSharesDataList();
        }
        if (pageId == "device_add") {
            initDeviceAdd();
        }
        if (pageId == "device_modify") {
            initDeviceModify();
        }
        if (pageId == "shares_list_print_table") {
            initSharesPrintTable();
        }
        if (pageId == "shares_kline") {
            initSharesKline();
        }
<<<<<<< Updated upstream
=======
        if (pageId == "shares_data_admin") {
            initSharesAdmin();
        }
>>>>>>> Stashed changes
    };
    /*----------------------------------------入口函数  结束----------------------------------------*/
    var columnsData = undefined;
    var recordResult = undefined;
    /*----------------------------------------业务函数  开始----------------------------------------*/
    /*------------------------------针对各个页面的入口  开始------------------------------*/
<<<<<<< Updated upstream
    var initMyHaveDeviceList = function () {
        initDeviceListControlEvent();
        //initDeviceRecordList();
    }
    var initDeviceAdd = function () {
        initDeviceAddControlEvent();
    }
    var initDeviceModify = function () {
        initDeviceModifyControlEvent();
        initDeviceRecordView();
    }
=======
>>>>>>> Stashed changes
    var initSharesDataList = function () {
        initSharesDataControlEvent();
        initSharesDataRecordDatatable();
    }
    var initSharesPrintTable = function () {
        initSharesListPrintTableRecord();
    }
    var initSharesKline = function () {
        initSharesKlinePage();
    }
<<<<<<< Updated upstream
=======
    var initSharesAdmin = function () {
        initSharesAdminControlEvent();
        initSharesDatatableAdmin();
    }
>>>>>>> Stashed changes
    /*------------------------------针对各个页面的入口 结束------------------------------*/
    var getUrlParam = function (name) {
        //获取url中的参数
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return decodeURI(r[2]);
        return null; //返回参数值，如果是中文传递，就用decodeURI解决乱码，否则用unescape
    }
<<<<<<< Updated upstream
    var initDeviceListControlEvent = function () {
        $("#help_button").click(function () {
            help();
        });
        $('#add_button').click(function () {
            onAddRecord();
        });
        $('#history_button').click(function () {
            onHistoryRecord();
        });
    }
    var initDeviceAddControlEvent = function () {
        $("#help_button").click(function () {
            help();
        });
        $('#add_button').click(function () {
            submitAddRecord();
        });
    }
    var initDeviceModifyControlEvent = function () {
        $("#help_button").click(function () {
            help();
        });
        $('#modify_button').click(function () {
            submitModifyRecord();
        });
    }
    var initSharesDataControlEvent = function () {
=======

    var initSharesDataControlEvent = function () {
        $('#remake_button').click(function () {
            onRemake();
        });
        $('#query_button').click(function () {
            initSharesDataRecordDatatable();
        });
        $('#export_button').click(function () {
            onExportRecord();
        });
        $('#finish_download_button').click(function () {
            onFinishDownload();
        });
        $('#refresh_button').click(function () {
            onRemake();
        });
        $('#table_print_button').click(function () {
            onTablePrint();
        });
        $('#show_futures').click(function () {
            toFuturePage();
        });
        $('#show_exchange').click(function () {
            toExchangePage();
        });
    }
    var initSharesAdminControlEvent = function () {
        $('#add_button').click(function() {onAddRecord();});
        $('#shares_add_div #submit_button').click(function() {onAddDivSubmit();});
>>>>>>> Stashed changes
        $('#remake_button').click(function () {
            onRemake();
        });
        $('#query_button').click(function () {
<<<<<<< Updated upstream
            initSharesDataRecordDatatable();
=======
            initSharesDatatableAdmin();
>>>>>>> Stashed changes
        });
        $('#export_button').click(function () {
            onExportRecord();
        });
        $('#finish_download_button').click(function () {
            onFinishDownload();
        });
        $('#refresh_button').click(function () {
            onRemake();
        });
        $('#table_print_button').click(function () {
            onTablePrint();
        });
        $('#show_futures').click(function () {
<<<<<<< Updated upstream
            toFuturePage();
        });
        $('#show_exchange').click(function () {
            toExchangePage();
        });
    }

=======
            toFutureAdminPage();
        });
        $('#show_exchange').click(function () {
            toExchangeAdminPage();
        });
    }

    var onAddRecord=function(){
        $("#shares_add_div").modal("show");
    }
    var onAddDivSubmit=function () {
        submitAddRecordDiv();
    };
    /*isNull判定*/
    function isNull(arg1)
    {
        return !arg1 && arg1!==0 && typeof arg1!=="boolean"?true:false;
    }
    var submitAddRecordDiv=function () {
        if(confirm("您确定要添加该记录吗？")){
            var url="../../"+module+"_"+sub+"_servlet_action";
            var add_data={};
            add_data.action="add_shares_record";
            //获取填写在该页面的数据准备传向后端
            add_data.shares_id=$("#shares_add_div #shares_id").val();
            if(isNull(add_data.shares_id)){
                $("#shares_add_div #reminder").modal("show");
                alert("代号不能为空");
                return;
            }
            add_data.shares_name=$("#shares_add_div #shares_name").val();
            add_data.price_today_begin=$("#shares_add_div #price_today_begin").val();
            add_data.price_pre=$("#shares_add_div #price_pre").val();
            add_data.price_right_now=$("#shares_add_div #price_right_now").val();
            add_data.price_high=$("#shares_add_div #price_high").val();
            add_data.price_low=$("#shares_add_div #price_low").val();
            //测试输入的是否为数字形式
            if(isNaN(add_data.price_today_begin) || isNaN(add_data.price_pre) || isNaN(add_data.price_right_now) || isNaN(add_data.price_high) || isNaN(add_data.price_low)){
                alert("输入的数据不合规范！请输入数字！");
                return;
            }
            $.post(url,add_data,function(json){
                if(json.result_code==0){
                    alert("已经完成股票记录添加！");
                    window.location.reload();
                }
            });
        }
    };

    //在修改界面确认修改后进行的事件
    var onModifyDivSubmit=function () {
        $('#shares_modify_div #submit_button').click(function () {
            submitModifyRecordDiv();
        });
    };
    var submitModifyRecordDiv=function () {
        if(confirm("您确定要修改该记录吗？")){
            var url="../../"+module+"_"+sub+"_servlet_action";
            var modify_data={};
            modify_data.action="modify_shares_record";
            //获取填写在该页面的数据准备传向后端
            modify_data.shares_id=$("#shares_modify_div #shares_id").val();
            if(isNull(modify_data.shares_id)){
                $("#shares_modify_div #reminder").modal("show");
                alert("代号不能为空");
                return;
            }
            modify_data.id=$("#shares_modify_div #id").val();
            modify_data.shares_name=$("#shares_modify_div #shares_name").val();
            modify_data.price_today_begin=$("#shares_modify_div #price_today_begin").val();
            modify_data.price_pre=$("#shares_modify_div #price_pre").val();
            modify_data.price_right_now=$("#shares_modify_div #price_right_now").val();
            modify_data.price_high=$("#shares_modify_div #price_high").val();
            modify_data.price_low=$("#shares_modify_div #price_low").val();
            //测试输入的是否为数字形式
            if(isNaN(modify_data.price_today_begin) || isNaN(modify_data.price_pre) || isNaN(modify_data.price_right_now) || isNaN(modify_data.price_high) || isNaN(modify_data.price_low)){
                alert("输入的数据不合规范！请输入数字！");
                return;
            }
            $.post(url,modify_data,function(json){
                if(json.result_code==0){
                    alert("已经完成股票记录修改！");
                    window.location.reload();
                }
            });
        }
    };
>>>>>>> Stashed changes
    var onModifyRecord = function (id) {
        window.location.href = "device_modify.jsp?id=" + id;
    }
    var onHistoryRecord = function () {
        window.location.href = "commonHistoryOrder.jsp";
    }
    var on_show_kline = function (shares_id) {
        window.location.href = "shares_show_kline.jsp?shares_id=" + shares_id;
    }
<<<<<<< Updated upstream
=======
    var onRemake = function () {
        window.location.reload();
    }
    var onExportRecord = function () {
        var url = "../../" + module + "_" + sub + "_servlet_action";
        var data = {"action": "export_shares_record"};
        $.post(url, data, function (json) {
            if (json.result_code == 0) {
                $("#shares_download_div #download_shares_rar_url").attr("href","javascript:window.open('"+json.download_rar_url+ "')");
                $("#shares_download_div #download_shares_xls_url").attr("href","javascript:window.open('"+json.download_xls_url+ "')");
                $("#shares_download_div").modal("show");
            } else {
                alert("[onExportRecord]与后端交互错误！" + json.result_smg);
            }
        })
    }
    var onFinishDownload = function () {
        $("#shares_download_div").modal("hide");
    }

    //打印事件，跳转到别的页面
    var onTablePrint = function () {
        window.location.href = "shares_list_print_table.jsp";
    };
    var toFuturePage = function () {
        window.location.href = "../../maintain/trade/futuresData.jsp";
    };
    var toExchangePage = function () {
        window.location.href = "../exchanges/exchangesData.jsp";
    };
    var toFutureAdminPage = function () {
        window.location.href = "../../maintain/manageTrade/manageFuturesData.jsp";
    }
    var toExchangeAdminPage = function () {
        window.location.href = "../exchanges/exchangesData_admin.jsp";
    };

>>>>>>> Stashed changes
    var initSharesDataRecordDatatable = function () {
        //将之前的表删除掉，这样再次获取的时候就不会有warning了
        if ($.fn.dataTable.isDataTable('#record_list')) {
            console.log("=====================")
            // 获取这个表
            _table = $('#record_list').DataTable();
            // 把这个表销毁掉
            _table.destroy();
        }
        var data = {};
        data.shares_id = $("#record_query_setup #shares_id").val();
        data.shares_name = $("#record_query_setup #shares_name").val();
        $('.datatable').dataTable({
            "paging": true,
            "searching": false,
            "oLanguage": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "sProcessing": "处理中...",
                "sLengthMenu": "_MENU_ 记录/页",
                "sZeroRecords": "没有匹配的记录",
                "sInfo": "显示第 _START_ 至 _END_ 项记录，共 _TOTAL_ 项",
                "sInfoEmpty": "显示第 0 至 0 项记录，共 0 项",
                "sInfoFiltered": "(由 _MAX_ 项记录过滤)",
                "sInfoPostFix": "",
                "sSearch": "过滤:",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "上页",
                    "sNext": "下页",
                    "sLast": "末页"
                }
            },
            //注意事项：在html里定义了几列这里就几列，参数是full
            "aoColumns": [{
                "mRender": function (data, type, full) {
                    sReturn = '<input type="checkbox" class="checkboxes" value="' + full.shares_id + '"/>';
                    return sReturn;
                }, "orderable": false
            }, {
                "mRender": function (data, type, full) {
                    sReturn = '<div>' + full.shares_id + '</div>';
                    return sReturn;
                }, "orderable": false
            }, {
                "mRender": function (data, type, full) {
                    sReturn = '<div>' + full.shares_name + '</div>';
                    return sReturn;
                }, "orderable": false
            }, {
                "mRender": function (data, type, full) {
                    sReturn = '<div>' + full.price_today_begin + '</div>';
                    return sReturn;
                }, "orderable": false
            }, {
                "mRender": function (data, type, full) {
                    sReturn = '<div>' + full.price_pre + '</div>';
                    return sReturn;
                }, "orderable": false
            }, {
                "mRender": function (data, type, full) {
                    sReturn = '<div>' + full.price_right_now + '</div>';
                    return sReturn;
                }, "orderable": false
            }, {
                "mRender": function (data, type, full) {
                    sReturn = '<div>' + full.price_high + '</div>';
                    return sReturn;
                }, "orderable": false
            }, {
                "mRender": function (data, type, full) {
                    sReturn = '<div>' + full.price_low + '</div>';
                    return sReturn;
                }, "orderable": false
            }, {
                "mRender": function (data, type, full) {
                    if (full.price_right_now != "" && full.price_pre != "") {
                        var change = (full.price_right_now - 0) - (full.price_pre - 0);
                        change = Math.round(change * 100) / 100;
                        if (change > 0) {
                            sReturn = '<div class="font-red">' + change + '</div>';
                        } else {
                            sReturn = '<div class="font-green">' + change + '</div>';
                        }
                    } else {
                        sReturn = '<div></div>'
                    }

                    return sReturn;
                }, "orderable": false
<<<<<<< Updated upstream
            }, {
=======
            },{
>>>>>>> Stashed changes
                "mRender": function (data, type, full) {
                    if (full.price_right_now != "" && full.price_pre != "") {
                        var amplitude = (full.price_right_now - full.price_pre) / full.price_pre;
                        amplitude = Math.round(amplitude * 100000) / 1000;
                        if (amplitude > 0) {
                            sReturn = '<div class="font-red">' + amplitude + '%</div>';
                        } else {
                            sReturn = '<div class="font-green">' + amplitude + '%</div>';
                        }
                    } else {
                        sReturn = '<div></div>'
                    }

                    return sReturn;
                }, "orderable": false
            }, {
<<<<<<< Updated upstream
=======
                "mRender": function(data, type, full) {
                    var data = full.deal_count;
                    data = Math.round(data / 100);
                    sReturn = '<div>'+data+'</div>';
                    return sReturn;
                },"orderable": false
            },{
>>>>>>> Stashed changes
                "mRender": function (data, type, full) {
                    var shares_id = full.shares_id;
                    sReturn = '<div><a href="javascript:Page.onModifyRecord(' + full.id + ')">【买入】</a><a href="#" onclick="Page.onShowKline(\'' + shares_id + '\')">【k线图】</div>';
                    return sReturn;
                }, "orderable": false
            }],
            "aLengthMenu": [[5, 10, 15, 20, 25, 40, 50, -1], [5, 10, 15, 20, 25, 40, 50, "所有记录"]],
            "fnDrawCallback": function () {
                $(".checkboxes").uniform();
                $(".group-checkable").uniform();
            },
            "sAjaxSource": "../../" + module + "_" + sub + "_servlet_action?action=get_shares_record&shares_id=" + data.shares_id + "&shares_name=" + data.shares_name,
        });
        $('.datatable').find('.group-checkable').change(function () {
            var set = jQuery(this).attr("data-set");
            var checked = jQuery(this).is(":checked");
            jQuery(set).each(function () {
                if (checked) {
                    $(this).attr("checked", true);
                    $(this).parents('tr').addClass("active");
                } else {
                    $(this).attr("checked", false);
                    $(this).parents('tr').removeClass("active");
                }
            });
            jQuery.uniform.update(set);
        });
        $('.datatable').on('change', 'tbody tr .checkboxes', function () {
            $(this).parents('tr').toggleClass("active");
        });
    };
<<<<<<< Updated upstream
    var onRemake = function () {
        window.location.reload();
    }
    var onExportRecord = function () {
        var url = "../../" + module + "_" + sub + "_servlet_action";
        var data = {"action": "export_shares_record"};
        $.post(url, data, function (json) {
            if (json.result_code == 0) {
                console.log(JSON.stringify(json));
                $("#shares_download_div #download_url").attr("href", "javascript:window.open('" + json.download_url + "')");	//window.open是打开一个新的页面进行跳转，但是这里没有显现出来
                $("#shares_download_div").modal("show");
            } else {
                alert("[onExportRecord]与后端交互错误！" + json.result_smg);
            }
        })
    }
    var onFinishDownload = function () {
        $("#shares_download_div").modal("hide");
    }

    //打印事件，跳转到别的页面
    var onTablePrint = function () {
        window.location.href = "shares_list_print_table.jsp";
    };

    var toFuturePage = function () {
        window.location.href = "../../maintain/trade/futuresData.jsp";
    };

    var toExchangePage = function () {
        window.location.href = "../exchanges/exchangesData.jsp";
    };

=======
>>>>>>> Stashed changes
    var initSharesKlinePage = function () {
        $("#page_sidebar_wrapper").hide();
        $("#page_header").hide();
        $("#page_footer").hide();
        $("#page-content").attr("style", "margin-left:0px");
        $(".page-container").attr("style", "margin-left:0px");
        $(".page-container").attr("style", "margin-top:0px");
        var shares_id = getUrlParam("shares_id");
        $("#kline_shares_id").val(shares_id);
        console.log(shares_id)

        $.post("../../" + module + "_" + sub + "_servlet_action?action=get_kline&shares_id=" + shares_id, function (json) {
            //console.log(JSON.stringify(json));
            var data = [];
            if (json.result_code == 0) {
                var list = json.aaData;
                if (list != undefined && list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        var item = list[i];
                        var open = parseFloat(item.price_today_begin);
                        var close = parseFloat(item.price_right_now);
                        var lowest = parseFloat(item.price_low);
                        var highest = parseFloat(item.price_high);
                        var date = item.date;
                        date = date.replace("-", "/");
                        var temp = [];
                        temp.push(date, open, close, lowest, highest)
                        data.push(temp)
                    }
                }
            }
            /*配置echarts*/
            const upColor = '#ec0000';
            const upBorderColor = '#8A0000';
            const downColor = '#00da3c';
            const downBorderColor = '#008F28';
            // Each item: open，close，lowest，highest
            const data0 = splitData(data);

            function splitData(rawData) {
                const categoryData = [];
                const values = [];
                for (var i = 0; i < rawData.length; i++) {
                    categoryData.push(rawData[i].splice(0, 1)[0]);
                    values.push(rawData[i]);
                }
                return {
                    categoryData: categoryData,
                    values: values
                };
            }

            function calculateMA(dayCount) {
                var result = [];
                for (var i = 0, len = data0.values.length; i < len; i++) {
                    if (i < dayCount) {
                        result.push('-');
                        continue;
                    }
                    var sum = 0;
                    for (var j = 0; j < dayCount; j++) {
                        sum += +data0.values[i - j][1];
                    }
                    result.push(sum / dayCount);
                }
                return result;
            }

            var option = {
                title: {
                    text: shares_id,
                    left: 0
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                legend: {
                    data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
                },
                grid: {
                    left: '10%',
                    right: '10%',
                    bottom: '15%'
                },
                xAxis: {
                    type: 'category',
                    data: data0.categoryData,
                    boundaryGap: false,
                    axisLine: {onZero: false},
                    splitLine: {show: false},
                    min: 'dataMin',
                    max: 'dataMax'
                },
                yAxis: {
                    scale: true,
                    splitArea: {
                        show: true
                    }
                },
                dataZoom: [
                    {
                        type: 'inside',
                        start: 50,
                        end: 100
                    },
                    {
                        show: true,
                        type: 'slider',
                        top: '90%',
                        start: 50,
                        end: 100
                    }
                ],
                series: [
                    {
                        name: '日K',
                        type: 'candlestick',
                        data: data0.values,
                        itemStyle: {
                            color: upColor,
                            color0: downColor,
                            borderColor: upBorderColor,
                            borderColor0: downBorderColor
                        },
                        markPoint: {
                            label: {
                                formatter: function (param) {
                                    return param != null ? Math.round(param.value) + '' : '';
                                }
                            },
                            data: [
                                {
                                    name: 'Mark',
                                    coord: ['2013/5/31', 2300],
                                    value: 2300,
                                    itemStyle: {
                                        color: 'rgb(41,60,85)'
                                    }
                                },
                                {
                                    name: 'highest value',
                                    type: 'max',
                                    valueDim: 'highest'
                                },
                                {
                                    name: 'lowest value',
                                    type: 'min',
                                    valueDim: 'lowest'
                                },
                                {
                                    name: 'average value on close',
                                    type: 'average',
                                    valueDim: 'close'
                                }
                            ],
                            tooltip: {
                                formatter: function (param) {
                                    return param.name + '<br>' + (param.data.coord || '');
                                }
                            }
                        },
                        markLine: {
                            symbol: ['none', 'none'],
                            data: [
                                [
                                    {
                                        name: 'from lowest to highest',
                                        type: 'min',
                                        valueDim: 'lowest',
                                        symbol: 'circle',
                                        symbolSize: 10,
                                        label: {
                                            show: false
                                        },
                                        emphasis: {
                                            label: {
                                                show: false
                                            }
                                        }
                                    },
                                    {
                                        type: 'max',
                                        valueDim: 'highest',
                                        symbol: 'circle',
                                        symbolSize: 10,
                                        label: {
                                            show: false
                                        },
                                        emphasis: {
                                            label: {
                                                show: false
                                            }
                                        }
                                    }
                                ],
                                {
                                    name: 'min line on close',
                                    type: 'min',
                                    valueDim: 'close'
                                },
                                {
                                    name: 'max line on close',
                                    type: 'max',
                                    valueDim: 'close'
                                }
                            ]
                        }
                    },
                    {
                        name: 'MA5',
                        type: 'line',
                        data: calculateMA(5),
                        smooth: true,
                        lineStyle: {
                            opacity: 0.5
                        }
                    },
                    {
                        name: 'MA10',
                        type: 'line',
                        data: calculateMA(10),
                        smooth: true,
                        lineStyle: {
                            opacity: 0.5
                        }
                    },
                    {
                        name: 'MA20',
                        type: 'line',
                        data: calculateMA(20),
                        smooth: true,
                        lineStyle: {
                            opacity: 0.5
                        }
                    },
                    {
                        name: 'MA30',
                        type: 'line',
                        data: calculateMA(30),
                        smooth: true,
                        lineStyle: {
                            opacity: 0.5
                        }
                    }
                ]
            };
            var chartDom = document.getElementById('echarts');
            var myChart = echarts.init(chartDom);
            myChart.setOption(option);
        })
    }
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
    var initSharesListPrintTableRecord = function () {
        $("#page_sidebar_wrapper").hide();
        $("#page_header").hide();
        $("#page_footer").hide();
        $("#page-content").attr("style", "margin-left:0px");
        $(".page-container").attr("style", "margin-left:0px");
        $(".page-container").attr("style", "margin-top:0px");
        // $(".page-container").attr("style","margin-bottom:0px"); 注意事项：top与bottom不能同时存在
        $.post("../../" + module + "_" + sub + "_servlet_action?action=get_shares_record", function (json) {
            console.log(JSON.stringify(json));
            if (json.result_code == 0) {
                var list = json.aaData;
                var html = "";
                if (list != undefined && list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        var record = list[i];
                        var change = "";
                        var amplitude = "";
<<<<<<< Updated upstream
                        if (record.price_right_now != "" && record.price_yesterday != "") {
                            change = (record.price_right_now - 0) - (record.price_yesterday - 0);
                            change = Math.round(change * 100) / 100;
                            amplitude = (record.price_right_now - record.price_yesterday) / record.price_yesterday;
                            amplitude = Math.round(amplitude * 100000) / 100000;
=======
                        if (record.price_right_now != "" && record.price_pre != "") {
                            change = (record.price_right_now - 0) - (record.price_pre - 0);
                            change = Math.round(change * 100) / 100;
                            amplitude = (record.price_right_now - record.price_pre) / record.price_pre;
                            amplitude = Math.round(amplitude * 100000) / 1000;
>>>>>>> Stashed changes
                            amplitude = amplitude + '%';
                        }
                        html = html + "                          	 		<tr>";
                        html = html + "                                        <td>";
                        html = html + "                                            " + record.shares_id;
                        html = html + "                                        </td>";
                        html = html + "                                        <td>";
                        html = html + "                                            " + record.shares_name;
                        html = html + "                                        </td>";
                        html = html + "                                        <td>";
                        html = html + "                                            " + record.price_today_begin;
                        html = html + "                                        </td>";
                        html = html + "                                        <td>";
<<<<<<< Updated upstream
                        html = html + "                                            " + record.price_yesterday;
=======
                        html = html + "                                            " + record.price_pre;
>>>>>>> Stashed changes
                        html = html + "                                        </td>";
                        html = html + "                                        <td>";
                        html = html + "                                            " + record.price_right_now;
                        html = html + "                                        </td>";
                        html = html + "                                        <td>";
                        html = html + "                                            " + record.price_high;
                        html = html + "                                        </td>";
                        html = html + "                                        <td>";
                        html = html + "                                            " + record.price_low;
                        html = html + "                                        </td>";
                        html = html + "                                        <td>";
                        html = html + "                                            " + change;
                        html = html + "                                        </td>";
                        html = html + "                                        <td>";
                        html = html + "                                            " + amplitude;
                        html = html + "                                        </td>";
                        html = html + "                                    </tr>";
                    }
                }
                $("#print_table_content_div").html(html);
<<<<<<< Updated upstream
            }
        })
    }
=======
                window.print();
            }
        })
    }
    var initSharesDatatableAdmin = function () {
        //将之前的表删除掉，这样再次获取的时候就不会有warning了
        if ($.fn.dataTable.isDataTable('#record_list_admin')) {
            console.log("=====================")
            // 获取这个表
            _table = $('#record_list_admin').DataTable();
            // 把这个表销毁掉
            _table.destroy();
        }
        var data = {};
        data.shares_id = $("#record_query_setup #shares_id").val();
        data.shares_name = $("#record_query_setup #shares_name").val();
        $('.datatable').dataTable({
            "paging": true,
            "searching": false,
            "oLanguage": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "sProcessing": "处理中...",
                "sLengthMenu": "_MENU_ 记录/页",
                "sZeroRecords": "没有匹配的记录",
                "sInfo": "显示第 _START_ 至 _END_ 项记录，共 _TOTAL_ 项",
                "sInfoEmpty": "显示第 0 至 0 项记录，共 0 项",
                "sInfoFiltered": "(由 _MAX_ 项记录过滤)",
                "sInfoPostFix": "",
                "sSearch": "过滤:",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "上页",
                    "sNext": "下页",
                    "sLast": "末页"
                }
            },
            //注意事项：在html里定义了几列这里就几列，参数是full
            "aoColumns": [{
                "mRender": function (data, type, full) {
                    sReturn = '<input type="checkbox" class="checkboxes" value="' + full.shares_id + '"/>';
                    return sReturn;
                }, "orderable": false
            }, {
                "mRender": function (data, type, full) {
                    sReturn = '<div>' + full.shares_id + '</div>';
                    return sReturn;
                }, "orderable": false
            }, {
                "mRender": function (data, type, full) {
                    sReturn = '<div>' + full.shares_name + '</div>';
                    return sReturn;
                }, "orderable": false
            }, {
                "mRender": function (data, type, full) {
                    sReturn = '<div>' + full.price_today_begin + '</div>';
                    return sReturn;
                }, "orderable": false
            }, {
                "mRender": function (data, type, full) {
                    sReturn = '<div>' + full.price_pre + '</div>';
                    return sReturn;
                }, "orderable": false
            }, {
                "mRender": function (data, type, full) {
                    sReturn = '<div>' + full.price_right_now + '</div>';
                    return sReturn;
                }, "orderable": false
            }, {
                "mRender": function (data, type, full) {
                    sReturn = '<div>' + full.price_high + '</div>';
                    return sReturn;
                }, "orderable": false
            }, {
                "mRender": function (data, type, full) {
                    sReturn = '<div>' + full.price_low + '</div>';
                    return sReturn;
                }, "orderable": false
            }, {
                "mRender": function (data, type, full) {
                    if (full.price_right_now != "" && full.price_pre != "") {
                        var change = (full.price_right_now - 0) - (full.price_pre - 0);
                        change = Math.round(change * 100) / 100;
                        if (change > 0) {
                            sReturn = '<div class="font-red">' + change + '</div>';
                        } else {
                            sReturn = '<div class="font-green">' + change + '</div>';
                        }
                    } else {
                        sReturn = '<div></div>'
                    }

                    return sReturn;
                }, "orderable": false
            }, {
                "mRender": function (data, type, full) {
                    if (full.price_right_now != "" && full.price_pre != "") {
                        var amplitude = (full.price_right_now - full.price_pre) / full.price_pre;
                        amplitude = Math.round(amplitude * 100000) / 1000;
                        if (amplitude > 0) {
                            sReturn = '<div class="font-red">' + amplitude + '%</div>';
                        } else {
                            sReturn = '<div class="font-green">' + amplitude + '%</div>';
                        }
                    } else {
                        sReturn = '<div></div>'
                    }

                    return sReturn;
                }, "orderable": false
            }, {
                "mRender": function(data, type, full) {
                    var data = full.deal_count;
                    data = Math.round(data / 100);
                    sReturn = '<div>'+data+'</div>';
                    return sReturn;
                },"orderable": false
            },{
                "mRender": function(data, type, full) {
                    sReturn = '<div><a href="javascript:Page.onModifyRecord(\'' + full.shares_id + '\')"><i class="fa fa-pencil"></i> 修改</a><a href="javascript:Page.onDeleteRecord(\'' + full.shares_id + '\')"><span class="glyphicon glyphicon-remove-sign">\n' +
                        '</span> 删除</div>';
                    return sReturn;
                },"orderable": false
            }],
            "aLengthMenu": [[5, 10, 15, 20, 25, 40, 50, -1], [5, 10, 15, 20, 25, 40, 50, "所有记录"]],
            "fnDrawCallback": function () {
                $(".checkboxes").uniform();
                $(".group-checkable").uniform();
            },
            "sAjaxSource": "../../" + module + "_" + sub + "_servlet_action?action=get_shares_record&shares_id=" + data.shares_id + "&shares_name=" + data.shares_name,
        });
        $('.datatable').find('.group-checkable').change(function () {
            var set = jQuery(this).attr("data-set");
            var checked = jQuery(this).is(":checked");
            jQuery(set).each(function () {
                if (checked) {
                    $(this).attr("checked", true);
                    $(this).parents('tr').addClass("active");
                } else {
                    $(this).attr("checked", false);
                    $(this).parents('tr').removeClass("active");
                }
            });
            jQuery.uniform.update(set);
        });
        $('.datatable').on('change', 'tbody tr .checkboxes', function () {
            $(this).parents('tr').toggleClass("active");
        });
    }
>>>>>>> Stashed changes
    //Page return 开始
    return {
        init: function () {
            initPageControl();
        },
        onShowKline: function (shares_id) {
            on_show_kline(shares_id);
        },
<<<<<<< Updated upstream
        onModifyRecord: function (id) {
            onModifyRecord(id);
=======
        onModifyRecord: function (shares_id) {
            var url="../../"+module+"_"+sub+"_servlet_action";
            var query_data = {};
            query_data.action="get_shares_record";
            query_data.shares_id=shares_id;
            $.post(url,query_data,function(json){
                if(json.result_code==0){
                    var data = json.aaData[0];
                    $('#shares_modify_div #shares_id').val(data.shares_id);
                    $('#shares_modify_div #shares_name').val(data.shares_name);
                    $('#shares_modify_div #price_today_begin').val(data.price_today_begin);
                    $('#shares_modify_div #price_pre').val(data.price_pre);
                    $('#shares_modify_div #price_right_now').val(data.price_right_now);
                    $('#shares_modify_div #price_high').val(data.price_high);
                    $('#shares_modify_div #price_low').val(data.price_low);
                }
            });
            $("#shares_modify_div").modal("show");
            onModifyDivSubmit();
        },
        onDeleteRecord:function (shares_id) {
            if (confirm("您确定要删除该记录吗？")) {
                var url = "../../" + module + "_" + sub + "_servlet_action";
                var delete_data = {};
                delete_data.action = "delete_shares_record";
                delete_data.shares_id = shares_id;
                $.post(url,delete_data,function(json){
                    if(json.result_code==0){
                        alert("已删除记录！")
                        window.location.reload();
                    }
                });
            }
>>>>>>> Stashed changes
        }
    }
}();//Page
/*================================================================================*/
