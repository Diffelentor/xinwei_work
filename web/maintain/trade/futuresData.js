var module="futures";
var sub="file";
/*================================================================================*/
jQuery(document).ready(function() {
	Metronic.init(); // init metronic core components
	Layout.init(); // init current layout
	QuickSidebar.init(); // init quick sidebar
	Demo.init(); // init demo features
	Page.init();
});
/* ================================================================================ */
//关于页面的控件生成等操作都放在Page里
var Page = function() {
	/*----------------------------------------入口函数  开始----------------------------------------*/
	var initPageControl=function(){
		pageId=$("#page_id").val();
		if(pageId=="futures_data"){
			initFuturesDataList();
		}
		if(pageId=="futures_list_print_table"){
			initFuturesPrintTable();
		}
		if (pageId == "futures_statistic") {
			initFuturesStatistic();
		}
		if (pageId == "futures_kline") {
			initFuturesKline();
		}
	};
	/*----------------------------------------入口函数  结束----------------------------------------*/
	var columnsData=undefined;
	var recordResult=undefined;
	/*----------------------------------------业务函数  开始----------------------------------------*/
	/*------------------------------针对各个页面的入口  开始------------------------------*/

	var initFuturesDataList=function () {
		initFuturesDataControlEvent();
		initFuturesDataRecordDatatable();
	}
	var initFuturesStatistic = function () {
		$.ajaxSettings.async = false;	//禁止异步方式，否则第一个函数还没执行完就会执行第二个了
		initFuturesStatisticRecord();
		$.ajaxSettings.async = true;
	}
	var initFuturesPrintTable=function () {
		initFuturesListPrintTableRecord()
	}
	var initFuturesKline = function (){
		initFuturesKlinePage();
	}
	/*------------------------------针对各个页面的入口 结束------------------------------*/

	/*时间范围确定*/
	function checkAuditTime(startTime, endTime){
		// 获取当前时间
		const date  = new Date()
		// 获取当前时间的年月日
		const dataStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} `

		// 获取开始时间、结束时间、现在时间的时间戳
		let startDate = new Date(dataStr + startTime).getTime()
		let endDate = new Date(dataStr + endTime).getTime()
		let nowDate = date.getTime()

		const s = startDate > endDate // 判断开始时间否大于结束时间

		if(s) [startDate, endDate] = [endDate, startDate] // 若开始时间否大于结束时间则交换值

		// 判断现在的时间是否在开始时间和结束时间之间，若s为true则结果取反
		if(nowDate > startDate && nowDate < endDate){
			return s ? false : true
		}else{
			return s ? true : false
		}
	}
	/*判断是否为周末*/
	let weekArrayList = [true,false,false,false,false,false,true]
	let flag

	var getUrlParam=function(name){
		//获取url中的参数
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		if (r != null) return decodeURI(r[2]); return null; //返回参数值，如果是中文传递，就用decodeURI解决乱码，否则用unescape
	}
	var initFuturesDataControlEvent=function () {
		$('#remake_button').click(function() {onRemake();});	//重置按钮
		$('#query_button').click(function() {initFuturesDataRecordDatatable();});	//查询按钮
		$('#export_futures_button').click(function() {onExportRecord();});	//导出按钮
		$('#finish_download_button').click(function() {onFinishDownload();});	//导出完毕按钮
		$('#refresh_button').click(function() {onRemake();});	//另一个刷新按钮
		$('#table_print_button').click(function() {onTablePrint();});	//打印按钮
		$('#remake_button').click(function() {onRemake();});
		$('#query_button').click(function() {initFuturesDataRecordDatatable();});
		$('#export_button').click(function() {onExportRecord();});
		$('#finish_download_button').click(function() {onFinishDownload();});
		$('#refresh_button').click(function() {onRemake();});
		$('#table_print_button').click(function() {onTablePrint();});
		$('#show_shares').click(function(){toSharePage();});
		$('#show_exchange').click(function(){toExchangePage();});
		$('#table_button').click(function () {
			onStatisticRecord();
		});
		$('#buy_submit').click(function(){onBuyDivSubmit();});
	}

	var on_show_kline = function (futures_id) {
		window.location.href = "futures_show_kline.jsp?futures_id=" + futures_id;
	};
	var onHistoryRecord=function () {
		window.location.href="commonHistoryOrder.jsp";
	}
	var initFuturesDataRecordDatatable=function () {
		//将之前的表删除掉，这样再次获取的时候就不会有warning了
		if ($.fn.dataTable.isDataTable('#record_list'))
		{
			console.log("=====================")
			// 获取这个表
			_table = $('#record_list').DataTable();
			// 把这个表销毁掉
			_table.destroy();
		}
		var data={};
		data.futures_id=$("#record_query_setup #futures_id").val();
		data.futures_name=$("#record_query_setup #futures_name").val();
		$('.datatable').dataTable( {
			"paging":true,
			"searching":false,
			"oLanguage": {
				"aria": {
					"sortAscending": ": activate to sort column ascending",
					"sortDescending": ": activate to sort column descending"
				},
				"sProcessing":   "处理中...",
				"sLengthMenu":   "_MENU_ 记录/页",
				"sZeroRecords":  "没有匹配的记录",
				"sInfo":         "显示第 _START_ 至 _END_ 项记录，共 _TOTAL_ 项",
				"sInfoEmpty":    "显示第 0 至 0 项记录，共 0 项",
				"sInfoFiltered": "(由 _MAX_ 项记录过滤)",
				"sInfoPostFix":  "",
				"sSearch":       "过滤:",
				"oPaginate": {
					"sFirst":    "首页",
					"sPrevious": "上页",
					"sNext":     "下页",
					"sLast":     "末页"
				}
			},
			//注意事项：在html里定义了几列这里就几列，参数是full
			"aoColumns": [{"mRender": function(data, type, full) {
					sReturn = '<input type="checkbox" class="checkboxes" value="'+full.futures_id+'"/>';
					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					sReturn = '<div>'+full.futures_id+'</div>';
					return sReturn;
				},"orderable": true
			},{
				"mRender": function(data, type, full) {
					sReturn = '<div>'+full.futures_name+'</div>';
					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					sReturn = '<div>'+full.price_today_begin+'</div>';
					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					sReturn = '<div>'+full.price_yesterday+'</div>';
					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					sReturn = '<div>'+full.price_right_now+'</div>';
					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					sReturn = '<div>'+full.price_high+'</div>';
					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					sReturn = '<div>'+full.price_low+'</div>';
					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					if(full.price_right_now!="" && full.price_yesterday!=""){
						var change=(full.price_right_now-0)-(full.price_yesterday-0);
						change=Math.round(change*100)/100;
						if(change>0){
							sReturn = '<div class="font-red">'+change+'</div>';
						}else {
							sReturn = '<div class="font-green">'+change+'</div>';
						}
					}else {
						sReturn = '<div></div>'
					}

					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					if(full.price_right_now!="" && full.price_yesterday!=""){
						var amplitude=(full.price_right_now-full.price_yesterday)/full.price_yesterday;
						amplitude=Math.round(amplitude*100000)/1000;
						if(amplitude>0){
							sReturn = '<div class="font-red">'+amplitude+'%</div>';
						}else {
							sReturn = '<div class="font-green">'+amplitude+'%</div>';
						}
					}else {
						sReturn = '<div></div>'
					}
					return sReturn;
				},"orderable": true
			},{
				"mRender": function(data, type, full) {
					time = full.select_time;
					time = time.slice(0,time.indexOf("."));
					sReturn = '<div>'+time+'</div>';
					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					let time = new Date()
					let time1 = time.toLocaleString()  //打印结果为：YYMMDD time
					let time2 = time.toLocaleDateString()   //打印结果为：YYMMDD
					let index = new Date(time2).getDay()
					/*是否为周末*/
					flag = weekArrayList [index]
					if (checkAuditTime('00:00','09:30') ||checkAuditTime('11:30','13:00') || checkAuditTime('15:00','24:00') || flag){
						sReturn = '<div>休市</div>';
					}
					else sReturn = '<div>开市</div>';
					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					futures_id = full.futures_id;
					sReturn = '<div><a href="#" onclick="Page.buyFutures(\'' + futures_id + '\')">【买入】</a><a href="#" onclick="Page.onShowKline(\'' + futures_id + '\')">【k线图】</a><a href="#" onclick="Page.InitHistoryRecord(\'' + futures_id + '\')">【历史数据】</a></div>';
					return sReturn;
				},"orderable": false
			}],
			"aLengthMenu": [[5,10,15,20,25,40,50,-1],[5,10,15,20,25,40,50,"所有记录"]],
			"fnDrawCallback": function(){$(".checkboxes").uniform();$(".group-checkable").uniform();},
			"sAjaxSource": "../../"+module+"_"+sub+"_servlet_action?action=get_futures_record&futures_id="+data.futures_id+"&futures_name="+data.futures_name+"&date=" + $("#record_query_setup #date").val()
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
	var onRemake=function () {
		window.location.reload();
	}
	var onStatisticRecord = function () {
		window.location.href="futures_statistic.jsp";
	}
	var onExportRecord=function () {
		var url="../../"+module+"_"+sub+"_servlet_action";
		var data={"action":"export_futures_record"};
		$.post(url,data,function (json) {
			if (json.result_code==0){
				//console.log(JSON.stringify(json));
				$("#futures_download_div #download_futures_rar_url").attr("href","javascript:window.open('"+json.download_rar_url+ "')");
				$("#futures_download_div #download_futures_xls_url").attr("href","javascript:window.open('"+json.download_xls_url+ "')");
				$("#futures_download_div").modal("show");
			}else{
				alert("[onExportRecord]与后端交互错误！"+json.result_smg);
			}
		})
	}
	var onFinishDownload=function () {
		$("#futures_download_div").modal("hide");
	}

	//打印事件，跳转到别的页面
	var onTablePrint=function () {
		window.location.href="futures_list_print_table.jsp";
	};

	var toSharePage = function (){
		window.location.href="../../share/shares/sharesData.jsp";
	};

	var toExchangePage = function (){
		window.location.href="../../share/exchanges/exchangesData.jsp";
	};

	var initFuturesKlinePage = function () {
		$("#page_sidebar_wrapper").hide();
		$("#page_header").hide();
		$("#page_footer").hide();
		$("#page-content").attr("style", "margin-left:0px");
		$(".page-container").attr("style", "margin-left:0px");
		$(".page-container").attr("style", "margin-top:0px");
		var futures_id = getUrlParam("futures_id");
		$("#kline_shares_id").val(futures_id);
		console.log(futures_id)

		$.post("../../" + module + "_" + sub + "_servlet_action?action=get_kline&futures_id=" + futures_id, function (json) {
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
					text: futures_id,
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
	var initFuturesListPrintTableRecord=function () {
		$("#page_sidebar_wrapper").hide();
		$("#page_header").hide();
		$("#page_footer").hide();
		$("#page-content").attr("style","margin-left:0px");
		$(".page-container").attr("style","margin-left:0px");
		$(".page-container").attr("style","margin-top:0px");
		// $(".page-container").attr("style","margin-bottom:0px"); 注意事项：top与bottom不能同时存在
		$.post("../../"+module+"_"+sub+"_servlet_action?action=get_futures_record",function(json){
			console.log(JSON.stringify(json));
			if(json.result_code==0){
				var list=json.aaData;
				var html="";
				if(list!=undefined && list.length>0){
					for(var i=0;i<list.length;i++){
						var record=list[i];
						var change="";
						var amplitude="";
						if(record.price_right_now!="" && record.price_yesterday!="") {
							change = (record.price_right_now - 0) - (record.price_yesterday - 0);
							change = Math.round(change * 100) / 100;
							amplitude=(record.price_right_now-record.price_yesterday)/record.price_yesterday;
							amplitude=Math.round(amplitude*100000)/1000;
							amplitude=amplitude+'%';
						}
						html=html+"                          	 		<tr>";
						html=html+"                                        <td>";
						html=html+"                                            "+record.futures_id;
						html=html+"                                        </td>";
						html=html+"                                        <td>";
						html=html+"                                            "+record.futures_name;
						html=html+"                                        </td>";
						html=html+"                                        <td>";
						html=html+"                                            "+record.price_today_begin;
						html=html+"                                        </td>";
						html=html+"                                        <td>";
						html=html+"                                            "+record.price_yesterday;
						html=html+"                                        </td>";
						html=html+"                                        <td>";
						html=html+"                                            "+record.price_right_now;
						html=html+"                                        </td>";
						html=html+"                                        <td>";
						html=html+"                                            "+record.price_high;
						html=html+"                                        </td>";
						html=html+"                                        <td>";
						html=html+"                                            "+record.price_low;
						html=html+"                                        </td>";
						html=html+"                                        <td>";
						html=html+"                                            "+change;
						html=html+"                                        </td>";
						html=html+"                                        <td>";
						html=html+"                                            "+amplitude;
						html=html+"                                        </td>";
						html=html+"                                    </tr>";
					}
				}
				$("#print_table_content_div").html(html);
				window.print();
			}
		})
	}
	var initFuturesStatisticRecord = function () {
		var chartDom = document.getElementById('chart_1');
		var myChart = echarts.init(chartDom);

		var url = "../../"+module+"_"+sub+"_servlet_action";
		var data={"action":"get_amplitude_by_futuresId"};
		var xlabel = [];
		var ylabel = [];
		$.post(url,data,function (json) {
			if(json.result_code == 0){
				//console.log(JSON.stringify(json));
				var list = json.aaData;
				if(list!=undefined && list.length>0){
					for (var i = 0; i < list.length; i++) {
						var item = list[i];
						xlabel.push(item.futures_id);
						ylabel.push(parseFloat(item.amplitude).toFixed(3));
					}
				}
			}else {
				alert("[initDeviceStatisticRecord]与后端交互错误！"+json.result_smg);
			}
		})

		var emphasisStyle = {
			itemStyle: {
				shadowBlur: 10,
				shadowColor: 'rgba(0,0,0,0.3)'
			}
		};
		var option = {
			legend: {
				data: ['bar'],
				left: '10%'
			},
			brush: {
				toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
				xAxisIndex: 0
			},
			toolbox: {
				feature: {
					magicType: {
						type: ['stack']
					},
					dataView: {}
				}
			},
			tooltip: {
				show:true,
				trigger: 'axis',
				//triggerOn:'mouseover',
				formatter: function(params) {
					//console.log(params[0])
					return '期货代码：' + params[0].name + '<br>涨跌幅：' + params[0].value +'%'
				}
			},
			xAxis: {
				data: xlabel,
				name: '期货代码',
				axisLine: { onZero: true },
				splitLine: { show: true },
				splitArea: { show: true }
			},
			yAxis: {},
			grid: {
				bottom: 100
			},
			series: [
				{
					name: '涨跌幅度',
					type: 'bar',
					stack: 'one',
					emphasis: emphasisStyle,
					data: ylabel
				},
			]
		};
		myChart.on('brushSelected', function (params) {
			var brushed = [];
			var brushComponent = params.batch[0];
			for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
				var rawIndices = brushComponent.selected[sIdx].dataIndex;
				brushed.push('[Series ' + sIdx + '] ' + rawIndices.join(', '));
			}
			myChart.setOption({
				title: {
					backgroundColor: '#333',
					text: 'SELECTED DATA INDICES: \n' + brushed.join('\n'),
					bottom: 0,
					right: '10%',
					width: 100,
					textStyle: {
						fontSize: 12,
						color: '#fff'
					}
				}
			});
		});

		option && myChart.setOption(option);
	}

//买入弹窗的按钮事件,将买入期货相关信息存到my_position数据库并且减少用户余额
	var onBuyDivSubmit=function () {
		if (!(/(^[1-9]\d*$)/.test($("#buy_div #amount").val()))) {
			$("#reminder").modal("show");
			return;
		}else {
			$("#reminder").modal("hide");
		}
		var balance = sessionStorage.getItem("balance");
		if($("#buy_div #amount").val()*$("#buy_div #price_right_now").val()>balance){
			alert("您账户的余额不足");
			return;
		}
		if(confirm("您确定要买入'"+$("#buy_div #futures_name").val()+"'吗？")){

			var url="../../user_center_servlet_action";
			var data={};
			data.action="modify_user_record";
			data.id=sessionStorage.getItem("id");
			data.username=sessionStorage.getItem("username");
			data.password=sessionStorage.getItem("password");
			data.email=sessionStorage.getItem("email");
			data.identity=sessionStorage.getItem("identity");
			data.balance=sessionStorage.getItem("balance") - $("#buy_div #amount").val()*$("#buy_div #price_right_now").val();
			$.post(url,data,function(json){
				if(json.result_code==0){
				}
			});

			var url="../../position_file_servlet_action";
			var data={};
			data.action="add_position_record";
			//获取填写在该页面的数据准备传向后端
			data.futures_id=$("#buy_div #futures_id").val();
			data.futures_name=$("#buy_div #futures_name").val();
			data.type=$("#buy_div #type").val();
			data.price_bought=$("#buy_div #price_right_now").val();
			data.amount=$("#buy_div #amount").val();
			data.user_name=sessionStorage.getItem("username");
			data.forward="开仓";
			$.post(url,data,function(json){
				if(json.result_code==0){
					alert("买入成功！");
					$("#buy_div").modal("hide");
					window.location.reload();
				}
			});
		}
	};

	//Page return 开始
	return {
		init: function() {
			initPageControl();
		},
		onShowKline: function (futures_id) {
			on_show_kline(futures_id);
		},
		buyFutures : function (futures_id) {
			//console.log(flag)
			if (flag){
				alert("已休市！")
			}
			else {
				var url="../../"+module+"_"+sub+"_servlet_action?futures_id="+futures_id;
				var data={};
				data.action="get_futures_record";
				data.futures_id=futures_id;
				$.post(url,data,function(json){
					//console.log(JSON.stringify(json));
					if(json.result_code==0) {
						var record = json.aaData;
						record=record[0];
						$("#buy_div #futures_id").val(record.futures_id);
						$("#buy_div #futures_name").val(record.futures_name);
						$("#buy_div #type").val("期货");
						$("#buy_div #price_right_now").val(record.price_right_now);
						$("#buy_div").modal("show");
					}
				})
			}
		},InitHistoryRecord:function (futures_id){
			//将之前的表删除掉，这样再次获取的时候就不会有warning了
			if ($.fn.dataTable.isDataTable('#record_list'))
			{
				console.log("=====================")
				// 获取这个表
				_table = $('#record_list').DataTable();
				// 把这个表销毁掉
				_table.destroy();
			}
			//查询操作要用到的，获取填写在查询框的数据
			var data={};
			data.futures_id=$("#record_query_setup #futures_id").val();
			data.futures_name=$("#record_query_setup #futures_name").val();
			$('.datatable').dataTable( {
				"paging":true,
				"searching":false,
				"oLanguage": {
					"aria": {
						"sortAscending": ": activate to sort column ascending",
						"sortDescending": ": activate to sort column descending"
					},
					"sProcessing":   "处理中...",
					"sLengthMenu":   "_MENU_ 记录/页",
					"sZeroRecords":  "没有匹配的记录",
					"sInfo":         "显示第 _START_ 至 _END_ 项记录，共 _TOTAL_ 项",
					"sInfoEmpty":    "显示第 0 至 0 项记录，共 0 项",
					"sInfoFiltered": "(由 _MAX_ 项记录过滤)",
					"sInfoPostFix":  "",
					"sSearch":       "过滤:",
					"oPaginate": {
						"sFirst":    "首页",
						"sPrevious": "上页",
						"sNext":     "下页",
						"sLast":     "末页"
					}
				},
				//注意事项：在html里定义了几列这里就几列，参数是full
				"aoColumns": [{"mRender": function(data, type, full) {
						sReturn = '<input type="checkbox" class="checkboxes" value="'+full.id+'"/>';
						return sReturn;
					},"orderable": false
				},{
					"mRender": function(data, type, full) {
						sReturn = '<div>'+full.futures_id+'</div>';
						return sReturn;
					},"orderable": true
				},{
					"mRender": function(data, type, full) {
						sReturn = '<div>'+full.futures_name+'</div>';
						return sReturn;
					},"orderable": false
				},{
					"mRender": function(data, type, full) {
						sReturn = '<div>'+full.price_today_begin+'</div>';
						return sReturn;
					},"orderable": false
				},{
					"mRender": function(data, type, full) {
						sReturn = '<div>'+full.price_yesterday+'</div>';
						return sReturn;
					},"orderable": false
				},{
					"mRender": function(data, type, full) {
						sReturn = '<div>'+full.price_right_now+'</div>';
						return sReturn;
					},"orderable": false
				},{
					"mRender": function(data, type, full) {
						sReturn = '<div>'+full.price_high+'</div>';
						return sReturn;
					},"orderable": false
				},{
					"mRender": function(data, type, full) {
						sReturn = '<div>'+full.price_low+'</div>';
						return sReturn;
					},"orderable": false
				},{
					"mRender": function(data, type, full) {
						if(full.price_right_now!="" && full.price_yesterday!=""){
							var change=(full.price_right_now-0)-(full.price_yesterday-0);
							change=Math.round(change*100)/100;
							if(change>0){
								sReturn = '<div class="font-red">'+change+'</div>';
							}else {
								sReturn = '<div class="font-green">'+change+'</div>';
							}
						}

						return sReturn;
					},"orderable": false
				},{
					"mRender": function(data, type, full) {
						if(full.price_right_now!="" && full.price_yesterday!=""){
							var amplitude=(full.price_right_now-full.price_yesterday)/full.price_yesterday;
							amplitude=Math.round(amplitude*100000)/1000;
							if(amplitude>0){
								sReturn = '<div class="font-red">'+amplitude+'%</div>';
							}else {
								sReturn = '<div class="font-green">'+amplitude+'%</div>';
							}
						}

						return sReturn;
					},"orderable": true
				},{
					"mRender": function(data, type, full) {
						sReturn = '<div>'+full.date+'</div>';
						return sReturn;
					},"orderable": false
				},{
					"mRender": function(data, type, full) {
						time = full.select_time;
						time = time.slice(0,time.indexOf("."));
						sReturn = '<div>'+time+'</div>';
						return sReturn;
					},"orderable": false
				},{
					"mRender": function(data, type, full) {
						sReturn = '<div><a href="javascript:Page.onModifyRecord(\'' + full.futures_id + '\',\''  + full.date + '\')"><i class="fa fa-pencil"></i> 修改</a><a href="javascript:Page.onDeleteRecord(\'' + full.futures_id + '\',\'' + full.date + '\')"><span class="glyphicon glyphicon-remove-sign">\n' +
							'</span> 删除 </div>';
						return sReturn;
					},"orderable": false
				}],
				"aLengthMenu": [[5,10,15,20,25,40,50,-1],[5,10,15,20,25,40,50,"所有记录"]],
				"fnDrawCallback": function(){$(".checkboxes").uniform();$(".group-checkable").uniform();},
				"sAjaxSource": "../../" + module + "_" + sub + "_servlet_action?action=get_history_data&futures_id=" + futures_id
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
	}
}();//Page
/*================================================================================*/
