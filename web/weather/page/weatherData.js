var module="weather";
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
		if(pageId=="manage_weather_data"){
			initManageFuturesDataList();
		}
		if(pageId=="device_add"){
			initDeviceAdd();
		}
		if(pageId=="device_modify"){
			initDeviceModify();
		}
	};

	/*----------------------------------------业务函数  开始----------------------------------------*/
	/*------------------------------针对各个页面的入口  开始------------------------------*/
	var initManageFuturesDataList=function(){
		initManageFuturesDataListControlEvent();
		initManageFuturesDataRecordDatatable();
	}
	var initDeviceAdd=function(){
		initDeviceAddControlEvent();
	}
	var initDeviceModify=function(){
		initDeviceModifyControlEvent();
		initDeviceRecordView();
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
		$("#newquery_button").click(function() {onQueryNewRecord();});
		$("#statis_button").click(function() {oStatisRecord();});
		$("#export_button").click(function() {oExportRecord();});
		$("#delete_button").click(function() {onDeleteCheckRecord();});
		$('#weather_modify_div #submit_button').click(function() {onModifyDivSubmit();});
		$('#query_button').click(function() {initManageFuturesDataRecordDatatable();});
		$('#refresh_button').click(function() {initManageFuturesDataRecordDatatable();});
		$('#reset_button').click(function() {
			$("#record_query_setup #city").val("");
			initManageFuturesDataRecordDatatable();
		});
		$("#query_new_button").click(function() {initNewDataRecordDatatable();});
		$('#reset_new_button').click(function() {
			$("#weather_query_setup #city_new").val("");
			initNewDataRecordDatatable();
		});
	}
	var initDeviceAddControlEvent=function(){
		$("#help_button").click(function() {help();});
		$('#add_button').click(function() {submitAddRecord();});
	}
	var initDeviceModifyControlEvent=function(){
		$('#modify_button').click(function() {submitModifyRecord();});
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

	var oExportRecord = function (){
		var len = $("input[name='checkdata']:checked").length;
		if(len == 0){
			alert("请选择要导出的记录。");
			return;
		}
		var chk_value =[];//定义一个数组
		$('input[name="checkdata"]:checked').each(function(){//遍历每一个名字为nodes的复选框，其中选中的执行函数
			chk_value.push($(this).val());//将选中的值添加到数组chk_value中
		});
		var selectId = chk_value.join(",");
		var url="../../"+module+"_"+sub+"_servlet_action";
		var data={};
		data.action="export_weather_record";
		data.ids=selectId;
		location.href = url+"?action=export_weather_record&ids="+selectId;

	}

	var onDeleteCheckRecord = function(){
		var len = $("input[name='checkdata']:checked").length;
		if(len == 0){
			alert("请选择要删除的记录。");
			return;
		}
		var chk_value =[];//定义一个数组
		$('input[name="checkdata"]:checked').each(function(){//遍历每一个名字为nodes的复选框，其中选中的执行函数
			chk_value.push($(this).val());//将选中的值添加到数组chk_value中
		});
		var selectId = chk_value.join(",");
		if(confirm("您确定要删除选中的记录吗？")){
			var url="../../"+module+"_"+sub+"_servlet_action";
			var data={};
			data.action="delete_weather_record";
			data.id=selectId;
			$.post(url,data,function(json){
				if(json.result_code==0){
					alert("已删除天气。");
					window.location.reload();
				}
			})

		}
	}
	var initDeviceRecordList=function(){
		getDeviceRecordList();
	}
	var initDeviceMobileRecord=function(){
		getDeviceMobileRecord();
	}

	//删除操作
	var onDeleteRecord = function(id){
		if(confirm("您确定要删除这条记录吗？")){
			var url="../../"+module+"_"+sub+"_servlet_action";
			var data={};
			data.action="delete_weather_record";
			data.id=id;
			$.post(url,data,function(json){
				if(json.result_code==0){
					alert("已删除天气。");
					window.location.reload();
				}
			})

		}
	};

	//点击修改后跳出小弹窗，会在输入框显示当先要修改元组的数据
	var onModifyRecord=function(id){
		var url="../../"+module+"_"+sub+"_servlet_action";
		var data={};
		data.action="get_weather_record";
		data.id=id;
		$.post(url,data,function(json){
			if(json.result_code==0) {
				var record = json.aaData;
				record=record[0];
				$("#weather_modify_div #id").val(record.id);
				$("#weather_modify_div #city").val(record.city);
				$("#weather_modify_div #temperature").val(record.temperature);
				$("#weather_modify_div #humidity").val(record.humidity);
				$("#weather_modify_div #wind").val(record.wind);
				$("#weather_modify_div").modal("show");
			}
		})
	};
	var onRemake=function () {
		window.location.reload();
	};

	var initNewDataRecordDatatable=function () {

		//将之前的表删除掉，这样再次获取的时候就不会有warning了
		if ($.fn.dataTable.isDataTable('#record_new_list'))
		{
			console.log("=====================")
			// 获取这个表
			_table = $('#record_new_list').DataTable();
			// 把这个表销毁掉
			_table.destroy();
		}
		//查询操作要用到的，获取填写在查询框的数据
		var data={};
		data.city=$("#weather_query_setup #city_new").val();
		if(data.city == ""){
			data.city="999";
		}
		$('.datatablenew').dataTable( {
			ajax: "../../"+module+"_"+sub+"_servlet_action?action=get_weather_record&limit=1&city="+data.city,
			paging:false,
			searching:false,
			oLanguage: {
				aria: {
					sortAscending: ": activate to sort column ascending",
					sortDescending: ": activate to sort column descending"
				},
				sProcessing:   "处理中...",
				sLengthMenu:   "_MENU_ 记录/页",
				sZeroRecords:  "没有匹配的记录",
				sInfo:         "显示第 _START_ 至 _END_ 项记录，共 _TOTAL_ 项",
				sInfoEmpty:    "显示第 0 至 0 项记录，共 0 项",
				sInfoFiltered: "(由 _MAX_ 项记录过滤)",
				sInfoPostFix:  ""
			},
			//注意事项：在html里定义了几列这里就几列，参数是full
			aoColumns: [{
				"mRender": function(data, type, full) {
					sReturn = '<div>'+full.city+'</div>';
					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					sReturn = '<div>'+full.temperature+'</div>';
					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					sReturn = '<div>'+full.humidity+'</div>';
					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					sReturn = '<div>'+full.wind+'</div>';
					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					sReturn = '<div>'+full.create_time.substr(0,full.create_time.length-2)+'</div>';
					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					//注意事项：这里比较奇怪，要想跳转则里面的数据必须都是int（现在的发现是只要有string就不会执行函数）
					sReturn = '<div><a href="javascript:Page.onModifyRecord('+full.id+')"><i class="fa fa-pencil"></i> 修改</a><a href="javascript:Page.onDeleteRecord('+full.id+')"><span class="glyphicon glyphicon-remove-sign">\n' +
						'</span> 删除</div>';
					return sReturn;
				},"orderable": false
			}],
			fnDrawCallback: function(){$(".checkboxes").uniform();$(".group-checkable").uniform();}
		});
		$('.datatablenew').find('.group-checkable').change(function () {
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
		$('.datatablenew').on('change', 'tbody tr .checkboxes', function () {
			$(this).parents('tr').toggleClass("active");
		});
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
		data.city=$("#record_query_setup #city").val();
		$('.datatable').dataTable( {
			ajax: "../../"+module+"_"+sub+"_servlet_action?action=get_weather_record&city="+data.city,
			paging:true,
			searching:false,
			oLanguage: {
				aria: {
					sortAscending: ": activate to sort column ascending",
					sortDescending: ": activate to sort column descending"
				},
				sProcessing:   "处理中...",
				sLengthMenu:   "_MENU_ 记录/页",
				sZeroRecords:  "没有匹配的记录",
				sInfo:         "显示第 _START_ 至 _END_ 项记录，共 _TOTAL_ 项",
				sInfoEmpty:    "显示第 0 至 0 项记录，共 0 项",
				sInfoFiltered: "(由 _MAX_ 项记录过滤)",
				sInfoPostFix:  "",
				oPaginate: {
					sFirst:    "首页",
					sPrevious: "上页",
					sNext:     "下页",
					sLast:     "末页"
				}
			},
			//注意事项：在html里定义了几列这里就几列，参数是full
			aoColumns: [{"mRender": function(data, type, full) {
					sReturn = '<input type="checkbox" class="checkboxes" value="'+full.id+'" name="checkdata"/>';
					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					sReturn = '<div>'+full.city+'</div>';
					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					sReturn = '<div>'+full.temperature+'</div>';
					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					sReturn = '<div>'+full.humidity+'</div>';
					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					sReturn = '<div>'+full.wind+'</div>';
					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					sReturn = '<div>'+full.create_time.substr(0,full.create_time.length-2)+'</div>';
					return sReturn;
				},"orderable": false
			},{
				"mRender": function(data, type, full) {
					//注意事项：这里比较奇怪，要想跳转则里面的数据必须都是int（现在的发现是只要有string就不会执行函数）
					sReturn = '<div><a href="javascript:Page.onModifyRecord('+full.id+')"><i class="fa fa-pencil"></i> 修改</a><a href="javascript:Page.onDeleteRecord('+full.id+')"><span class="glyphicon glyphicon-remove-sign">\n' +
						'</span> 删除</div>';
					return sReturn;
				},"orderable": false
			}],
			aLengthMenu: [[5,10,15,20,25,40,50,-1],[5,10,15,20,25,40,50,"所有记录"]],
			fnDrawCallback: function(){$(".checkboxes").uniform();$(".group-checkable").uniform();}
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

	//在修改界面确认修改后进行的事件
	var onModifyDivSubmit=function () {
		submitModifyRecordDiv();
	};
	var oStatisRecord = function (){
		$("#weather_statis_div").modal("show");
		setTimeout(function() {
			loadStatis();
		}, 1000);
	}

	function loadStatis(){
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('statis_main'));
		myChart.resize();
		var url="../../"+module+"_"+sub+"_servlet_action";
		var data={};
		data.action="statis_weather_record";
		var option = {};
		$.post(url,data,function(json){
			if(json.result_code==0){
				option = {
					xAxis: {
						type: 'category',
						data: json.data.xData,
						//设置字体倾斜
						axisLabel: {
							interval: 0,
							rotate: 45,
							//倾斜度 -90 至 90 默认为0
							margin: 2,
							textStyle: {
								fontWeight: "bolder",
								color: "#000000"
							}
						}
					},
					yAxis: {
						type: 'value'
					},
					series: [
						{
							data: json.data.yData,
							type: 'bar'
						}
					],
					tooltip: {
						trigger: 'axis', //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
						axisPointer: {// 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					}
				};
				myChart.setOption(option);
			}
		});
	}
	var onQueryNewRecord = function (){
		$("#weather_query_div").modal("show");
	}
	var submitModifyRecordDiv=function () {
		if(confirm("您确定要修改该记录吗？")){;
			var url="../../"+module+"_"+sub+"_servlet_action";
			var data={};
			data.action="modify_weather_record";
			//获取填写在该页面的数据准备传向后端
			data.city=$("#weather_modify_div #city").val();
			data.temperature=$("#weather_modify_div #temperature").val();
			data.humidity=$("#weather_modify_div #humidity").val();
			data.wind=$("#weather_modify_div #wind").val();
			if(data.city=="" || data.temperature=="" || data.humidity=="" || data.wind==""){
				alert("请将信息填写完整！");
				return;
			}
			data.id=$("#weather_modify_div #id").val();
			$.post(url,data,function(json){
				if(json.result_code==0){
					alert("已经完成天气修改。");
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
		onDeleteRecord:function(id){
			onDeleteRecord(id);
		},
		onModifyRecord:function(id){
			onModifyRecord(id);
		}
	}
}();//Page
/*================================================================================*/
