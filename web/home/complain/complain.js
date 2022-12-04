var module="complain";
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
		initComplainList();
	};
	/*----------------------------------------入口函数  结束----------------------------------------*/
	var columnsData=undefined;
	var recordResult=undefined;
	/*----------------------------------------业务函数  开始----------------------------------------*/
	/*------------------------------针对各个页面的入口  开始------------------------------*/
	var initComplainList=function(){
		initComplainListControlEvent();
		initComplainRecordList();
	};
	/*------------------------------针对各个页面的入口 结束------------------------------*/
	var getUrlParam=function(name){
		//获取url中的参数
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		if (r != null) return decodeURI(r[2]); return null; //返回参数值，如果是中文传递，就用decodeURI解决乱码，否则用unescape
	};
	var initComplainListControlEvent=function(){
		$("#help_button").click(function() {help();});
		$('#add_button').click(function() {onAddRecord();});
		$('#record_modify_div #submit_button').click(function() {onModifyDivSubmit();});
		$('#record_add_div #submit_button').click(function() {onAddDivSubmit();});
		$('#query_button').click(function() {onQueryRecord();});
		$('#export_button').click(function() {onExportRecord();});
		$('#remake_button').click(function() {onRemake();});
		$('#refresh_button').click(function() {onRemake();});	//另一个刷新按钮
	};

	var onRemake=function () {
		window.location.reload();
	};
	var onAddRecord=function(){
		$('#record_add_div').modal("show");
		console.log("开始添加");
		//window.location.href="complain_add.jsp";
	};

	var initComplainRecordList=function(){
		getComplainRecordtable();
	};
	var onDeleteRecord = function(id){
		if(confirm("您确定要删除这条记录吗？")){
			console.log(id);
			if(id>-1){
				var url="../../"+module+"_"+sub+"_servlet_action";
				var data={};
				data.action="delete_complain_record";
				data.complain_id=id;
				$.post(url,data,function(json){
					console.log(JSON.stringify(json));
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
		data.action="get_complain_record";
		data.complain_id=id;
		$.post(url,data,function(json){
			console.log(JSON.stringify(json));
			if(json.result_code==0) {
				var record = json.aaData;
				record=record[0];
				$("#record_modify_div #complain_id").val(record.complain_id);
				$("#record_modify_div #complain_input").val(record.question);
				$("#record_modify_div").modal("show");
			}
		})
	};
	var getComplainRecordtable=function(){
		var data={}
		data.username=$('#record_query_setup #username').val();
		data.keyword=$('#record_query_setup #keyword').val();
		$.post("../../"+module+"_"+sub+"_servlet_action?action=get_complain_record",data,function(json){
			console.log(JSON.stringify(json));
			var html="";
			if(json.result_code==0){
				var list=json.aaData;
				if(list!=undefined && list.length>0){
					for(var i=0;i<list.length;i++){
						var record=list[i];
						html+="<div class=\"col-md-6 col-md-offset-3\">";
						html+="                        <!-- BEGIN PORTLET-->";
						html+="                        <div class=\"portlet light bg-inverse\">";
						html+="                            <div class=\"portlet-title\">";
						html+="                                <div class=\"caption font-purple-plum\">";
						html+="                                    <i class=\"icon-speech font-purple-plum\"></i>";
						html+="                                    <span class=\"caption-subject bold uppercase\"> 投诉</span>";
						html+="                                    <span class=\"caption-helper\">我们将尽快回应</span>";
						html+="                                </div>";
						html+="                                <div class=\"actions\">";
						html+="                                    <div class=\"btn-group\">";
						html+="                                        <button class=\"btn btn-circle btn-default btn-sm\">";
						html+="                                            <i class=\"fa fa-user\"></i>"+record.username;
						html+="                                        </button>";
						html+="                                    </div>";
						html+="";
						html+="                                    <a href=\"javascript:Page.onModifyRecord("+record.complain_id+");\" class=\"btn btn-circle blue-madison btn-sm\">";
						html+="                                        <i class=\"fa fa-plus\"></i> Modify </a>";
						html+="                                    <a href=\"javascript:Page.onDeleteRecord("+record.complain_id+");\" class=\"btn btn-circle red-sunglo btn-sm\">";
						html+="                                        <i class=\"fa fa-plus\"></i> Delete </a>";
						html+="                                    </button>";
						html+="                                    <a class=\"btn btn-circle btn-icon-only btn-default fullscreen\" href=\"javascript:;\" data-original-title=\"\" title=\"\">";
						html+="                                    </a>";
						html+="                                </div>";
						html+="                            </div>";
						html+="                            <div class=\"portlet-body\">";
						html+="                                <div data-toggle=\"context\" class=\"note note-success\">";
						html+=                                     record.question;
						html+="                                </div>";
						html+="                                <div data-toggle=\"context\" class=\"note note-warning\">";
						html+=                                     record.answer;
						html+="                                </div>";
						html+="                            </div>";
						html+="                        </div>";
						html+="                        <!-- END PORTLET-->";
						html+="                    </div>";
					}
				}

			}
			$("#complain_bar").html(html);
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
			var url="../../"+module+"_"+sub+"_servlet_action";
			var data={};
			data.action="modify_complain_record";
			data.complain_id=$("#record_modify_div #complain_id").val();
			data.question=$("#record_modify_div #complain_input").val();
			$.post(url,data,function(json){
				if(json.result_code==0){
					alert("已经完成投诉修改。");
					window.location.reload();
				}
			});
		}
	};

	var submitAddRecordDiv=function(){
		if(confirm("您确定要添加该记录吗？")){
			var url="../../"+module+"_"+sub+"_servlet_action";
			var data={};
			data.action="add_complain_record";
			data.username=sessionStorage.getItem("username");
			data.question=$("#record_add_div #complain_input").val();
			console.log($("#record_add_div #complain_input").val());
			$.post(url,data,function(json){
				console.log(json.toString());
				if(json.result_code==0){
					alert("已提交投诉。");
					window.location.reload();
				}
			});
		}
	};

	var onViewRecord=function(id){
		window.location.href="complain_profile.jsp?id="+id;
	};

	var returnback=function(){
		history.go(-1);
	};

	var onQueryRecord=function () {
		initComplainRecordList();
	};

	var onExportRecord=function () {
		$('#record_download_div').modal("show");
		var url="../../"+module+"_"+sub+"_servlet_action";
		var data={"action":"export_complain_record"};
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
