var module="position";
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
		if(pageId=="my_position_ad"){
			initHistoryAdDataList();
		}
		if(pageId=="device_add"){
			initDeviceAdd();
		}
		if(pageId=="device_modify"){
			initDeviceModify();
		}
		if(pageId=="my_position_ad_list_print_table"){
			initHistoryAdPrintTable();
		}
		if(pageId=="position_ad_statistic"){
			initHistoryAdStatistic();
		}
	};
	/*----------------------------------------入口函数  结束----------------------------------------*/
	var columnsData=undefined;
	var recordResult=undefined;
	var chartData=[];
	var orderBy="";
	/*----------------------------------------业务函数  开始----------------------------------------*/
	/*------------------------------针对各个页面的入口  开始------------------------------*/
	var initHistoryAdDataList=function(){
		initManageFuturesDataListControlEvent();
		initHistoryAdDataRecordDatatable();
	}
	var initDeviceAdd=function(){
		initDeviceAddControlEvent();
	}
	var initDeviceModify=function(){
		initDeviceModifyControlEvent();
		initDeviceRecordView();
	}
	var initHistoryAdPrintTable=function () {
		initHistoryAdListPrintTableRecord()
	};
	var initHistoryAdStatistic=function () {
		initHistoryAdStatisticControlEvent();
		$.ajaxSettings.async = false;	//禁止异步方式，否则第一个函数还没执行完就会执行第二个了
		initHistoryAdStatisticRecord();
		$.ajaxSettings.async = true;
		initBarChart();
	};
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
		$('#add_button').click(function() {onAddRecord();});		//添加按钮
		$('#my_position_ad_add_div #submit').click(function() {onAddDivSubmit();});	//添加弹窗的提交按钮
		$('#my_position_ad_add_div #cancel').click(function() {onAddDivCancel();});	//添加弹出的取消按钮
		$('#my_position_ad_modify_div #submit').click(function() {onModifyDivSubmit();});	//修改弹窗的提交按钮
		$('#my_position_ad_modify_div #cancel').click(function() {onModifyDivCancel();});	//添加弹出的取消按钮
		$('#query_button').click(function() {initHistoryAdDataRecordDatatable();});		//查找按钮
		$('#remake_button').click(function() {onRemake();});				//重置按钮
		$('#refresh_button').click(function() {onRemake();});				//刷新按钮
		$('#export_button').click(function() {onExportRecord();});			//导出按钮
		$('#table_print_button').click(function() {onTablePrint();});		//打印按钮
		$('#statistic_button').click(function() {onStatisticRecord();});	//统计按钮
		//排序按钮
		$('#price_bought').click(function() {onPriceBoughtOrderBy();});
		$('#select_time').click(function() {onSelectTimeOrderBy();});
	};
	var initDeviceAddControlEvent=function(){
		$("#help_button").click(function() {help();});
		$('#add_button').click(function() {submitAddRecord();});
	};
	var initDeviceModifyControlEvent=function(){
		$("#help_button").click(function() {help();});
		$('#modify_button').click(function() {submitModifyRecord();});
	};
	var initHistoryAdStatisticControlEvent=function () {
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
				alert("已经完成记录添加。");
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
					alert("已经完成记录修改。");
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
						html=html+"<div>记录ID："+record.device_id+"<div>";
						html=html+"<div>记录名称："+record.device_name+"<div>";
						html=html+"<div><a href=\"javascript:Page.onModifyRecord("+record.id+")\">【修改记录】</a><a href=\"javascript:Page.onDeleteRecord("+record.id+")\">【删除记录】</a><div>";
						html=html+"<p>";
					}
				}
				$("#record_list_div").html(html);
			}
		})
	}

	//删除操作
	var onDeleteRecord = function(id){
		if(confirm("您确定要删除这条记录吗？")){
			var url="../../"+module+"_"+sub+"_servlet_action";
			var data={};
			data.action="delete_history_ad_record";
			data.id=id;
			$.post(url,data,function(json){
				if(json.result_code==0){
					alert("已经完成记录修改。");
					initHistoryAdDataRecordDatatable();
				}
			})

		}
	};

	//点击修改后跳出小弹窗，会在输入框显示当先要修改元组的数据
	var onModifyRecord=function(id){
		var url="../../"+module+"_"+sub+"_servlet_action?id="+id;
		var data={};
		data.action="get_history_administrator_record";
		data.id=id;
		$.post(url,data,function(json){
			console.log(JSON.stringify(json));
			if(json.result_code==0) {
				var record = json.aaData;
				record=record[0];
				$("#my_position_ad_modify_div #id").val(id);
				$("#my_position_ad_modify_div #user_name").val(record.user_name);
				$("#my_position_ad_modify_div #futures_id").val(record.futures_id);
				$("#my_position_ad_modify_div #futures_name").val(record.futures_name);
				$("#my_position_ad_modify_div #type").val(record.type);
				$("#my_position_ad_modify_div #price_bought").val(record.price_bought);
				$("#my_position_ad_modify_div #amount").val(record.amount);
				$("#my_position_ad_modify_div #forward").val(record.forward);
				$("#my_position_ad_modify_div").modal("show");
			}
		})
	};
	var onRemake=function () {
		window.location.reload();
	};

	//datatable的显示，显示全部或输入查询条件的查询结果
	var initHistoryAdDataRecordDatatable=function () {
		//将之前的表删除掉，这样再次获取的时候就不会有warning了
		if ($.fn.dataTable.isDataTable('#record_list'))
		{
			// 获取这个表
			_table = $('#record_list').DataTable();
			// 把这个表销毁掉
			_table.destroy();
		}
		//查询操作要用到的，获取填写在查询框的数据
		var data={};
		data.futures_id=$("#record_query_setup #futures_id").val();
		data.futures_name=$("#record_query_setup #futures_name").val();
		data.user_name=$("#record_query_setup #user_name").val();
		data.forward="开仓";
		data.order_by = orderBy;		//"date desc";
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
					sReturn = '<input type="checkbox" class="checkboxes"/>';
					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					sReturn = '<div>'+full.user_name+'</div>';
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
					sReturn = '<div>'+full.price_bought+'</div>';
					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					sReturn = '<div>'+full.price_right_now+'</div>';
					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					sReturn = '<div>'+full.amount+'</div>';
					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					sReturn = '<div>'+full.forward+'</div>';
					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					sReturn = '<div>'+full.select_time+'</div>';
					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					if(full.forward == '开仓'){
						var earning = (full.price_right_now-full.price_bought)*full.amount;
						earning=Math.round(earning*100)/100;
						if(earning >= 0){
							sReturn = '<div class="font-red">'+earning+'</div>';
						}else {
							sReturn = '<div class="font-green">'+earning+'</div>';
						}

					}else {
						var earning = (full.price_sale-full.price_bought)*full.amount
						earning=Math.round(earning*100)/100;
						if(earning >= 0){
							sReturn = '<div class="font-red">'+earning+'</div>';
						}else {
							sReturn = '<div class="font-green">'+earning+'</div>';
						}
					}
					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					//提问：这里比较奇怪，要想跳转则里面的数据必须都是数字类型的字符串（现在的发现是只要有string就不会执行函数）
					//结果：如果要传不是数字类型的字符串需要加引号这个才会跳转，还有一点这里加引号需要转义，且转义的是单引号
					sReturn = '<div><a href="javascript:Page.onModifyRecord('+full.id+')"><i class="fa fa-pencil"></i> 修改</a><a href="javascript:Page.onDeleteRecord('+full.id+')"><span class="glyphicon glyphicon-remove-sign">\n' +
						'</span> 删除</a></div>';
					return sReturn;
				},"orderable": false
			}],
			"aLengthMenu": [[5,10,15,20,25,40,50,-1],[5,10,15,20,25,40,50,"所有记录"]],
			"fnDrawCallback": function(){$(".checkboxes").uniform();$(".group-checkable").uniform();},
			//像后端发送请求，附带的数据是为查询时候用的，起初这俩数据都是空值，不造成影响
			"sAjaxSource": "../../"+module+"_"+sub+"_servlet_action?action=get_history_administrator_record&futures_id="+data.futures_id+"&futures_name="+data.futures_name+"&user_name="+data.user_name+"&order_by="+data.order_by+"&forward="+data.forward
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

	var onAddRecord=function(){
		$("#my_position_ad_add_div #forward").val("开仓");
		$("#my_position_ad_add_div").modal("show");
	}
	//在添加页面确认添加之后的事件
	var onAddDivSubmit=function () {
		submitAddRecordDiv();
	};
	var onAddDivSubmit=function () {
		var testBlank = $("#my_position_ad_add_div #user_name").val();
		if(testBlank==""){
			$("#my_position_ad_add_div #reminder").show();	//与.show作用相同，都可以达到显示或隐藏的目的
			alert("用户名不能为空");
			return;
		}else {
			$("#my_position_ad_add_div #reminder").hide();
		}
		if(confirm("您确定要添加该记录吗？")){;
			var url="../../"+module+"_"+sub+"_servlet_action";
			var data={};
			data.action="add_history_ad_record";
			//获取填写在该页面的数据准备传向后端
			data.user_name=$("#my_position_ad_add_div #user_name").val();
			data.futures_id=$("#my_position_ad_add_div #futures_id").val();
			data.futures_name=$("#my_position_ad_add_div #futures_name").val();
			data.type=$("#my_position_ad_add_div #type").val();
			data.price_bought=$("#my_position_ad_add_div #price_bought").val();
			data.amount=$("#my_position_ad_add_div #amount").val();
			data.forward=$("#my_position_ad_add_div #forward").val();
			//测试输入的是否为数字形式
			if(testNumber(data.price_bought) && testNumber(data.amount)){

			}else {
				alert("输入的数据不和规范");
				return;
			}
			if(data.price_bought === ""){
				alert("买入价格不能为空");
				return;
			}
			$.post(url,data,function(json){
				if(json.result_code==0){
					alert("已经完成记录添加。");
					$("#my_position_ad_add_div").modal("hide");
					initHistoryAdDataRecordDatatable();
				}
			});
		}
	};
	var onAddDivCancel=function () {
		//这里只能用.modal("hide"),有.hide效果不够
		$("#my_position_ad_add_div").modal("hide");
	};

	//在修改界面确认修改后进行的事件
	var onModifyDivSubmit=function () {
		submitModifyRecordDiv();
	};
	var submitModifyRecordDiv=function () {
		var testBlank = $("#my_position_ad_modify_div #user_name").val();
		if(testBlank==""){
			$("#my_position_ad_modify_div #reminder").show();	//与.show作用相同，都可以达到显示或隐藏的目的
			alert("用户名不能为空");
			return;
		}else {
			$("#my_position_ad_modify_div #reminder").hide();
		}

		if(confirm("您确定要修改该记录吗？")){;
			var url="../../"+module+"_"+sub+"_servlet_action";
			var data={};
			data.action="modify_history_ad_record";
			//获取填写在该页面的数据准备传向后端
			data.id=$("#my_position_ad_modify_div #id").val();
			data.user_name=$("#my_position_ad_modify_div #user_name").val();
			data.futures_id=$("#my_position_ad_modify_div #futures_id").val();
			data.futures_name=$("#my_position_ad_modify_div #futures_name").val();
			data.type=$("#my_position_ad_modify_div #type").val();
			data.price_bought=$("#my_position_ad_modify_div #price_bought").val();
			data.amount=$("#my_position_ad_modify_div #amount").val();
			data.forward="开仓";
			//测试输入的是否为数字形式
			if(testNumber(data.price_bought) && testNumber(data.amount)){

			}else {
				alert("输入的数据不和规范");
				return;
			}
			if(data.price_bought === ""){
				alert("买入价格不能为空");
				return;
			}
			$.post(url,data,function(json){
				if(json.result_code==0){
					alert("已经完成记录修改。");
					$("#my_position_ad_modify_div").modal("hide");
					initHistoryAdDataRecordDatatable();
				}
			});
		}
	};
	var onModifyDivCancel=function () {
		$("#my_position_ad_modify_div").modal("hide");
	};

	//测试字符串是不是数字形式(不进行输入的话也是可以通过测试的)
	var testNumber=function (num) {
		var numberFormat =/^[+-]?\d*(\.\d*)?(e[+-]?\d+)?$/;
		if(numberFormat.test(num)){
			return true;
		}else{
			if(num == ""){
				return true
			}else {
				return false;
			}

		}
	};
	var onExportRecord=function () {
		var url="../../"+module+"_"+sub+"_servlet_action";
		var data={"action":"export_position_record","forward":"开仓"};
		$.post(url,data,function (json) {
			if (json.result_code==0){
				console.log(JSON.stringify(json));
				$("#my_position_ad_download_div #download_url1").attr("href","javascript:window.open('"+json.download_url1+"')");	//window.open是打开一个新的页面进行跳转，但是这里没有显现出来
				$("#my_position_ad_download_div #download_url2").attr("href","javascript:window.open('"+json.download_url2+"')");
				$("#my_position_ad_download_div").modal("show");
			}else{
				alert("[onExportRecord]与后端交互错误！"+json.result_smg);
			}
		})
	};

	//打印事件，跳转到别的页面
	var onTablePrint=function () {
		window.location.href="my_position_ad_list_print_table.jsp";
	};
	//在这个页面进行显示
	var initHistoryAdListPrintTableRecord=function () {
		$("#page_header_wrapper").hide();
		$("#page_header").hide();
		$("#page_footer").hide();
		$("#footer").hide();
		$("#page-content").attr("style","margin-left:0px");
		$(".page-container").attr("style","margin-left:0px");
		$(".page-container").attr("style","margin-top:0px");
		// $(".page-container").attr("style","margin-bottom:0px"); 注意事项：top与bottom不能同时存在
		$.post("../../"+module+"_"+sub+"_servlet_action?action=get_history_administrator_record",function(json){
			console.log(JSON.stringify(json));
			if(json.result_code==0){
				var list=json.aaData;
				var html="";
				var price_sale = "";
				var earning = "";
				if(list!=undefined && list.length>0){
					for(var i=0;i<list.length;i++){
						var record=list[i];
						if(record.forward == '平仓'){
							continue;
						}else {
							price_sale=record.price_sale;
						}
						if(record.forward == '开仓'){
							var earning = (record.price_right_now-record.price_bought)*record.amount;
							earning=Math.round(earning*100)/100;
						}else {
							var earning = (record.price_sale-record.price_bought)*record.amount
							earning=Math.round(earning*100)/100;
						}

						html=html+"                          	 		<tr>";
						html=html+"                                        <td>";
						html=html+"                                            "+record.user_name;
						html=html+"                                        </td>";
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
						html=html+"                                            "+record.price_bought;
						html=html+"                                        </td>";
						html=html+"                                        <td>";
						html=html+"                                            "+record.price_right_now;
						html=html+"                                        </td>";
						html=html+"                                        <td>";
						html=html+"                                            "+record.amount;
						html=html+"                                        </td>";
						html=html+"                                        <td>";
						html=html+"                                            "+record.forward;
						html=html+"                                        </td>";
						html=html+"                                        <td>";
						html=html+"                                            "+record.select_time;
						html=html+"                                        </td>";
						html=html+"                                        <td>";
						html=html+"                                            "+earning;
						html=html+"                                        </td>";
						html=html+"                                    </tr>";
					}
				}
				$("#print_table_content_div").html(html);
				window.print();		//因为这个JQ封装的的这个post是以异步的方式进行执行，所以要在这里调用这个接口，不然打印的是html没有修改后的东西。
			}
		})
	};

	//统计功能的实现
	//这里进行跳转，统计图显示在另一个页面中
	var onStatisticRecord=function () {
		window.location.href="my_position_ad_statistic.jsp";
	};
	//当页面跳转后执行的，访问后端的数据，获取的东西是每个小时断和对应时间段的记录的数目，注意chartData是一个全局变量，在判断完page之后继续定义
	var initHistoryAdStatisticRecord=function () {
		var url = "../../"+module+"_"+sub+"_servlet_action";
		var data={"action":"get_history_ad_amplitude_by_futuresId"};
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
			var json = {"year":list[i].futures_name,"income":list[i].earning,"expenses":list[i].earning};
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
	}
	//统计页面返回按钮的事件
	var returnBack=function () {
		history.go(-1);
	}

	//排序功能
	//买入价格的排序
	var iconPriceBought = 0;
	var onPriceBoughtOrderBy=function () {
		iconSelectTime = 0;
		$("#select_time").attr("class","fa fa fa-sun-o");
		if(iconPriceBought === 0){
			$("#price_bought").attr("class","fa fa-chevron-up");
			iconPriceBought = 1;
			orderBy="price_bought asc";
			initHistoryAdDataRecordDatatable();
		}else if(iconPriceBought === 1){
			$("#price_bought").attr("class","fa fa-chevron-down");
			iconPriceBought = 2;
			orderBy="price_bought desc";
			initHistoryAdDataRecordDatatable();
		}else {
			$("#price_bought").attr("class","fa fa fa-sun-o");
			iconPriceBought = 0;
			orderBy="";
			initHistoryAdDataRecordDatatable();
		}
	};
	//订单时间的排序
	var iconSelectTime = 0;
	var onSelectTimeOrderBy=function () {
		iconPriceBought = 0;
		$("#price_bought").attr("class","fa fa fa-sun-o");
		if(iconSelectTime === 0){
			$("#select_time").attr("class","fa fa-chevron-up");
			iconSelectTime = 1;
			orderBy="select_time asc";
			initHistoryAdDataRecordDatatable();
		}else if(iconSelectTime === 1){
			$("#select_time").attr("class","fa fa-chevron-down");
			iconSelectTime = 2;
			orderBy="select_time desc";
			initHistoryAdDataRecordDatatable();
		}else {
			$("#select_time").attr("class","fa fa fa-sun-o");
			iconSelectTime = 0;
			orderBy="";
			initHistoryAdDataRecordDatatable();
		}
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
