package news.getdata;

import news.dao.Data;
import news.dao.newsDao;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;

public class ServletAction extends HttpServlet {
    String module="news";
    String sub="getdata";
    public void showDebug(String msg) {
        System.out.println("[" + (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date()) + "][/ServletAction]" + msg);
    }

    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processAction(request, response);
    }

    private void processAction(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
        HttpSession session = request.getSession();
        request.setCharacterEncoding("UTF-8");
        String action = request.getParameter("action");
        boolean actionOk = false;
        int resultCode = 0;
        String resultMsg = "ok";
        JSONObject json = new JSONObject();
        showDebug("[processAction]收到的action是：" + action);
        if (action == null) {
            resultMsg = "传递过来的action是NULL";
        } else {
            if (action.equals("get_news_data")) {
                actionOk = true;
                try {
                    getNewsData(request, response, json);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (action.equals("insert_news_info")){
                actionOk = true;
                try{
                    InsertNewsInfo(request,response,json);
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


    private void InsertNewsInfo(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws JSONException, SQLException {
        newsDao dao = new newsDao();
        Data data = getPageParameters(request,response,json);
        dao.InsertNewsInfo(data,json);
    }

    private void getNewsData(HttpServletRequest request, HttpServletResponse response, JSONObject json) throws IOException, JSONException {
    System.out.println("开始执行getNewsData==================");
    String urlData = "https://apis.tianapi.com/caijing/index?key=ed572243ffc23a8a3cff4d01796b8797&num=10";
        URL urlConn = new URL(urlData);
        getURL(urlConn,json);
    }

    private void getURL(URL urlConn, JSONObject json) throws IOException, JSONException {
        String resultMsg = "ok";
        int resultCode = 0;
        System.out.println("开始执行GetUrl==============");

        //创建连接
        URLConnection connection = urlConn.openConnection();
        connection.setConnectTimeout(1000);
        BufferedReader reader = new BufferedReader(new
                InputStreamReader(connection.getInputStream(),"UTF-8"));
        String lines;
        // StringBuffer sb = new StringBuffer("");
        StringBuilder sb = new StringBuilder();
        while ((lines = reader.readLine()) != null) {
            // lines = URLDecoder.decode(lines, "utf-8");
            sb.append(lines);
        }
        System.out.println("显示获取的数据："+sb);
        String datas = sb.toString();
        System.out.println("显示转换的data:"+datas);

        JSONObject jsonObject = new JSONObject(datas);
        JSONArray jsonArray = jsonObject.getJSONObject("result").getJSONArray("newslist");

        newsDao dao = new newsDao();
        dao.addNewsRecord(jsonArray);
    }
}
