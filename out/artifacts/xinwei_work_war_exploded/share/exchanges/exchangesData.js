var module = "exchanges";
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
        if (pageId == "exchanges_data") {
            initExchangesDataList();
        }
        if (pageId == "device_add") {
            initDeviceAdd();
        }
        if (pageId == "device_modify") {
            initDeviceModify();
        }
        if (pageId == "exchanges_list_print_table") {
            initExchangesPrintTable();
        }
        if (pageId == "exchanges_kline") {
            initExchangesKline();
        }
    };
    /*----------------------------------------入口函数  结束----------------------------------------*/
    var columnsData = undefined;
    var recordResult = undefined;
    /*----------------------------------------业务函数  开始----------------------------------------*/
    /*------------------------------针对各个页面的入口  开始------------------------------*/
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
    var initExchangesDataList = function () {
        initExchangesDataControlEvent();
        initExchangesDataRecordDatatable();
    }
    var initExchangesPrintTable = function () {
        initExchangesListPrintTableRecord()
    }
    var initExchangesKline = function () {
        initExchangesKlinePage()
    }
    /*------------------------------针对各个页面的入口 结束------------------------------*/
    var getUrlParam = function (name) {
        //获取url中的参数
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return decodeURI(r[2]);
        return null; //返回参数值，如果是中文传递，就用decodeURI解决乱码，否则用unescape
    }
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
    var initExchangesDataControlEvent = function () {
        $('#remake_button').click(function () {
            onRemake();
        });
        $('#query_button').click(function () {
            initExchangesDataRecordDatatable();
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
        $('#show_shares').click(function () {
            toSharePage();
        });
    }
    var initDeviceRecordView = function () {
        var id = getUrlParam("id");
        var data = {};
        data.action = "get_device_record";
        data.id = id;
        $.post(module + "_" + sub + "_servlet_action", data, function (json) {
            console.log(JSON.stringify(json));
            if (json.result_code == 0) {
                var list = json.aaData;
                if (list != undefined && list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        var record = list[i];
                        $("#device_id").val(record.device_id);
                        $("#device_name").val(record.device_name);
                    }
                }
            }
        })
    }
    var onAddRecord = function () {
        window.location.href = "device_add.jsp";
    }
    var submitAddRecord = function () {
        var url = "device_file_servlet_action";
        var data = {};
        data.action = "add_device_record";
        data.device_id = $("#device_id").val();
        data.device_name = $("#device_name").val();
        $.post(url, data, function (json) {
            if (json.result_code == 0) {
                alert("已经完成设备添加。");
                window.location.href = "device_list.jsp";
            }
        });
    }
    var submitModifyRecord = function () {
        if (confirm("您确定要修改该记录吗？")) {
            var id = getUrlParam("id");
            var url = "device_file_servlet_action";
            var data = {};
            data.action = "modify_device_record";
            data.id = id;
            data.device_id = $("#device_id").val();
            data.device_name = $("#device_name").val();
            $.post(url, data, function (json) {
                if (json.result_code == 0) {
                    alert("已经完成设备修改。");
                    window.location.href = "device_list.jsp";
                }
            });
        }
    }


    var initDeviceRecordList = function () {
        getDeviceRecordList();
    }
    var initDeviceMobileRecord = function () {
        getDeviceMobileRecord();
    }
    var getDeviceRecordList = function () {
        $.post(module + "_" + sub + "_servlet_action?action=get_device_record", function (json) {
            console.log(JSON.stringify(json));
            if (json.result_code == 0) {
                var list = json.aaData;
                var html = "";
                if (list != undefined && list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        var record = list[i];
                        html = html + "<div>序号：" + i + "<div>";
                        html = html + "<div>设备ID：" + record.device_id + "<div>";
                        html = html + "<div>设备名称：" + record.device_name + "<div>";
                        html = html + "<div><a href=\"javascript:Page.onModifyRecord(" + record.id + ")\">【修改记录】</a><a href=\"javascript:Page.onShow_Kline(" + record.id + ")\">【删除记录】</a><div>";
                        html = html + "<p>";
                    }
                }
                $("#record_list_div").html(html);
            }
        })
    }
    var on_show_kline = function (exchanges_id) {
        window.location.href = "exchanges_show_kline.jsp?exchanges_id=" + exchanges_id;
    };
    var onModifyRecord = function (id) {
        window.location.href = "device_modify.jsp?id=" + id;
    }
    var onHistoryRecord = function () {
        window.location.href = "commonHistoryOrder.jsp";
    }
    var initExchangesDataRecordDatatable = function () {
        //将之前的表删除掉，这样再次获取的时候就不会有warning了
        if ($.fn.dataTable.isDataTable('#record_list')) {
            console.log("=====================")
            // 获取这个表
            _table = $('#record_list').DataTable();
            // 把这个表销毁掉
            _table.destroy();
        }
        var data = {};
        data.exchanges_id = $("#record_query_setup #exchanges_id").val();
        data.exchanges_name = $("#record_query_setup #exchanges_name").val();
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
                    sReturn = '<input type="checkbox" class="checkboxes" value="' + full.exchanges_id + '"/>';
                    return sReturn;
                }, "orderable": false
            }, {
                "mRender": function (data, type, full) {
                    sReturn = '<div>' + full.exchanges_id + '</div>';
                    return sReturn;
                }, "orderable": false
            }, {
                "mRender": function (data, type, full) {
                    sReturn = '<div>' + full.exchanges_name + '</div>';
                    return sReturn;
                }, "orderable": false
            }, {
                "mRender": function (data, type, full) {
                    sReturn = '<div>' + full.price_today_begin + '</div>';
                    return sReturn;
                }, "orderable": false
            }, {
                "mRender": function (data, type, full) {
                    sReturn = '<div>' + full.price_yesterday + '</div>';
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
                    if (full.price_right_now != "" && full.price_yesterday != "") {
                        var change = (full.price_right_now - 0) - (full.price_yesterday - 0);
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
                    if (full.price_right_now != "" && full.price_yesterday != "") {
                        var amplitude = (full.price_right_now - full.price_yesterday) / full.price_yesterday;
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
                "mRender": function (data, type, full) {
                    exchanges_id = full.exchanges_id;
                    sReturn = '<div><a href="javascript:Page.onModifyRecord(' + full.id + ')">【买入】</a><a href="#" onclick="Page.onShowKline(\'' + exchanges_id + '\')">【k线图】</a></div>';
                    return sReturn;
                }, "orderable": false
            }],
            "aLengthMenu": [[5, 10, 15, 20, 25, 40, 50, -1], [5, 10, 15, 20, 25, 40, 50, "所有记录"]],
            "fnDrawCallback": function () {
                $(".checkboxes").uniform();
                $(".group-checkable").uniform();
            },
            //"sAjaxSource": "get_record.jsp"
            "sAjaxSource": "../../" + module + "_" + sub + "_servlet_action?action=get_exchanges_record&exchanges_id=" + data.exchanges_id + "&exchanges_name=" + data.exchanges_name
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
    var onRemake = function () {
        window.location.reload();
    }
    var onExportRecord = function () {
        var url = "../../" + module + "_" + sub + "_servlet_action";
        var data = {"action": "export_futures_record"};
        $.post(url, data, function (json) {
            if (json.result_code == 0) {
                console.log(JSON.stringify(json));
                $("#exchanges_download_div #download_url").attr("href", "javascript:window.open('" + json.download_url + "')");	//window.open是打开一个新的页面进行跳转，但是这里没有显现出来
                $("#exchanges_download_div").modal("show");
            } else {
                alert("[onExportRecord]与后端交互错误！" + json.result_smg);
            }
        })
    }
    var onFinishDownload = function () {
        $("#exchanges_download_div").modal("hide");
    }

    //打印事件，跳转到别的页面
    var onTablePrint = function () {
        window.location.href = "exchanges_list_print_table.jsp";
    };

    var toFuturePage = function () {
        window.location.href = "../../maintain/trade/futuresData.jsp";
    };

    var toSharePage = function () {
        window.location.href = "../shares/sharesData.jsp";
    };

    var initExchangesKlinePage = function () {
        $("#page_sidebar_wrapper").hide();
        $("#page_header").hide();
        $("#page_footer").hide();
        $("#page-content").attr("style", "margin-left:0px");
        $(".page-container").attr("style", "margin-left:0px");
        $(".page-container").attr("style", "margin-top:0px");
        var exchanges_id = getUrlParam("exchanges_id");
        $("#kline_exchanges_id").val(exchanges_id);
        //console.log(exchanges_id)

        $.post("../../" + module + "_" + sub + "_servlet_action?action=get_kline&exchanges_id=" + exchanges_id, function (json) {
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
					text: exchanges_id,
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


    var initExchangesListPrintTableRecord = function () {
        $("#page_sidebar_wrapper").hide();
        $("#page_header").hide();
        $("#page_footer").hide();
        $("#page-content").attr("style", "margin-left:0px");
        $(".page-container").attr("style", "margin-left:0px");
        $(".page-container").attr("style", "margin-top:0px");
        // $(".page-container").attr("style","margin-bottom:0px"); 注意事项：top与bottom不能同时存在
        $.post("../../" + module + "_" + sub + "_servlet_action?action=get_exchanges_record", function (json) {
            //console.log(JSON.stringify(json));
            if (json.result_code == 0) {
                var list = json.aaData;
                var html = "";
                if (list != undefined && list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        var record = list[i];
                        var change = "";
                        var amplitude = "";
                        if (record.price_right_now != "" && record.price_yesterday != "") {
                            change = (record.price_right_now - 0) - (record.price_yesterday - 0);
                            change = Math.round(change * 100) / 100;
                            amplitude = (record.price_right_now - record.price_yesterday) / record.price_yesterday;
                            amplitude = Math.round(amplitude * 100000) / 100000;
                            amplitude = amplitude + '%';
                        }
                        html = html + "                          	 		<tr>";
                        html = html + "                                        <td>";
                        html = html + "                                            " + record.futures_id;
                        html = html + "                                        </td>";
                        html = html + "                                        <td>";
                        html = html + "                                            " + record.futures_name;
                        html = html + "                                        </td>";
                        html = html + "                                        <td>";
                        html = html + "                                            " + record.price_today_begin;
                        html = html + "                                        </td>";
                        html = html + "                                        <td>";
                        html = html + "                                            " + record.price_yesterday;
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
            }
        })
    }
    //Page return 开始
    return {
        init: function () {
            initPageControl();
        },
        onShowKline: function (exchanges_id) {
            on_show_kline(exchanges_id);
        },
        onModifyRecord: function (id) {
            onModifyRecord(id);
        }
    }
}();//Page
/*================================================================================*/
