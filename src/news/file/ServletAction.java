package news.file;

import news.dao.CommentDao;
import news.dao.Data;
import news.dao.newsDao;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;

public class ServletAction extends HttpServlet {
    String module="news";
    String sub="file";
    public void showDebug(String msg){
        System.out.println("["+(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date())+"]["+module+"/"+sub+"/ServletAction]"+msg);
    }
    public void service(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        processAction(request,response);
    }

    private void processAction(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
        HttpSession session = request.getSession();
        request.setCharacterEncoding("UTF-8");
        String action = request.getParameter("action");
        boolean actionOk = false;
        int resultCode=0;
        String resultMsg="ok";
        JSONObject json=new JSONObject();
        showDebug("[processAction]收到的action是："+action);
        if(action == null) {
            resultMsg = "传递过来的action是null";
        }else {
            if (action.equals("get_zxrd_record")){
                actionOk = true;
                try {
                    getZXRDRecord(request,response,json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("get_cjxw_record")){
                actionOk = true;
                try {
                    getCJXWRecord(request,response,json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("get_gjxw_record")){
                actionOk = true;
                try {
                    getGJXWRecord(request,response,json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("get_news_content")){
                actionOk = true;
                try {
                    getNewsContent(request,response,json);
                } catch (Exception e){
                    e.printStackTrace();
                }
            }
            if (action.equals("modify_news_content")){
                actionOk = true;
                try {
                    modifyNewsContent(request,response,json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("modify_news_submit")){
                actionOk = true;
                try {
                    modifyNewsSubmit(request,response,json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

            if (action.equals("delete_news_record")){
                actionOk = true;
                try {
                    deleteNewsRecord(request,response,json);
                } catch (Exception e){
                    e.printStackTrace();
                }
            }
            if (action.equals("get_news_comment")){
                actionOk = true;
                try {
                    getNewsComment(request,response,json);
                } catch (Exception e){
                    e.printStackTrace();
                }
            }
            if (action.equals("add_news_comment")){
                actionOk = true;
                try {
                    addNewsComment(request,response,json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("add_comment_reply")){
                actionOk = true;
                try{
                    addCommentReply(request,response,json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

            if (action.equals("delete_news_comment")){
                actionOk = true;
                try{
                    deleteNewsComment(request,response,json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

            if (action.equals("modify_news_comment"))
            {
                actionOk = true;
                try {
                    modifyNewsComment(request,response,json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("export_news_record"))
            {
                actionOk = true;
                try {
                    exportNewsRecord(request,response,json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("export_comment_record"))
            {
                actionOk = true;
                try {
                    exportCommentRecord(request,response,json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("get_news_count_by_hour"))
            {
                actionOk = true;
                try {
                    getNewsCountByHour(request,response,json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("get_comment_count_by_hour"))
            {
                actionOk = true;
                try {
                    getCommentCountByHour(request,response,json);
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


    /*========================================公共函数 开始========================================*/
    private Data getPageParameters(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException{
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

    private void getZXRDRecord(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException {
        newsDao dao = new newsDao();
        Data data=getPageParameters(request,response,json);
        dao.getZXRDRecord(data,json);
        //System.out.println("getNewsRecord里输出的："+json);
    }

    private void getCJXWRecord(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException {
        newsDao dao = new newsDao();
        Data data=getPageParameters(request,response,json);
        dao.getCJXWRecord(data,json);
        //System.out.println("getNewsRecord里输出的："+json);
    }

    private void getGJXWRecord(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException {
        newsDao dao = new newsDao();
        Data data=getPageParameters(request,response,json);
        dao.getGJXWRecord(data,json);
        //System.out.println("getNewsRecord里输出的："+json);
    }


    private void getNewsContent(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException {
        newsDao dao = new newsDao();
        Data data = getPageParameters(request,response,json);
        dao.getNewsContent(data,json);
    }

    private void modifyNewsContent(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException {
        newsDao dao = new newsDao();
        Data data = getPageParameters(request,response,json);
        dao.modifyNewsContent(data,json);
    }

    private void modifyNewsSubmit(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        newsDao dao = new newsDao();
        Data data = getPageParameters(request,response,json);
        dao.modifyNewsSubmit(data,json);
    }

    private void deleteNewsRecord(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        newsDao dao = new newsDao();
        Data data = getPageParameters(request,response,json);
        dao.deleteNewsRecord(data,json);
    }

    private void getNewsComment(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException {
        newsDao dao = new newsDao();
        Data data = getPageParameters(request,response,json);
        dao.getNewsComment(data,json);
    }

    private void addNewsComment(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException {
        newsDao dao = new newsDao();
        Data data = getPageParameters(request,response,json);
        dao.addNewsComments(data,json);
    }

    private void addCommentReply(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException {
        newsDao dao = new newsDao();
        Data data = getPageParameters(request,response,json);
        dao.addCommentReply(data,json);
    }

    private void deleteNewsComment(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        newsDao dao = new newsDao();
        Data data = getPageParameters(request,response,json);
        dao.deleteNewsComment(data,json);
    }

    private void modifyNewsComment(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        CommentDao dao = new CommentDao();
        Data data = getPageParameters(request,response,json);
        dao.modifyCommentRecord(data,json);
    }

    private void exportNewsRecord(HttpServletRequest request, HttpServletResponse response,JSONObject json) throws JSONException, SQLException, IOException {
        newsDao dao=new newsDao();
        Data data=getPageParameters(request,response,json);
        dao.getZXRDRecord(data,json);
        //getExportDeviceRecordFile(data,json);
        getExportDeviceRecordExcel(data,json);
    }
    //导出评论列表
    //待完善
    private void exportCommentRecord(HttpServletRequest request, HttpServletResponse response,JSONObject json) throws JSONException, SQLException, IOException {
        newsDao dao = new newsDao();
        Data data = getPageParameters(request,response,json);
        dao.getNewsComment(data,json);
        //getExportDeviceRecordFile(data,json);
        getExportCommentRecordExcel(data,json);
    }

    private void getNewsCountByHour(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        newsDao dao = new newsDao();
        Data data = getPageParameters(request,response,json);
        dao.getNewsCountByHour(data,json);
    }


    private void getCommentCountByHour(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        CommentDao dao = new CommentDao();
        Data data = getPageParameters(request,response,json);
        dao.getCommentCountByHour(data,json);
    }

    private void getExportDeviceRecordFile(Data data, JSONObject json) throws JSONException {
        System.out.println("开始执行getExportDeviceRecordFile===============================");
        String jsonStr = json.toString();
        File jsonFile = new File("C:\\upload\\maintain\\device\\export_News.txt");
        json.put("download_url","/upload/maintain/device/export_News.txt");
        try{
            //文件不存在就创建文件
            if(!jsonFile.exists()){
                jsonFile.createNewFile();
            }
            FileWriter fileWriter = new FileWriter(jsonFile.getAbsoluteFile());
            BufferedWriter bw = new BufferedWriter(fileWriter);
            bw.write(jsonStr);
            bw.close();
            System.out.println("执行getExportDeviceRecordFile结束===============================");
        }catch (IOException e){
            e.printStackTrace();
        }
    }

    private void getExportDeviceRecordExcel(Data data, JSONObject json) throws JSONException, IOException {
        MyExcel me = new MyExcel("C:\\upload\\maintain\\device\\export_News.xls");
        json.put("download_url","/upload/maintain/device/export_News.xls");
        json.put("file_path","C:\\upload\\maintain\\device\\export_News.xls");
        me.exportData(data,json);
    }
    private void getExportCommentRecordExcel(Data data, JSONObject json) throws JSONException, IOException {
        MyExcel me = new MyExcel("C:\\upload\\maintain\\device\\export_Comments.xls");
        json.put("download_url","/upload/maintain/device/export_Comments.xls");
        json.put("file_path","C:\\upload\\maintain\\device\\export_Comments.xls");
        me.exportData(data,json);
    }
}
