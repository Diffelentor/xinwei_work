var module="user";
var sub="center";
/*================================================================================*/
jQuery(document).ready(function() {
	// initiate layout and plugins
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
		if($("#page_id").val()=="user_list_print"){
			initUserListPrint();
		}
		else if($("#page_id").val()=="user_statistic"){
			initUserStatistic();
		}
		else{
			initUserList();
		}

	};
	/*----------------------------------------入口函数  结束----------------------------------------*/
	var columnsData=undefined;
	var recordResult=undefined;
	var chartData=[];
	/*----------------------------------------业务函数  开始----------------------------------------*/
	/*------------------------------针对各个页面的入口  开始------------------------------*/
	var initUserList=function(){
		initUserListControlEvent();
		initUserRecordList();
	};
	var initUserStatistic=function () {
		initUserStatisticControlEvent();
		$.ajaxSettings.async = false;	//禁止异步方式，否则第一个函数还没执行完就会执行第二个了
		initUserStatisticRecord();
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
	var initUserListControlEvent=function(){
		$("#help_button").click(function() {help();});
		$('#add_button').click(function() {onAddRecord();});
		$('#record_modify_div #submit_button').click(function() {onModifyDivSubmit();});
		$('#record_add_div #submit_button').click(function() {onAddDivSubmit();});
		$('#query_button').click(function() {onQueryRecord();});
		$('#export_button').click(function() {onExportRecord();});
		$('#remake_button').click(function() {onRemake();});
		$('#refresh_button').click(function() {onRemake();});	//另一个刷新按钮
		$('#table_print_button').click(function() {onTablePrint();});
		$('#statistic_button').click(function() {onStatisticRecord();});
	};
	var initUserStatisticControlEvent=function () {
		$('#return_button').click(function() {returnBack();});
	}

	var onRemake=function () {
		window.location.reload();
	};

	var returnBack=function () {
		history.go(-1);
	};

	var onAddRecord=function(){
		$('#record_add_div').modal("show");
		//window.location.href="user_add.jsp";
	};

	var initUserRecordList=function(){
		getUserRecordDatatable();
	};
	var initUserMobileRecord=function(){
		getUserMobileRecord();
	};
	var onDeleteRecord = function(id){
		if(confirm("您确定要删除这条记录吗？")){
			if(id>-1){
				var url="../../"+module+"_"+sub+"_servlet_action";
				var data={};
				data.action="delete_user_record";
				data.id=id;
				$.post(url,data,function(json){
					if(json.result_code==0){
						window.location.reload();
					}
				})
			}
		}
	};
	var onModifyRecord=function(id){
		var url="../../"+module+"_"+sub+"_servlet_action";
		var data={};
		data.action="get_user_record";
		data.id=id;
		$.post(url,data,function(json){
			console.log(JSON.stringify(json));
			if(json.result_code==0) {
				var record = json.aaData;
				record=record[0];
				$("#record_modify_div #id").val(record.id);
				$("#record_modify_div #username").val(record.username);
				$("#record_modify_div #password").val(record.password);
				$("#record_modify_div #email").val(record.email);
				$("#record_modify_div #identity").val(record.identity);
				$("#record_modify_div #balance").val(record.balance);
				$("#record_modify_div").modal("show");
			}
		})
	};
	var getUserRecordDatatable=function(){
		var data={};
		data.username=$("#record_query_setup #username").val();
		data.identity=$("#record_query_setup #identity").val();
		data.email=$("#record_query_setup #email").val();
		$('.datatable').dataTable( {
			"destroy":true,
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
			"aoColumns": [{"mRender": function(data, type, full) {
					sReturn = '<input type="checkbox" class="checkboxes" value="'+full.id+'"/>';
					return sReturn;
				},"orderable": false},{"mRender": function(data, type, full) {
					sReturn = '<div> '+full.username+'</div>';
					return sReturn;
				},"orderable": false},{"mRender": function(data, type, full) {
					sReturn = '<div> '+full.password+'</div>';
					return sReturn;
				},"orderable": false},{"mRender": function(data, type, full) {
					sReturn = '<div> '+full.email+'</div>';
					return sReturn;
				},"orderable": false},{"mRender": function(data, type, full) {
					sReturn = '<div> '+full.identity+'</div>';
					return sReturn;
				},"orderable": false},{"mRender": function(data, type, full) {
					sReturn = '<div> '+full.balance+'</div>';
					return sReturn;
				},"orderable": false},{"mRender": function(data, type, full) {
					sReturn = '<div><a href=\"javascript:Page.onModifyRecord('+full.id+')\"><i class="fa fa-edit"></i>修改</a>&nbsp&nbsp&nbsp<a href=\"javascript:Page.onDeleteRecord('+full.id+')\"><i class="fa fa-times"></i>删除</a>&nbsp&nbsp&nbsp<a href=\"javascript:Page.onViewRecord('+full.id+')\"><i class="fa fa-user"></i>个人信息</a></div>';
					return sReturn;
				},"orderable": false}],
			"aLengthMenu": [[5,10,15,20,25,40,50,-1],[5,10,15,20,25,40,50,"所有记录"]],
			"fnDrawCallback": function(){$(".checkboxes").uniform();$(".group-checkable").uniform();},
			//"sAjaxSource": "get_record.jsp"
			"sAjaxSource": "../../"+module+"_"+sub+"_servlet_action?action=get_user_record&username="+data.username+"&identity="+data.identity+"&email="+data.email
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


	var onModifyDivSubmit=function(){
		$("#record_modify_div").modal("hide");
		submitModifyRecordDiv();
	};

	var onAddDivSubmit=function(){
		$("#record_add_div").modal("hide");
		submitAddRecordDiv();
	};


	var submitModifyRecordDiv=function(){
		if(confirm("您确定要修改该记录吗？")){
			var url="../../"+module+"_"+sub+"_servlet_action";
			var data={};
			data.action="modify_user_record";
			data.id=$("#record_modify_div #id").val();
			data.username=$("#record_modify_div #username").val();
			data.password=$("#record_modify_div #password").val();
			data.email=$("#record_modify_div #email").val();
			data.identity=$("#record_modify_div #identity").val();
			data.balance=$("#record_modify_div #balance").val();
			$.post(url,data,function(json){
				if(json.result_code==0){
					alert("已经完成设备修改。");
					window.location.reload();
				}
			});
		}
	};

	var submitAddRecordDiv=function(){
		if(confirm("您确定要添加该记录吗？")){
			var url="../../"+module+"_"+sub+"_servlet_action";
			var data={};
			data.action="add_user_record";
			data.username=$("#record_add_div #username").val();
			data.password=$("#record_add_div #password").val();
			data.email=$("#record_add_div #email").val();
			data.identity=$("#record_add_div #identity").val();
			$.post(url,data,function(json){
				if(json.result_code==0){
					alert("已经完成设备添加。");
					window.location.reload();
				}
			});
		}
	};

	var onViewRecord=function(id){
		window.location.href="user_profile.jsp?id="+id;
	};

	var returnback=function(){
		history.go(-1);
	};

	var onQueryRecord=function () {
		initUserRecordList();
	};

	var onExportRecord=function () {
		var url="../../"+module+"_"+sub+"_servlet_action";
		var data={"action":"export_user_record"};
		$.post(url,data,function(json){
			if(json.result_code==0){
				console.log(JSON.stringify(json));
				$('#record_download_div #download_url').attr("href","javascript:window.open('"+json.download_url+"')");
				$('#record_download_div').modal("show");
			}else{
				alert("[onExportRecord]与后端加护错误！"+json.result_msg);
			}
		});
	};
	var onTablePrint=function(){
		window.location.href="user_list_print.jsp";
	}
	var initUserListPrint=function(){
		$(".page-container").attr("style","margin-top:0px");
		$.post("../../"+module+"_"+sub+"_servlet_action?action=get_user_record",function(json){
			console.log(JSON.stringify(json));
			if(json.result_code==0){
				var list=json.aaData;
				var html="";
				if(list!=undefined && list.length>0){
					for(var i=0;i<list.length;i++){
						var record=list[i];

						html=html+"                          	 		<tr>";
						html=html+"                                        <td>";
						html=html+"                                            "+record.username;
						html=html+"                                        </td>";
						html=html+"                                        <td>";
						html=html+"                                            "+record.password;
						html=html+"                                        </td>";
						html=html+"                                        <td>";
						html=html+"                                            "+record.email;
						html=html+"                                        </td>";
						html=html+"                                        <td>";
						html=html+"                                            "+record.identity;
						html=html+"                                        </td>";
						html=html+"                                        <td>";
						html=html+"                                            "+record.balance;
						html=html+"                                        </td>";
						html=html+"                                    </tr>";
					}
				}
				$("#print_table_content_div").html(html);
				window.print();		//因为这个JQ封装的的这个post是以异步的方式进行执行，所以要在这里调用这个接口，不然打印的是html没有修改后的东西。
			}
		})
	};
	var onStatisticRecord=function () {
		window.location.href="user_statistic.jsp";
	};

	var initUserStatisticRecord=function () {
		var url = "../../"+module+"_"+sub+"_servlet_action";
		var data={"action":"get_user_count_by_identity"};
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
	var changeResultDataToChartData=function (list,chartData) {
		for(var i = 0; i < list.length; i++){
			//year是横坐标，incom是横条的纵坐标，expenses是折线的纵坐标
			var json = {"category":list[i].identity,"column-1":list[i].count};
			chartData.push(json);
		}
	};
	var initBarChart=function () {
		var chart = AmCharts.makeChart("chart_1",{
			"type"    : "pie",
			"theme": "light",
			"pathToImages": Metronic.getGlobalPluginsPath() + "amcharts/amcharts/images/",
			"titleField"  : "category",
			"valueField"  : "column-1",
			"dataProvider"  : chartData,
		});
		$('#chart_1').closest('.portlet').find('.fullscreen').click(function() {
			chart.invalidateSize();
		});
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
		},
		onViewRecord:function(id){
			onViewRecord(id);
		}
	};
}();//Page
/*================================================================================*/
