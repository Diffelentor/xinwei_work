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
		if(pageId=="device_add"){
			initDeviceAdd();
		}
		if(pageId=="device_modify"){
			initDeviceModify();
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
	var initDeviceAdd=function(){
		initDeviceAddControlEvent();
	}
	var initDeviceModify=function(){
		initDeviceModifyControlEvent();
		initDeviceRecordView();
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
	}
	var initDeviceAddControlEvent=function(){
		$("#help_button").click(function() {help();});
		$('#add_button').click(function() {submitAddRecord();});
	}
	var initDeviceModifyControlEvent=function(){
		$("#help_button").click(function() {help();});
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
	var onAddRecord=function(){
		$("#futures_add_div").modal("show");
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
				window.location.href="device_list.jsp";
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
					window.location.href="device_list.jsp";
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

	//删除操作
	var onDeleteRecord = function(id){
		if(confirm("您确定要删除这条记录吗？")){
			var url="../../"+module+"_"+sub+"_servlet_action";
			var data={};
			data.action="delete_futures_record";
			data.id=id;
			$.post(url,data,function(json){
				if(json.result_code==0){
					alert("已经完成设备修改。");
					window.location.reload();
				}
			})

		}
	};

	//点击修改后跳出小弹窗，会在输入框显示当先要修改元组的数据
	var onModifyRecord=function(id){
		var url="../../"+module+"_"+sub+"_servlet_action?id="+id;
		var data={};
		data.action="get_futures_record";
		data.id=id;
		$.post(url,data,function(json){
			console.log(JSON.stringify(json));
			if(json.result_code==0) {
				var record = json.aaData;
				record=record[0];
				$("#futures_modify_div #id").val(record.id);
				$("#futures_modify_div #futures_id").val(record.futures_id);
				$("#futures_modify_div #futures_name").val(record.futures_name);
				$("#futures_modify_div #price_today_begin").val(record.price_today_begin);
				$("#futures_modify_div #price_yesterday").val(record.price_yesterday);
				$("#futures_modify_div #price_right_now").val(record.price_right_now);
				$("#futures_modify_div #price_high").val(record.price_high);
				$("#futures_modify_div #price_low").val(record.price_low);
				$("#futures_modify_div").modal("show");
			}
		})
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
				},"orderable": false
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
						amplitude=Math.round(amplitude*100000)/100000;
						if(amplitude>0){
							sReturn = '<div class="font-red">'+amplitude+'%</div>';
						}else {
							sReturn = '<div class="font-green">'+amplitude+'%</div>';
						}
					}

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
			"aLengthMenu": [[5,10,15,20,25,40,50,-1],[5,10,15,20,25,40,50,"所有记录"]],
			"fnDrawCallback": function(){$(".checkboxes").uniform();$(".group-checkable").uniform();},
			//像后端发送请求，附带的数据是为查询时候用的，起初这俩数据都是空值，不造成影响
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

	//在添加页面确认添加之后的事件
	var onAddDivSubmit=function () {
		submitAddRecordDiv();
	};
	var submitAddRecordDiv=function () {
		if(confirm("您确定要添加该记录吗？")){;
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
			//测试输入的是否为数字形式
			if(testNumber(data.price_today_begin) && testNumber(data.price_yesterday) && testNumber(data.price_right_now) && testNumber(data.price_high) && testNumber(data.price_low)){

			}else {
				alert("输入的数据不和规范");
				return;
			}
			$.post(url,data,function(json){
				if(json.result_code==0){
					alert("已经完成设备添加。");
					window.location.reload();
				}
			});
		}
	};

	//在修改界面确认修改后进行的事件
	var onModifyDivSubmit=function () {
		submitModifyRecordDiv();
	};
	var submitModifyRecordDiv=function () {
		if(confirm("您确定要修改该记录吗？")){;
			var url="../../"+module+"_"+sub+"_servlet_action";
			var data={};
			data.action="modify_futures_record";
			//获取填写在该页面的数据准备传向后端
			data.futures_id=$("#futures_modify_div #futures_id").val();
			if(data.futures_id==""){
				alert("代号不能为空");
				return;
			}
			data.id=$("#futures_modify_div #id").val();
			data.futures_name=$("#futures_modify_div #futures_name").val();
			data.price_today_begin=$("#futures_modify_div #price_today_begin").val();
			data.price_yesterday=$("#futures_modify_div #price_yesterday").val();
			data.price_right_now=$("#futures_modify_div #price_right_now").val();
			data.price_high=$("#futures_modify_div #price_high").val();
			data.price_low=$("#futures_modify_div #price_low").val();
			//测试输入的是否为数字形式
			if(testNumber(data.price_today_begin) && testNumber(data.price_yesterday) && testNumber(data.price_right_now) && testNumber(data.price_high) && testNumber(data.price_low)){

			}else {
				alert("输入的数据不和规范");
				return;
			}
			$.post(url,data,function(json){
				if(json.result_code==0){
					alert("已经完成设备修改。");
					window.location.reload();
				}
			});
		}
	};

	//测试字符串是不是数字形式(不进行输入的话也是可以通过测试的)
	var testNumber=function (num) {
		var numberFormat =/^[+-]?\d*(\.\d*)?(e[+-]?\d+)?$/;
		if(numberFormat.test(num)){
			return true;
		}else{
			return false;
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
