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
		if(pageId=="manage_futures_data"){
			initManageFuturesDataList();
		}
		if (pageId == "futures_statistic") {
			initFuturesStatistic();
		}
		if(pageId=="futures_list_print_table"){
			initFuturesPrintTable();
		}
	};
	/*----------------------------------------入口函数  结束----------------------------------------*/
	var columnsData=undefined;
	var recordResult=undefined;
	/*----------------------------------------业务函数  开始----------------------------------------*/
	/*------------------------------针对各个页面的入口  开始------------------------------*/
	var initManageFuturesDataList=function(){
		initManageFuturesDataListControlEvent();
		initManageFuturesDataRecordDatatable();
	}
	var initFuturesStatistic = function () {
		$.ajaxSettings.async = false;	//禁止异步方式，否则第一个函数还没执行完就会执行第二个了
		initFuturesStatisticRecord();
		$.ajaxSettings.async = true;
	}
	var initFuturesPrintTable=function () {
		initFuturesListPrintTableRecord()
	}
	/*------------------------------针对各个页面的入口 结束------------------------------*/
	var getUrlParam=function(name){
		//获取url中的参数
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		if (r != null) return decodeURI(r[2]); return null; //返回参数值，如果是中文传递，就用decodeURI解决乱码，否则用unescape
	};
	//按钮事件
	var initManageFuturesDataListControlEvent=function(){
		$("#help_button").click(function() {help();});
		$('#add_button').click(function() {onAddRecord();});
		$('#futures_add_div #submit_button').click(function() {onAddDivSubmit();});
		$('#futures_modify_div #submit_button').click(function() {onModifyDivSubmit();});
		$('#query_button').click(function() {initManageFuturesDataRecordDatatable();});
		$('#remake_button').click(function() {onRemake();});
		$('#export_button').click(function() {onExportRecord();});
		$('#table_print_button').click(function() {onTablePrint();});
		$('#show_shares').click(function(){toSharePage();});
		$('#show_exchange').click(function(){toExchangePage();});
		$('#refresh_button').click(function() {onRemake();});
		$('#table_button').click(function () {
			onStatisticRecord();
		});
	}
	/*isNull判定*/
	function isNull(arg1)
	{
		return !arg1 && arg1!==0 && typeof arg1!=="boolean"?true:false;
	}
	var onAddRecord=function(){
		$("#futures_add_div").modal("show");
	}
	//在添加页面确认添加之后的事件
	var onAddDivSubmit=function () {
		submitAddRecordDiv();
	};
	var submitAddRecordDiv=function () {
		if(confirm("您确定要添加该记录吗？")){
			var url="../../"+module+"_"+sub+"_servlet_action";
			var data={};
			data.action="add_futures_record";
			//获取填写在该页面的数据准备传向后端
			data.futures_id=$("#futures_add_div #futures_id").val();
			if(data.futures_id==""){
				alert("代号不能为空");
				return;
			}
			data.futures_name=$("#futures_add_div #futures_name").val();
			data.price_today_begin=$("#futures_add_div #price_today_begin").val();
			data.price_yesterday=$("#futures_add_div #price_yesterday").val();
			data.price_right_now=$("#futures_add_div #price_right_now").val();
			data.price_high=$("#futures_add_div #price_high").val();
			data.price_low=$("#futures_add_div #price_low").val();
			data.date=$("#futures_add_div #date").val();
			//测试输入的是否为数字形式
			if(isNaN(data.price_today_begin) || isNaN(data.price_yesterday) || isNaN(data.price_right_now) || isNaN(data.price_high) || isNaN(data.price_low)){
				alert("输入的数据不合规范！请输入数字！");
				return;
			}
			$.post(url,data,function(json){
				if(json.result_code==0){
					alert("已经完成期货记录添加！");
					window.location.reload();
				}
			});
		}
	};
	var onStatisticRecord = function () {
		window.location.href="futures_statistic.jsp";
	}
	//在修改界面确认修改后进行的事件
	var onModifyDivSubmit=function (date) {
		$('#futures_modify_div #submit_button').click(function () {
			submitModifyRecordDiv(date);
		});
	};
	var submitModifyRecordDiv=function (date) {
		if(confirm("您确定要修改该记录吗？")){
			var url="../../"+module+"_"+sub+"_servlet_action";
			var modify_data={};
			modify_data.action="modify_futures_record";
			//获取填写在该页面的数据准备传向后端
			modify_data.futures_id=$("#futures_modify_div #futures_id").val();
			modify_data.date=date;

			if(isNull(modify_data.futures_id)){
				$("#futures_modify_div #reminder").modal("show");
				alert("代号不能为空");
				return;
			}
			modify_data.id=$("#futures_modify_div #id").val();
			modify_data.futures_name=$("#futures_modify_div #futures_name").val();
			modify_data.price_today_begin=$("#futures_modify_div #price_today_begin").val();
			modify_data.price_yesterday=$("#futures_modify_div #price_yesterday").val();
			modify_data.price_right_now=$("#futures_modify_div #price_right_now").val();
			modify_data.price_high=$("#futures_modify_div #price_high").val();
			modify_data.price_low=$("#futures_modify_div #price_low").val();
			//测试输入的是否为数字形式
			if(isNaN(modify_data.price_today_begin) || isNaN(modify_data.price_yesterday) || isNaN(modify_data.price_right_now) || isNaN(modify_data.price_high) || isNaN(modify_data.price_low)){
				alert("输入的数据不合规范！请输入数字！");
				return;
			}
			$.post(url,modify_data,function(json){
				if(json.result_code==0){
					alert("已经完成外汇记录修改！");
					window.location.reload();
				}
			});
		}
	};

	var toSharePage = function (){
		window.location.href="../../share/shares/sharesData_admin.jsp";
	};
	var toExchangePage = function (){
		window.location.href="../../share/exchanges/exchangesData_admin.jsp";
	};

	var onRemake=function () {
		window.location.reload();
	};

	//datatable的显示，显示全部或输入查询条件的查询结果
	var initManageFuturesDataRecordDatatable=function () {
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
					sReturn = '<div><a href="javascript:Page.onModifyRecord(\'' + full.futures_id +'\',\''+ full.date+ '\')"><i class="fa fa-pencil"></i> 修改</a><br><a href="javascript:Page.onDeleteRecord(\'' + full.futures_id +'\',\''+ full.date+ '\')"><span class="glyphicon glyphicon-remove-sign">\n' +
						'</span> 删除</a><br><a href="javascript:Page.InitHistoryRecord(\'' + full.futures_id + '\')"><i class="fa fa-pencil"></i> 历史数据</a></div>';
					return sReturn;
				},"orderable": false
			}],
			"aLengthMenu": [[5,10,15,20,25,40,50,-1],[5,10,15,20,25,40,50,"所有记录"]],
			"fnDrawCallback": function(){$(".checkboxes").uniform();$(".group-checkable").uniform();},
			//像后端发送请求，附带的数据是为查询时候用的，起初这俩数据都是空值，不造成影响
			"sAjaxSource": "../../"+module+"_"+sub+"_servlet_action?action=get_futures_admin&futures_id="+data.futures_id+"&futures_name="+data.futures_name +"&date=" + $("#record_query_setup #date").val()
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
	};

	//打印事件，跳转到别的页面
	var onTablePrint=function () {
		window.location.href="futures_list_print_table.jsp";
	};
	//在这个页面进行显示
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
	//Page return 开始
	return {
		init: function() {
			initPageControl();
		},
		onModifyRecord: function (futures_id,date) {
			var url="../../"+module+"_"+sub+"_servlet_action";
			var query_data = {};
			query_data.action="get_futures_record";
			query_data.futures_id=futures_id;
			query_data.date=date;
			$.post(url,query_data,function(json){
				if(json.result_code==0){
					var data = json.aaData[0];
					$('#futures_modify_div #futures_id').val(data.futures_id);
					$('#futures_modify_div #futures_name').val(data.futures_name);
					$('#futures_modify_div #price_today_begin').val(data.price_today_begin);
					$('#futures_modify_div #price_yesterday').val(data.price_yesterday);
					$('#futures_modify_div #price_right_now').val(data.price_right_now);
					$('#futures_modify_div #price_high').val(data.price_high);
					$('#futures_modify_div #price_low').val(data.price_low);
				}
			});
			$("#futures_modify_div").modal("show");
			onModifyDivSubmit(date);
		},
		onDeleteRecord:function (futures_id,date) {
			if (confirm("您确定要删除该记录吗？")) {
				var url = "../../" + module + "_" + sub + "_servlet_action";
				var delete_data = {};
				delete_data.action = "delete_futures_record";
				delete_data.futures_id = futures_id;
				delete_data.date=date;
				$.post(url,delete_data,function(json){
					if(json.result_code==0){
						alert("已删除记录！")
						window.location.reload();
					}
				});
			}
		},
		InitHistoryRecord:function (futures_id){
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
