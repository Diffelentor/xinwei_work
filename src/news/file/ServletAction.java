package news.file;

import news.dao.Data;
import news.dao.newsDao;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
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
}
