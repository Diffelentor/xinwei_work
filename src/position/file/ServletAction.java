package position.file;
/*
 * 待完成：用MVC模式分开DB和Action操作
 * 增删改查看导印统功能的实现
 */

import position.dao.Data;
import position.dao.DeviceDao;
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
    String module="position";
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
            if (action.equals("get_device_record")) {
                actionOk=true;
                try {
                    getDeviceRecord(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("add_device_record")) {
                actionOk=true;
                try {
                    addDeviceRecord(request, response, json);
                } catch (JSONException e) {
                    e.printStackTrace();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("modify_device_record")) {
                actionOk=true;
                try {
                    modifyDeviceRecord(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("delete_device_record")) {
                actionOk=true;
                try {
                    deleteDeviceRecord(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("get_position_record")) {
                actionOk=true;
                try {
                    getPositionRecord(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("export_position_record")) {
                actionOk=true;
                try {
                    exportPositionRecord(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("export_history_administrator_record")) {
                actionOk=true;
                try {
                    exportHistoryAdministratorRecord(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("add_position_record")) {
                actionOk=true;
                try {
                    addPositionRecord(request, response, json);
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
            if (action.equals("get_position_amplitude_by_futuresId")) {
                actionOk=true;
                try {
                    getAmplitudeByFuturesId(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("get_history_ad_amplitude_by_futuresId")) {
                actionOk=true;
                try {
                    getHistoryAdAmplitudeByFuturesId(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("get_history_administrator_record")) {
                actionOk=true;
                try {
                    getHistoryAdministratorRecord(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("add_history_ad_record")) {
                actionOk=true;
                try {
                    addHistoryAdRecord(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("delete_history_ad_record")) {
                actionOk=true;
                try {
                    deleteHistoryAdRecord(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("modify_history_ad_record")) {
                actionOk=true;
                try {
                    modifyHistoryAdRecord(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("sale_futures_all")) {
                actionOk=true;
                try {
                    modifySaleFuturesAll(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("sale_futures_part_add")) {
                actionOk=true;
                try {
                    addSaleFuturePart(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("sale_futures_part_modify")) {
                actionOk=true;
                try {
                    moddifySaleFuturesPart(request, response, json);
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
        showDebug("[getPageParameters]data的Param="+data.getParam().toString());
        showDebug("[getPageParameters]----------------------------------------获取所有表单信息 完毕----------------------------------------");
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
    /*========================================CRUD业务函数 开始========================================*/
    private void getDeviceRecord(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        DeviceDao dao=new DeviceDao();
        Data data=getPageParameters(request,response,json);
        dao.getDeviceRecord(data,json);
    }
    private void modifyDeviceRecord(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        DeviceDao dao=new DeviceDao();
        Data data=getPageParameters(request,response,json);
        dao.modifyDeviceRecord(data,json);
    }
    private void deleteDeviceRecord(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        DeviceDao dao=new DeviceDao();
        Data data=getPageParameters(request,response,json);
        dao.deleteDeviceRecord(data,json);
    }
    private void addDeviceRecord(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        DeviceDao dao=new DeviceDao();
        Data data=getPageParameters(request,response,json);
        dao.addDeviceRecord(data,json);
    }
    /*========================================CRUD业务函数 结束========================================*/
    /*========================================CRUD业务函数 开始========================================*/
    private void getPositionRecord(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        DeviceDao dao=new DeviceDao();
        Data data=getPageParameters(request,response,json);
        dao.getDeviceRecord(data,json);
    }
    private void getHistoryAdministratorRecord(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        DeviceDao dao=new DeviceDao();
        Data data=getPageParameters(request,response,json);
        dao.getHistoryAdministratorRecord(data,json);
    }
    private void addPositionRecord(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        DeviceDao dao=new DeviceDao();
        Data data=getPageParameters(request,response,json);
        dao.addDeviceRecord(data,json);
    }
    private void addHistoryAdRecord(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        DeviceDao dao=new DeviceDao();
        Data data=getPageParameters(request,response,json);
        dao.addHistoryAdRecord(data,json);
    }
    private void addSaleFuturePart(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        DeviceDao dao=new DeviceDao();
        Data data=getPageParameters(request,response,json);
        dao.addHistoryAdRecord(data,json);
    }
    private void deleteFuturesRecord(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        DeviceDao dao=new DeviceDao();
        Data data=getPageParameters(request,response,json);
        dao.deleteDeviceRecord(data,json);
    }
    private void deleteHistoryAdRecord(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        DeviceDao dao=new DeviceDao();
        Data data=getPageParameters(request,response,json);
        dao.deleteHistoryAdRecord(data,json);
    }
    private void modifyFuturesRecord(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        DeviceDao dao=new DeviceDao();
        Data data=getPageParameters(request,response,json);
        dao.modifyDeviceRecord(data,json);
    }
    private void modifyHistoryAdRecord(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        DeviceDao dao=new DeviceDao();
        Data data=getPageParameters(request,response,json);
        dao.modifyHistoryAdRecord(data,json);
    }
    private void moddifySaleFuturesPart(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        DeviceDao dao=new DeviceDao();
        Data data=getPageParameters(request,response,json);
        dao.moddifySaleFuturesPart(data,json);
    }
    private void modifySaleFuturesAll(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        DeviceDao dao=new DeviceDao();
        Data data=getPageParameters(request,response,json);
        dao.modifySaleFuturesAll(data,json);
    }
    /*========================================CRUD业务函数 结束========================================*/

    /*========================================查询统计相关数据========================================*/
    private void getAmplitudeByFuturesId(HttpServletRequest request, HttpServletResponse response,JSONObject json) throws JSONException, SQLException {
        DeviceDao dao=new DeviceDao();
        Data data=getPageParameters(request,response,json);//转换一下数据
        dao.getAmplitudeByFuturesId(data,json);
    }
    private void getHistoryAdAmplitudeByFuturesId(HttpServletRequest request, HttpServletResponse response,JSONObject json) throws JSONException, SQLException {
        DeviceDao dao=new DeviceDao();
        Data data=getPageParameters(request,response,json);//转换一下数据
        dao.getHistoryAdAmplitudeByFuturesId(data,json);
    }

    /*========================================导出功能========================================*/
    //持仓导出功能
    private void exportPositionRecord(HttpServletRequest request, HttpServletResponse response,JSONObject json) throws JSONException, SQLException, IOException {
        DeviceDao dao=new DeviceDao();
        Data data=getPageParameters(request,response,json);
        dao.getDownloadRecord(data,json);
        getExportDeviceRecordToFile(json, data);
        getExportDeviceRecordToTxt(json, data);
        getExportDeviceRecordToExcel(json, data);
        getExportDeviceRecordToPdf(json, data);
    }
    //管理员历史记录导出功能
    private void exportHistoryAdministratorRecord(HttpServletRequest request, HttpServletResponse response,JSONObject json) throws JSONException, SQLException, IOException {
        DeviceDao dao=new DeviceDao();
        Data data=getPageParameters(request,response,json);
        dao.exportHistoryAdministratorRecord(data,json);
        getExportHistoryAdRecordToFile(json, data);
        getExportHistoryAdRecordToExcel(json, data);
    }

    private void getExportDeviceRecordToPdf(JSONObject json, Data data) {
    }
    private void getExportDeviceRecordToTxt(JSONObject json, Data data) {
    }
    private void getExportHistoryAdRecordToFile(JSONObject json, Data data) throws JSONException {
        String jsonStr=json.toString();
        File jsonFile = new File("C:\\testUpload\\historyData.rar");		//是txt的时候浏览器会自动的显示出来，不会执行下载功能
        json.put("download_url1","/upload/maintain/device/historyData.rar");
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
    private void getExportDeviceRecordToFile(JSONObject json, Data data) throws JSONException {
        String jsonStr=json.toString();
        File jsonFile = new File("C:\\testUpload\\PositionData.rar");		//是txt的时候浏览器会自动的显示出来，不会执行下载功能
        json.put("download_url1","/upload/maintain/device/PositionData.rar");
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
    private void getExportHistoryAdRecordToExcel(JSONObject json, Data data) throws JSONException, IOException {
        MyExcel me=new MyExcel("C:\\testUpload\\historyData.xls");
        json.put("download_url2","/upload/maintain/device/historyData.xls");
        json.put("file_path","C:\\testUpload\\historyData.xls");
        me.exportData(data,json);
    }
    private void getExportDeviceRecordToExcel(JSONObject json, Data data) throws JSONException, IOException {
        MyExcel me=new MyExcel("C:\\testUpload\\PositionData.xls");
        json.put("download_url2","/upload/maintain/device/PositionData.xls");
        json.put("file_path","C:\\testUpload\\PositionData.xls");
        me.exportData(data,json);
    }
}
