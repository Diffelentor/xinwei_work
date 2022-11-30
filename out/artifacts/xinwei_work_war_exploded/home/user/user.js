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
		pageId=$("#page_id").val();
		if(pageId=="user_list"){
			initUserList();
		}
		if(pageId=="user_add"){
			initUserAdd();
		}
		if(pageId=="user_modify"){
			initUserModify();
		}
		if(pageId=="user_view"){
			initUserView();
		}
	};
	/*----------------------------------------入口函数  结束----------------------------------------*/
	var columnsData=undefined;
	var recordResult=undefined;
	/*----------------------------------------业务函数  开始----------------------------------------*/
	/*------------------------------针对各个页面的入口  开始------------------------------*/
	var initUserList=function(){
		initUserListControlEvent();
		initUserRecordList();
	};
	var initUserAdd=function(){
		initUserAddControlEvent();
	};
	var initUserModify=function(){
		initUserModifyControlEvent();
		initUserRecordView();
	};
	var initUserView=function(){
		initUserViewControlEvent();
		initUserRecordView();
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
		$("#datatable_button").click(function() {onDataTableTab();});
		$('#table_button').click(function() {onTableTab();});
		$('#bar_button').click(function() {onBarTab();});
		$('#record_modify_div #submit_button').click(function() {onModifyDivSubmit();});
		$('#record_add_div #submit_button').click(function() {onAddDivSubmit();});
		$('#query_button').click(function() {onQueryRecord();});
		$('#export_button').click(function() {onExportRecord();});
	};
	var initUserAddControlEvent=function(){
		$("#help_button").click(function() {help();});
		$('#add_button').click(function() {submitAddRecord();});
	};
	var initUserModifyControlEvent=function(){
		$("#help_button").click(function() {help();});
		$('#modify_button').click(function() {submitModifyRecord();});
	};

	var initUserViewControlEvent=function(){
		$("#help_button").click(function() {help();});
		$('#return_button').click(function() {returnback();});
	};

	var initUserRecordView=function(){
		var username=getUrlParam("username");
		var data={};
		data.action="get_user_record";
		data.username=username;
		$.post("../../"+module+"_"+sub+"_servlet_action",data,function(json){
			console.log(JSON.stringify(json));
			if(json.result_code==0){
				var list=json.aaData;
				if(list!=undefined && list.length>0){
					for(var i=0;i<list.length;i++){
						var record=list[i];
						$("#user_id").val(record.user_id);
						$("#user_name").val(record.user_name);
					}
				}
			}
		})
	};
	var onAddRecord=function(){
		$('#record_add_div').modal("show");
		//window.location.href="user_add.jsp";
	};
	var submitAddRecord=function(){
		var url="user_file_servlet_action";
		var data={};
		data.action="add_user_record";
		data.user_id=$("#user_id").val();
		data.user_name=$("#user_name").val();
		$.post(url,data,function(json){
			if(json.result_code==0){
				alert("已经完成设备添加。");
				window.location.href="user_list.jsp";
			}
		});
	};
	var submitModifyRecord=function(){
		if(confirm("您确定要修改该记录吗？")){
			var id=getUrlParam("id");
			var url="user_file_servlet_action";
			var data={};
			data.action="modify_user_record";
			data.id=id;
			data.user_id=$("#user_id").val();
			data.user_name=$("#user_name").val();
			$.post(url,data,function(json){
				if(json.result_code==0){
					alert("已经完成设备修改。");
					window.location.href="user_list.jsp";
				}
			});
		}
	};

	
	var initUserRecordList=function(){
		getUserRecordList();
		getUserRecordDatatable();
		getUserBar();
	};
	var initUserMobileRecord=function(){
		getUserMobileRecord();
	};
	var getUserRecordList=function(){
		var data={}
		data.username=$('#record_query_setup #username').val();
		data.password=$('#record_query_setup #password').val();
		data.email=$('#record_query_setup #email').val();
        data.is_manager=$('#record_query_setup #is_manager').val();
		resultlist=[];
		$.post("../../"+module+"_"+sub+"_servlet_action?action=get_user_record",data,function(json){
			console.log(JSON.stringify(json));
			if(json.result_code==0){
				var list=json.aaData;
				var html="";
				if(list!=undefined && list.length>0){
					for(var i=0;i<list.length;i++){
						var record=list[i];
						html=html+"		                                <tr class=\"active\">";
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
                        html=html+"                                            "+record.is_manager;
                        html=html+"                                        </td>";
						html=html+"                                        <td>";
						resultlist.push(record);
						html=html+"                                            <a href=\"javascript:Page.onModifyRecord("+record.name+")\">【修改记录】</a><a href=\"javascript:Page.onDeleteRecord("+record.name+")\">【删除记录】</a>";
						html=html+"                                        </td>";
						html=html+"                                    </tr>";

					}
				}
				$("#record_table_content_div").html(html);
			}
		})
	};
	var onDeleteRecord = function(id){
		if(confirm("您确定要删除这条记录吗？")){
			if(id>-1){
				var url="../../user_file_servlet_action";
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
		for(var i=0;i<resultlist.length;i++){
			if(id==resultlist[i].id) {
				$('#record_modify_div #id').val(resultlist[i].id);
				$('#record_modify_div #user_id').val(resultlist[i].user_id);
				$('#record_modify_div #user_name').val(resultlist[i].user_name);
				$('#record_modify_div').modal("show");
			}
		}
	};
	var resultlist=[];
	var getUserRecordDatatable=function(){
		resultlist=[];
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
			"aoColumns": [{"mRender": function(data, type, full) {
					sReturn = '<input type="checkbox" class="checkboxes" value="'+full.id+'"/>';
					return sReturn;
				},"orderable": false
			},{"mRender": function(data, type, full) {
					sReturn = '<div> '+full.user_id+'</div>';
					return sReturn;
				},"orderable": false},{"mRender": function(data, type, full) {
					sReturn = '<div> '+full.user_name+'</div>';
					return sReturn;
				},"orderable": false},{"mRender": function(data, type, full) {
					sReturn = '<div> '+full.creator+'</font></div>';
					return sReturn;
				},"orderable": false},{"mRender": function(data, type, full) {
					sReturn = '<div> '+full.create_time+'</font></div>';
					return sReturn;
				},"orderable": false},{"mRender": function(data, type, full) {
					resultlist.push(full);
					sReturn = '<div><a href=\"javascript:Page.onModifyRecord('+full.id+')\">【修改记录】</a><a href=\"javascript:Page.onDeleteRecord('+full.id+')\">【删除记录】</a><a href=\"javascript:Page.onViewRecord('+full.id+')\">【查看记录】</a></div>';
					return sReturn;
				},"orderable": false}],
			"aLengthMenu": [[5,10,15,20,25,40,50,-1],[5,10,15,20,25,40,50,"所有记录"]],
			"fnDrawCallback": function(){$(".checkboxes").uniform();$(".group-checkable").uniform();},
			//"sAjaxSource": "get_record.jsp"
			"sAjaxSource": "../../"+module+"_"+sub+"_servlet_action?action=get_user_record"
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

	var onDataTableTab=function() {

		$("#datatable_tab").show();
		$("#table_tab").hide();
		$("#bar_tab").hide();
		console.log("onDataTableTab");
	};

	var onTableTab=function(){

		$("#datatable_tab").hide();
		$("#table_tab").show();
		$("#bar_tab").hide();
		console.log("onTableTab");
	};

	var onBarTab=function(){

		$("#datatable_tab").hide();
		$("#table_tab").hide();
		$("#bar_tab").show();
		console.log("onBarTab");
	};

	var getUserBar=function(){
		var data={}
		data.id=$('#record_query_setup #id').val();
		data.user_id=$('#record_query_setup #user_id').val();
		data.user_name=$('#record_query_setup #user_name').val();
		$.post("../../"+module+"_"+sub+"_servlet_action?action=get_user_record",data,function(json){
			console.log(JSON.stringify(json));
			if(json.result_code==0){
				var list=json.aaData;
				var html="";
				if(list!=undefined && list.length>0){
					for(var i=0;i<list.length;i++){
						var record=list[i];
						html=html+"                    <div class=\"media\">";
						html=html+"                        <a href=\"javascript:;\" class=\"pull-left\">";
						html=html+"                            <img alt=\"\" src=\"../../assets/admin/pages/media/blog/7.jpg\" class=\"media-object\" style=\"width:50px;height:50px;border-radius: 50% !important;\">";
						html=html+"                        </a>";
						html=html+"                        <div class=\"media-body\">";
						html=html+"                            <h4 class=\"media-heading\">"+record.user_id+" <span>";
						html=html+"											"+record.create_time+ " / <a href=\"javascript:;\">";
						html=html+"											Reply </a>";
						html=html+"											</span>";
						html=html+"                            </h4>";
						html=html+"                            <p>";
						html=html+"                                 设备名称: "+record.user_name;
						html=html+"                            </p>";
						html=html+"                        </div>";
						html=html+"                    </div>";
						html=html+"                    <hr>";

					}
				}
				$("#record_bar_div").html(html);
			}
		})
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
			var url="../../user_file_servlet_action";
			var data={};
			data.action="modify_user_record";
			data.id=$("#record_modify_div #id").val();;
			data.user_id=$("#record_modify_div #user_id").val();
			data.user_name=$("#record_modify_div #user_name").val();
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
			var url="../../user_file_servlet_action";
			var data={};
			data.action="add_user_record";
			data.id=$("#record_add_div #id").val();;
			data.user_id=$("#record_add_div #user_id").val();
			data.user_name=$("#record_add_div #user_name").val();
			$.post(url,data,function(json){
				if(json.result_code==0){
					alert("已经完成设备添加。");
					window.location.reload();
				}
			});
		}
	};

	var onViewRecord=function(id){
		window.location.href="user_view.jsp?id="+id;
	};

	var returnback=function(){
		history.go(-1);
	};

	var onQueryRecord=function () {
		initUserRecordList();
	};

	var onExportRecord=function () {
		var url="../../user_file_servlet_action";
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
