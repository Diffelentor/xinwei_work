package user.center;
/*
 * 待完成：用MVC模式分开DB和Action操作
 * 增删改查看导印统功能的实现
 */

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import user.dao.UserDao;
import user.dao.Data;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;

public class ServletAction extends HttpServlet {
	String module="user";
	String sub="file";
	public void showDebug(String msg){
		System.out.println("["+(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date())+"]["+module+"/"+sub+"/ServletAction]"+msg);
	}
	/*
	 * 处理顺序：先是service，后根据情况doGet或者doPost
	 */
	public void service(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		processAction(request,response);
	}
	/*========================================函数分流 开始========================================*/
	public void processAction(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		HttpSession session = request.getSession();
		request.setCharacterEncoding("UTF-8");
		String action = request.getParameter("action");
		boolean actionOk = false;
		int resultCode=0;
		String resultMsg="ok";
		JSONObject json=new JSONObject();
		showDebug("[processAction]收到的action是："+action);
		if (action == null){
			resultMsg="传递过来的action是NULL";
		}else{
			//这几个常规增删改查功能
            if (action.equals("get_session")) {
                actionOk=true;
                try {
                    getsession(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
			if (action.equals("get_user_record")) {
				actionOk=true;
				try {
					getUserRecord(request, response, json);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			if (action.equals("add_user_record")) {
				actionOk=true;
				try {
					addUserRecord(request, response, json);
				} catch (JSONException e) {
					e.printStackTrace();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			if (action.equals("modify_user_record")) {
				actionOk=true;
				try {
					modifyUserRecord(request, response, json);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			if (action.equals("delete_user_record")) {
				actionOk=true;
				try {
					deleteUserRecord(request, response, json);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			if (action.equals("login")) {
				actionOk=true;
				try {
					login(request, response, json);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			if (action.equals("register")) {
				actionOk=true;
				try {
					register(request, response, json);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			if (action.equals("export_user_record")) {
				actionOk=true;
				try {
					exportUserRecord(request, response, json);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			try {
				responseBack(request,response,json);
			} catch (JSONException e) {
				e.printStackTrace();
			}
		}
	}
	/*========================================函数分流 结束========================================*/
	/*========================================公共函数 开始========================================*/
	private Data getPageParameters(HttpServletRequest request,HttpServletResponse response,JSONObject json) throws JSONException{
		Data data=new Data();
		HttpSession session = request.getSession();
		showDebug("这里是user/center/servlet");
		/*----------------------------------------获取所有表单信息 开始----------------------------------------*/
		showDebug("[getPageParameters]----------------------------------------获取所有表单信息 开始----------------------------------------");
		JSONObject param=data.getParam();
		Enumeration requestNames=request.getParameterNames();
		for(Enumeration e=requestNames;e.hasMoreElements();){
			String thisName=e.nextElement().toString();
			String thisValue=request.getParameter(thisName);
			showDebug("[getPageParameters]"+thisName+"="+thisValue);
			param.put(thisName, thisValue);
		}
		showDebug("[getPageParameters]data的Param="+data.getParam().toString());
		showDebug("[getPageParameters]----------------------------------------获取所有表单信息 完毕----------------------------------------");
		/*----------------------------------------获取所有表单信息 完毕----------------------------------------*/
		return data;
	}
	private void responseBack(HttpServletRequest request,HttpServletResponse response,JSONObject json) throws JSONException {
		boolean isAjax=true;if (request.getHeader("x-requested-with") == null || request.getHeader("x-requested-with").equals("com.tencent.mm")){isAjax=false;}	//判断是异步请求还是同步请求，腾讯的特殊
		if(isAjax){
			response.setContentType("application/json; charset=UTF-8");
			try {
				response.getWriter().print(json);
				response.getWriter().flush();
				response.getWriter().close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}else{
			String action=json.getString("action");
			String errorNo="0";
			String errorMsg="ok";
			String url = module+"/"+sub+"/result.jsp?action="+action+"&result_code="+errorNo+ "&result_msg=" + errorMsg;
			if(json.has("redirect_url")) url=json.getString("redirect_url");
			try {
				response.sendRedirect(url);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	/*========================================公共函数 结束========================================*/
	/*========================================CRUD业务函数 开始========================================*/
	private void getUserRecord(HttpServletRequest request, HttpServletResponse response,JSONObject json) throws JSONException, SQLException {
		UserDao dao=new UserDao();
		Data data=getPageParameters(request,response,json);
		dao.getUserRecord(data,json);
	}
	private void modifyUserRecord(HttpServletRequest request, HttpServletResponse response,JSONObject json) throws JSONException, SQLException {
		UserDao dao=new UserDao();
		Data data=getPageParameters(request,response,json);
		dao.modifyUserRecord(data,json);
	}
	private void deleteUserRecord(HttpServletRequest request, HttpServletResponse response,JSONObject json) throws JSONException, SQLException {
		UserDao dao=new UserDao();
		Data data=getPageParameters(request,response,json);
		dao.deleteUserRecord(data,json);
	}
	private void addUserRecord(HttpServletRequest request, HttpServletResponse response,JSONObject json) throws JSONException, SQLException {
		UserDao dao=new UserDao();
		Data data=getPageParameters(request,response,json);
		dao.addUserRecord(data,json);
	}
    private void getsession(HttpServletRequest request, HttpServletResponse response,JSONObject json) throws JSONException, SQLException {
        HttpSession session = request.getSession();
        if(session.getAttribute("id")!=null) {
			String id = (String) session.getAttribute("id");

			UserDao dao = new UserDao();
			Data data = getPageParameters(request, response, json);
			data.setParam(new JSONObject("{\"id\":"+id+"})"));
			dao.getUserRecord(data,json);

			String strJson = json.toString();
			JSONObject aa = new JSONObject(strJson);
			JSONArray aaData = aa.getJSONArray("aaData");
			JSONObject aData = aaData.getJSONObject(0);
			String username = aData.getString("username");
			String identity = aData.getString("identity");
			String email = aData.getString("email");
			String password = aData.getString("password");
			String balance = aData.getString("balance");
			session.setAttribute("id", id);
			json.put("id", id);
			json.put("username", username);
			json.put("identity", identity);
			json.put("email", email);
			json.put("password", password);
			json.put("balance", balance);
			json.put("result_code", 0);
		}
        else{
			json.put("result_code", 10);
		}
        showDebug(json.toString());
    }
	/*========================================CRUD业务函数 结束========================================*/
	private void login(HttpServletRequest request, HttpServletResponse response,JSONObject json) throws JSONException, SQLException, IOException {
		UserDao dao=new UserDao();
		Data data=getPageParameters(request,response,json);
		showDebug("收到了数据:"+data.getParam().getString("username"));
		showDebug("收到了数据:"+data.getParam().getString("password"));
		dao.login(data,json);
		if(json.getInt("result_code")==0){
			HttpSession session = request.getSession();
			String strJson=json.toString();
			JSONObject aa = new JSONObject(strJson);
			JSONArray aaData=aa.getJSONArray("aaData");
			JSONObject aData=aaData.getJSONObject(0);
			String id=aData.getString("id");
			session.setAttribute("id",id);
			showDebug("session.id="+session.getAttribute("id"));
			json.put("redirect_url","home/main/index.jsp");
		}else{
			json.put("redirect_url","home/main/login_error.jsp");
		}
	}
	private void register
			(HttpServletRequest request, HttpServletResponse response,JSONObject json) throws JSONException, SQLException, IOException {
		UserDao dao=new UserDao();
		Data data=getPageParameters(request,response,json);
		showDebug("收到了数据:"+data.getParam().getString("username"));
		showDebug("收到了数据:"+data.getParam().getString("email"));
		showDebug("收到了数据:"+data.getParam().getString("password"));
		dao.register(data,json);
		if(json.getInt("result_code")==0){
			json.put("redirect_url","home/main/index.jsp");
		}else{
			json.put("redirect_url","home/main/register_error.jsp");
		}
	}
	private void exportUserRecord(HttpServletRequest request, HttpServletResponse response,JSONObject json) throws JSONException, SQLException, IOException {
		UserDao dao=new UserDao();
		Data data=getPageParameters(request,response,json);
		dao.getUserRecord(data,json);
//		getExportUserRecordToFile(json, data);
//		getExportUserRecordToTxt(json, data);
		getExportUserRecordToExcel(json, data);
//		getExportUserRecordToPdf(json, data);
	}
	private void getExportUserRecordToPdf(JSONObject json, Data data) {

	}

	private void getExportUserRecordToTxt(JSONObject json, Data data) {

	}

	private void getExportUserRecordToFile(JSONObject json, Data data) throws JSONException {
		String jsonStr=json.toString();
		File jsonFile = new File("C:\\testUpload\\export_device.rar");		//是txt的时候浏览器会自动的显示出来，不会执行下载功能
		json.put("download_url","/upload/maintain/device/export_device.rar");
		showDebug("准备下载");
		try{
			if(!jsonFile.exists()){
				jsonFile.createNewFile();
			}
			FileWriter fileWriter=new FileWriter(jsonFile.getAbsoluteFile());
			BufferedWriter bw=new BufferedWriter(fileWriter);
			bw.write(jsonStr);
			bw.close();
			showDebug("完成下载");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	//需要四个jar包的引入
	private void getExportUserRecordToExcel(JSONObject json, Data data) throws JSONException, IOException {
		MyExcel me=new MyExcel("C:\\testUpload\\user_list.xls");
		json.put("download_url","/upload/home/user/user_list.xls");
		json.put("file_path","C:\\testUpload\\user_list.xls");
		me.exportData(data,json);
	}
}
