package complain.center;

import complain.dao.ComplainDao;
import complain.dao.Data;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
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

@WebServlet(name = "ServletAction")
public class ServletAction extends HttpServlet {
    String module="complain";
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
            if (action.equals("get_complain_record")) {
                actionOk=true;
                try {
                    getComplainRecord(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("add_complain_record")) {
                actionOk=true;
                try {
                    addComplainRecord(request, response, json);
                } catch (JSONException e) {
                    e.printStackTrace();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("modify_complain_record")) {
                actionOk=true;
                try {
                    modifyComplainRecord(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("update_reply_record")) {
                actionOk=true;
                try {
                    updateReplyRecord(request, response, json);
                } catch (JSONException e) {
                    e.printStackTrace();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("delete_complain_record")) {
                actionOk=true;
                try {
                    deleteComplainRecord(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("get_count_isreplied")) {
                actionOk=true;
                try {
                    getcountisreplied(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

            if (action.equals("export_complain_record")) {
                actionOk=true;
                try {
                    exportComplainRecord(request, response, json);
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
    private Data getPageParameters(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException{
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
    private void getComplainRecord(HttpServletRequest request, HttpServletResponse response,JSONObject json) throws JSONException, SQLException {
        ComplainDao dao=new ComplainDao();
        Data data=getPageParameters(request,response,json);
        dao.getComplainRecord(data,json);
    }
    private void modifyComplainRecord(HttpServletRequest request, HttpServletResponse response,JSONObject json) throws JSONException, SQLException {
        ComplainDao dao=new ComplainDao();
        Data data=getPageParameters(request,response,json);
        dao.modifyComplainRecord(data,json);
    }
    private void deleteComplainRecord(HttpServletRequest request, HttpServletResponse response,JSONObject json) throws JSONException, SQLException {
        ComplainDao dao=new ComplainDao();
        Data data=getPageParameters(request,response,json);
        dao.deleteComplainRecord(data,json);
    }
    private void addComplainRecord(HttpServletRequest request, HttpServletResponse response,JSONObject json) throws JSONException, SQLException {
        ComplainDao dao=new ComplainDao();
        Data data=getPageParameters(request,response,json);
        dao.addComplainRecord(data,json);
    }

    private void updateReplyRecord(HttpServletRequest request, HttpServletResponse response,JSONObject json) throws JSONException, SQLException {
        ComplainDao dao=new ComplainDao();
        Data data=getPageParameters(request,response,json);
        dao.updateReplyRecord(data,json);
    }


    private void getcountisreplied(HttpServletRequest request, HttpServletResponse response,JSONObject json) throws JSONException, SQLException {
        ComplainDao dao=new ComplainDao();
        Data data=getPageParameters(request,response,json);
        dao.getcountisreplied(data,json);
    }

    /*========================================CRUD业务函数 结束========================================*/
    private void exportComplainRecord(HttpServletRequest request, HttpServletResponse response,JSONObject json) throws JSONException, SQLException, IOException {
        ComplainDao dao=new ComplainDao();
        Data data=getPageParameters(request,response,json);
        dao.getComplainRecord(data,json);
        System.out.println(json);
//		getExportComplainRecordToFile(json, data);
//		getExportComplainRecordToTxt(json, data);
        getExportComplainRecordToExcel(json, data);
//		getExportComplainRecordToPdf(json, data);
    }
    private void getExportComplainRecordToPdf(JSONObject json, Data data) {

    }

    private void getExportComplainRecordToTxt(JSONObject json, Data data) {

    }

    private void getExportComplainRecordToFile(JSONObject json, Data data) throws JSONException {
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
    private void getExportComplainRecordToExcel(JSONObject json, Data data) throws JSONException, IOException {
        MyExcel me=new MyExcel("D:\\upload\\teach\\yjykfsj2022\\XM06\\complain_list.xls");
        json.put("download_url","/2022/XM06/upload/complain_list.xls");
        json.put("file_path","D:\\upload\\teach\\yjykfsj2022\\XM06\\complain_list.xls");
        me.exportData(data,json);
    }
}
