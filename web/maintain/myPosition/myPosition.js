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
		if(pageId=="device_add"){
			initDeviceAdd();
		}
		if(pageId=="device_modify"){
			initDeviceModify();
		}
		if(pageId=="futures_list_print_table"){
			initFuturesPrintTable();
		}
		if(pageId=="futures_statistic"){
			initFuturesStatistic();
		}

	};
	/*----------------------------------------入口函数  结束----------------------------------------*/
	var columnsData=undefined;
	var recordResult=undefined;
	var chartData=[];
	/*----------------------------------------业务函数  开始----------------------------------------*/
	/*------------------------------针对各个页面的入口  开始------------------------------*/
	var initDeviceAdd=function(){
		initDeviceAddControlEvent();
	}
	var initDeviceModify=function(){
		initDeviceModifyControlEvent();
		initDeviceRecordView();
	}
	var initFuturesDataList=function () {
		initFuturesDataControlEvent();
		initFuturesDataRecordDatatable();
	}
	var initFuturesPrintTable=function () {
		initFuturesListPrintTableRecord()
	};
	var initFuturesStatistic=function () {
		initFuturesStatisticControlEvent();
		$.ajaxSettings.async = false;	//禁止异步方式，否则第一个函数还没执行完就会执行第二个了
		initFuturesStatisticRecord();
		$.ajaxSettings.async = true;
		initBarChart();
	};
	/*------------------------------针对各个页面的入口 结束------------------------------*/
	var getUrlParam=function(name){
		//获取url中的参数
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		if (r != null) return decodeURI(r[2]); return null; //返回参数值，如果是中文传递，就用decodeURI解决乱码，否则用unescape
	}
	var initDeviceAddControlEvent=function(){
		$("#help_button").click(function() {help();});
		$('#add_button').click(function() {submitAddRecord();});
	}
	var initDeviceModifyControlEvent=function(){
		$("#help_button").click(function() {help();});
		$('#modify_button').click(function() {submitModifyRecord();});
	}
	var initFuturesDataControlEvent=function () {
		$('#remake_button').click(function() {onRemake();});	//重置按钮
		$('#query_button').click(function() {initFuturesDataRecordDatatable();});	//查询按钮
		$('#export_button').click(function() {onExportRecord();});	//导出按钮
		$('#finish_download_button').click(function() {onFinishDownload();});	//导出完毕按钮
		$('#refresh_button').click(function() {onRemake();});	//另一个刷新按钮
		$('#table_print_button').click(function() {onTablePrint();});	//打印按钮
		$('#statistic_button').click(function() {onStatisticRecord();});	//统计按钮
	};
	var initFuturesStatisticControlEvent=function () {
		$('#return_button').click(function() {returnBack();});
	}
	var initDeviceRecordView=function(){
		var id=getUrlParam("id");
		var data={};
		data.action="get_device_record";
		data.id=id;
		$.post(module+"_"+sub+"_servlet_action",data,function(json){
			console.log(JSON.stringify(json));
			if(json.result_code==0){
				var list=json.aaData;
				if(list!=undefined && list.length>0){
					for(var i=0;i<list.length;i++){
						var record=list[i];
						$("#device_id").val(record.device_id);
						$("#device_name").val(record.device_name);
					}
				}
			}
		})
	}
	var submitAddRecord=function(){
		var url="device_file_servlet_action";
		var data={};
		data.action="add_device_record";
		data.device_id=$("#device_id").val();
		data.device_name=$("#device_name").val();
		$.post(url,data,function(json){
			if(json.result_code==0){
				alert("已经完成设备添加。");
				window.location.href="user_list.jsp";
			}
		});
	}
	var submitModifyRecord=function(){
		if(confirm("您确定要修改该记录吗？")){
			var id=getUrlParam("id");
			var url="device_file_servlet_action";
			var data={};
			data.action="modify_device_record";
			data.id=id;
			data.device_id=$("#device_id").val();
			data.device_name=$("#device_name").val();
			$.post(url,data,function(json){
				if(json.result_code==0){
					alert("已经完成设备修改。");
					window.location.href="user_list.jsp";
				}
			});
		}
	}


	var initDeviceRecordList=function(){
		getDeviceRecordList();
	}
	var initDeviceMobileRecord=function(){
		getDeviceMobileRecord();
	}
	var getDeviceRecordList=function(){
		$.post(module+"_"+sub+"_servlet_action?action=get_device_record",function(json){
			console.log(JSON.stringify(json));
			if(json.result_code==0){
				var list=json.aaData;
				var html="";
				if(list!=undefined && list.length>0){
					for(var i=0;i<list.length;i++){
						var record=list[i];
						html=html+"<div>序号："+i+"<div>";
						html=html+"<div>设备ID："+record.device_id+"<div>";
						html=html+"<div>设备名称："+record.device_name+"<div>";
						html=html+"<div><a href=\"javascript:Page.onModifyRecord("+record.id+")\">【修改记录】</a><a href=\"javascript:Page.onDeleteRecord("+record.id+")\">【删除记录】</a><div>";
						html=html+"<p>";
					}
				}
				$("#record_list_div").html(html);
			}
		})
	}
	var onDeleteRecord = function(id){
		if(confirm("您确定要删除这条记录吗？")){
			if(id>-1){
				var url="device_file_servlet_action";
				var data={};
				data.action="delete_device_record";
				data.id=id;
				$.post(url,data,function(json){
					if(json.result_code==0){
						getDeviceRecordList();
					}
				})
			}
		}
	};
	var onModifyRecord=function(id){
		window.location.href="device_modify.jsp?id="+id;
	}
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
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					sReturn = '<div>'+full.futures_name+'</div>';
					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					sReturn = '<div>'+full.type+'</div>';
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
						var amplitude=(full.price_right_now-full.price_yesterday)/full.price_yesterday*100;
						amplitude=Math.round(amplitude*1000)/1000;
						if(amplitude>0){
							sReturn = '<div class="font-red">'+amplitude+'%</div>';
						}else {
							sReturn = '<div class="font-green">'+amplitude+'%</div>';
						}
					}else {
						sReturn = '<div></div>'
					}

					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					//如果要传不是数字类型的字符串需要加引号这个才会跳转，还有一点这里加引号需要转义，且转义的是单引号
					sReturn = '<div><a href="javascript:Page.onModifyRecord('+full.id+')">【买入】</a><a href="javascript:Page.onDeleteRecord('+full.id+')">【k线图】</div>';
					return sReturn;
				},"orderable": false
			}],
			"aLengthMenu": [[5,10,15,20,25,40,50,-1],[5,10,15,20,25,40,50,"所有记录"]],
			"fnDrawCallback": function(){$(".checkboxes").uniform();$(".group-checkable").uniform();},
			//"sAjaxSource": "get_record.jsp"
			"sAjaxSource": "../../"+module+"_"+sub+"_servlet_action?action=get_futures_record&futures_id="+data.futures_id+"&futures_name="+data.futures_name
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

	//导出事件
	var onExportRecord=function () {
		var url="../../"+module+"_"+sub+"_servlet_action";
		var data={"action":"export_futures_record"};
		$.post(url,data,function (json) {
			if (json.result_code==0){
				console.log(JSON.stringify(json));
				$("#futures_download_div #download_url").attr("href","javascript:window.open('"+json.download_url+"')");	//window.open是打开一个新的页面进行跳转，但是这里没有显现出来
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
							amplitude=(record.price_right_now-record.price_yesterday)/record.price_yesterday*100;
							amplitude=Math.round(amplitude*1000)/1000;
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
						html=html+"                                            "+record.type;
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
				//window.print();
			}
		})
	}

	//统计功能的实现
	//这里进行跳转，统计图显示在另一个页面中
	var onStatisticRecord=function () {
		window.location.href="futures_statistic.jsp";
	};
	//当页面跳转后执行的，访问后端的数据，获取的东西是每个小时断和对应时间段的记录的数目，注意chartData是一个全局变量，在判断完page之后继续定义
	var initFuturesStatisticRecord=function () {
		var url = "../../"+module+"_"+sub+"_servlet_action";
		//其实不管是用data传参还是将要传递的参数放到url里，后端操作过程没有区别
		var data={"action":"get_amplitude_by_futuresId"};
		$.post(url,data,function (json) {
			var html="";
			if(json.result_code == 0){
				console.log(JSON.stringify(json));
				var list = json.aaData;
				if(list!=undefined && list.length>0){
					changeResultDataToChartData(list,chartData);
					console.log(JSON.stringify(chartData));
				}
			}else {
				alert("[initDeviceStatisticRecord]与后端交互错误！"+json.result_smg);
			}
		})
	};
	//将数据塞到chartData里，这个模板限定的用chartData这个变量
	var changeResultDataToChartData=function (list,chartData) {
		for(var i = 0; i < list.length; i++){
			//year是横坐标，incom是横条的纵坐标，expenses是折线的纵坐标
			var json = {"year":list[i].futures_name,"income":list[i].amplitude,"expenses":list[i].amplitude};
			chartData.push(json);
		}
	};
	//初始化那个统计表，必须要但不知道具体原理的东西
	var initBarChart=function () {
		var chart = AmCharts.makeChart("chart_1", {
			"type": "serial",
			"theme": "light",
			"pathToImages": Metronic.getGlobalPluginsPath() + "amcharts/amcharts/images/",
			"autoMargins": false,
			"marginLeft": 30,
			"marginRight": 8,
			"marginTop": 10,
			"marginBottom": 26,

			"fontFamily": 'Open Sans',
			"color":    '#888',

			"dataProvider": chartData,
			"valueAxes": [{
				"axisAlpha": 0,
				"position": "left"
			}],
			"startDuration": 1,
			"graphs": [{
				"alphaField": "alpha",
				"balloonText": "<span style='font-size:13px;'>[[title]] in [[category]]:<b>[[value]]</b> [[additional]]</span>",
				"dashLengthField": "dashLengthColumn",
				"fillAlphas": 1,
				"title": "Income",
				"type": "column",
				"valueField": "income"
			}, {
				"balloonText": "<span style='font-size:13px;'>[[title]] in [[category]]:<b>[[value]]</b> [[additional]]</span>",
				"bullet": "round",
				"dashLengthField": "dashLengthLine",
				"lineThickness": 3,
				"bulletSize": 7,
				"bulletBorderAlpha": 1,
				"bulletColor": "#FFFFFF",
				"useLineColorForBulletBorder": true,
				"bulletBorderThickness": 3,
				"fillAlphas": 0,
				"lineAlpha": 1,
				"title": "Expenses",
				"valueField": "expenses"
			}],
			"categoryField": "year",
			"categoryAxis": {
				"gridPosition": "start",
				"axisAlpha": 0,
				"tickLength": 0
			}
		});

		$('#chart_1').closest('.portlet').find('.fullscreen').click(function() {
			chart.invalidateSize();
		});
	};
	//统计页面返回按钮的事件
	var returnBack=function () {
		history.go(-1);
	}
	//Page return 开始
	return {
		init: function() {
			initPageControl();
		},
		onDeleteRecord:function(id){
			onDeleteRecord(id);
		},
		onModifyRecord:function(id){
			onModifyRecord(id);
		}
	}
}();//Page
/*================================================================================*/
