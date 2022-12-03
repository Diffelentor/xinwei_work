package futures.file;
/*
 * 待完成：用MVC模式分开DB和Action操作
 * 增删改查看导印统功能的实现
 */

import futures.dao.Data;
import futures.dao.FuturesDao;
import org.json.JSONException;
import org.json.JSONObject;

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
    String module="futures";
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
        //showDebug("[processAction]收到的action是："+action);
        if (action == null){
            resultMsg="传递过来的action是NULL";
        }else{
            if (action.equals("get_futures_record")) {
                actionOk=true;
                try {
                    getFuturesRecord(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("export_futures_record")) {
                actionOk=true;
                try {
                    exportFuturesRecord(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("add_futures_record")) {
                actionOk=true;
                try {
                    addFuturesRecord(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("delete_futures_record")) {
                actionOk=true;
                try {
                    deleteFuturesRecord(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("modify_futures_record")) {
                actionOk=true;
                try {
                    modifyFuturesRecord(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("get_amplitude_by_futuresId")) {
                actionOk=true;
                try {
                    getAmplitudeByFuturesId(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("get_kline")) {
                actionOk=true;
                try {
                    getFuturesKline(request, response, json);
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
    private Data getPageParameters(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException {
        Data data=new Data();
        HttpSession session = request.getSession();
        /*----------------------------------------获取所有表单信息 开始----------------------------------------*/
        //showDebug("[getPageParameters]----------------------------------------获取所有表单信息 开始----------------------------------------");
        JSONObject param=data.getParam();
        Enumeration requestNames=request.getParameterNames();
        for(Enumeration e=requestNames;e.hasMoreElements();){
            String thisName=e.nextElement().toString();
            String thisValue=request.getParameter(thisName);
            //showDebug("[getPageParameters]"+thisName+"="+thisValue);
            param.put(thisName, thisValue);
        }
        //showDebug("[getPageParameters]data的Param="+data.getParam().toString());
        //showDebug("[getPageParameters]----------------------------------------获取所有表单信息 完毕----------------------------------------");
        /*----------------------------------------获取所有表单信息 完毕----------------------------------------*/
        return data;
    }
    private void responseBack(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException {
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
    private void getFuturesRecord(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        FuturesDao dao=new FuturesDao();
        Data data=getPageParameters(request,response,json);
        dao.getFuturesRecord(data,json);
    }
    private void addFuturesRecord(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        FuturesDao dao=new FuturesDao();
        Data data=getPageParameters(request,response,json);
        dao.addFuturesRecord(data,json);
    }
    private void deleteFuturesRecord(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        FuturesDao dao=new FuturesDao();
        Data data=getPageParameters(request,response,json);
        dao.deleteFuturesRecord(data,json);
    }
    private void modifyFuturesRecord(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        FuturesDao dao=new FuturesDao();
        Data data=getPageParameters(request,response,json);
        dao.modifyFuturesRecord(data,json);
    }
    private void getAmplitudeByFuturesId(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        FuturesDao dao=new FuturesDao();
        Data data=getPageParameters(request,response,json);
        dao.getAmplitudeByFuturesId(data,json);
    }
    private void getFuturesKline(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        FuturesDao dao=new FuturesDao();
        Data data=getPageParameters(request,response,json);
        dao.getFutureskline(data,json);
    }

    private void exportFuturesRecord(HttpServletRequest request, HttpServletResponse response,JSONObject json) throws JSONException, SQLException, IOException {
        FuturesDao dao=new FuturesDao();
        Data data=getPageParameters(request,response,json);
        dao.getFuturesRecord(data,json);
        getExportFuturesRecordToFile(json, data);
        getExportFuturesRecordToExcel(json, data);
    }

    private void getExportFuturesRecordToFile(JSONObject json, Data data) throws JSONException {
        String download_url = "/output/futures/export_futures.rar";
        String file_path = "C:\\Tools\\output\\futures\\export_futures.rar";

        String jsonStr=json.toString();
        File jsonFile = new File(file_path);		//是txt的时候浏览器会自动的显示出来，不会执行下载功能
        json.put("download_rar_url",download_url);
        //showDebug("准备下载");
        try{
            if(!jsonFile.exists()){
                jsonFile.createNewFile();
            }
            FileWriter fileWriter=new FileWriter(jsonFile.getAbsoluteFile());
            BufferedWriter bw=new BufferedWriter(fileWriter);
            bw.write(jsonStr);
            bw.close();
            //showDebug("完成下载");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    //需要四个jar包的引入
    private void getExportFuturesRecordToExcel(JSONObject json, Data data) throws JSONException, IOException {
        String download_url = "/output/futures/export_futures.xls";
        String file_path = "C:\\Tools\\output\\futures\\export_futures.xls";

        MyExcel me=new MyExcel(file_path);
        json.put("download_xls_url",download_url);
        json.put("file_path",file_path);
        me.exportData(data,json);
    }
}
