package exchanges.file;

import exchanges.dao.Data;
import exchanges.dao.ExchangesDao;
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
    String module="exchanges";
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
            if (action.equals("get_exchanges_record")) {
                actionOk=true;
                try {
                    getExchangesRecord(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("get_exchanges_admin")) {
                actionOk=true;
                try {
                    getExchangesAdmin(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("add_exchanges_record")) {
                actionOk=true;
                try {
                    addExchangesRecord(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("export_exchanges_record")) {
                actionOk=true;
                try {
                    exportExchangesRecord(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("delete_exchanges_record")) {
                actionOk=true;
                try {
                    deleteExchangesRecord(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("modify_exchanges_record")) {
                actionOk=true;
                try {
                    modifyExchangesRecord(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }if (action.equals("get_amplitude_by_exchangesId")) {
                actionOk=true;
                try {
                    getAmplitudeByExchangesId(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("get_kline")) {
                actionOk=true;
                try {
                    getExchangesKline(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("get_history_data")) {
                actionOk=true;
                try {
                    getExchangesHistory(request, response, json);
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
        showDebug("[getPageParameters]----------------------------------------获取所有表单信息 开始----------------------------------------");
        JSONObject param=data.getParam();
        Enumeration requestNames=request.getParameterNames();
        for(Enumeration e=requestNames;e.hasMoreElements();){
            String thisName=e.nextElement().toString();
            String thisValue=request.getParameter(thisName);
            showDebug("[getPageParameters]"+thisName+"="+thisValue);
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
    private void getExchangesRecord(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        ExchangesDao dao=new ExchangesDao();
        Data data=getPageParameters(request,response,json);
        dao.getExchangesRecord(data,json);
    }
    private void getExchangesAdmin(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        ExchangesDao dao=new ExchangesDao();
        Data data=getPageParameters(request,response,json);
        dao.getExchangesAdmin(data,json);
    }
    private void getExchangesHistory(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        ExchangesDao dao=new ExchangesDao();
        Data data=getPageParameters(request,response,json);
        dao.getExchangesHistory(data,json);
    }
    private void addExchangesRecord(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        ExchangesDao dao=new ExchangesDao();
        Data data=getPageParameters(request,response,json);
        dao.addExchangesRecord(data,json);
    }
    private void deleteExchangesRecord(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        ExchangesDao dao=new ExchangesDao();
        Data data=getPageParameters(request,response,json);
        dao.deleteExchangesRecord(data,json);
    }
    private void modifyExchangesRecord(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        ExchangesDao dao=new ExchangesDao();
        Data data=getPageParameters(request,response,json);
        dao.modifyExchangesRecord(data,json);
    }
    private void getAmplitudeByExchangesId(HttpServletRequest request, HttpServletResponse response,JSONObject json) throws JSONException, SQLException {
        ExchangesDao dao=new ExchangesDao();
        Data data=getPageParameters(request,response,json);//转换一下数据
        dao.getAmplitudeByExchangesId(data,json);
    }
    private void getExchangesKline(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        ExchangesDao dao=new ExchangesDao();
        Data data=getPageParameters(request,response,json);
        dao.getExchangesKline(data,json);
    }
    private void exportExchangesRecord(HttpServletRequest request, HttpServletResponse response,JSONObject json) throws JSONException, SQLException, IOException {
        ExchangesDao dao=new ExchangesDao();
        Data data=getPageParameters(request,response,json);
        dao.getExchangesRecord(data,json);
        getExportExchangesRecordToFile(json, data);
        getExportExchangesRecordToExcel(json, data);
    }

    private void getExportExchangesRecordToFile(JSONObject json, Data data) throws JSONException {
        String download_url = "/output/exchanges/export_exchanges.rar";
        String file_path = "C:\\Tools\\output\\exchanges\\export_exchanges.rar";

        String jsonStr=json.toString();
        File jsonFile = new File(file_path);		//是txt的时候浏览器会自动的显示出来，不会执行下载功能
        json.put("download_rar_url",download_url);
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
    private void getExportExchangesRecordToExcel(JSONObject json, Data data) throws JSONException, IOException {
        String download_url = "/output/exchanges/export_exchanges.xls";
        String file_path = "C:\\Tools\\output\\exchanges\\export_exchanges.xls";

        MyExcel me=new MyExcel(file_path);
        json.put("download_xls_url",download_url);
        json.put("file_path",file_path);
        me.exportData(data,json);
    }
}
