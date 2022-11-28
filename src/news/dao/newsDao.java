package news.dao;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.*;


public class newsDao {
    public void showDebug(String msg){
        System.out.println("["+(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date())+"][option/dao/Db]"+msg);
    }

    //将爬取的新闻信息导入数据库
    public void addNewsRecord(JSONArray jsonArray) throws JSONException {

        Db updateDb = new Db("news");

        for(int i = 0; i < jsonArray.length(); i++) {
            JSONObject jsonObject = jsonArray.getJSONObject(i);
            //获取新闻信息
            String id = jsonObject.getString("id");
            String title = jsonObject.getString("title");
            String url = jsonObject.getString("url");
            String time = jsonObject.getString("ctime");
            String content = jsonObject.getString("description");
            System.out.println("id:"+id+"title:"+title+"url:"+url+"time:"+time+"content:"+content);
            if (id!=null && title!=null && url!=null && time!=null && content!=null)
            {
                String sql = "insert into news_info(news_ID,title,content,time,news_url) ";
                sql = sql+"values('"+id+"'";
                sql = sql +" ,'"+title+"'";
                sql = sql +" ,'"+content+"'";
                sql = sql +" ,'"+time+"'";
                sql = sql +" ,'"+url+"')";
                showDebug(sql);
                updateDb.executeUpdate(sql);
            }
        }
        updateDb.close();
    }

    //发表评论实现
    public void addNewsComments(Data data, JSONObject json) throws JSONException {
        String resultMsg = "发表评论成功！";
        int resultCode = 0;
        Db updateDb = new Db("news");

        int news_id = data.getParam().has("news_id")?data.getParam().getInt("news_id"):0;
        String Name = data.getParam().has("user_name")?data.getParam().getString("user_name"):null;
        String Comments = data.getParam().has("news_comments")?data.getParam().getString("news_comments"):null;
        //String Time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String Time = simpleDateFormat.format(new Date());
        System.out.println("News_ID:"+news_id+"Name:"+Name+"Comments:"+Comments);
        if (news_id!=0 && Name!=null && Comments!=null){
            String sql = "insert into news_comments(news_id,user_name,comment,submit_time)";
            sql = sql+"values('"+news_id+"'";
            sql = sql +" ,'"+Name+"'";
            sql = sql +" ,'"+Comments+"'";
            sql = sql +" ,'"+Time+"')";
            showDebug(sql);
            updateDb.executeUpdate(sql);
        }else {
            resultMsg = "发表评论失败";
            resultCode = 10;
        }
        updateDb.close();

        json.put("result_msg",resultMsg);
        json.put("result_code",resultCode);
    }


    //查询新闻记录
    public void getZXRDRecord(Data data, JSONObject json) throws JSONException {
        String sql = createGetRecordSql(data,1);
        data.getParam().put("sql",sql);
        queryRecord(data,json);
    }

    public void getCJXWRecord(Data data, JSONObject json) throws JSONException {
        String sql = createGetRecordSql(data,2);
        data.getParam().put("sql",sql);
        queryRecord(data,json);
    }

    public void getGJXWRecord(Data data, JSONObject json) throws JSONException {
        String sql = createGetRecordSql(data,3);
        data.getParam().put("sql",sql);
        queryRecord(data,json);
    }

    //根据页面id获取某条新闻具体内容
    public void getNewsContent(Data data, JSONObject json) throws JSONException {
        String resultMsg = "ok";
        int resultCode = 0;
        int id=data.getParam().has("id")?data.getParam().getInt("id"):null;

        String news_title = "";
        String news_time = "";
        String news_content = "";

        String sql = "select * from news_info where id="+id;
        showDebug("[queryRecord]构造的SQL语句是：" + sql);
        Db queryDb = new Db("news");
        try{
            ResultSet rs = queryDb.executeQuery(sql);
            ResultSetMetaData rsmd = rs.getMetaData();
            while(rs.next()){
                news_title=rs.getString("title");
                news_time=rs.getString("time");
                news_content=rs.getString("content");
            }
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
            showDebug("[queryRecord]查询数据库出现错误！" + sql);
            resultCode = 10;
            resultMsg = "查询数据库出现错误！" + e.getMessage();
        }
        queryDb.close();
        int index=0;
        while((index=news_content.indexOf("\n"))!=-1)
            news_content=news_content.substring(0,index)+"<br>"+news_content.substring(index+1);
        while((index=news_content.indexOf(" "))!=-1)
            news_content=news_content.substring(0,index)+"&nbsp"+news_content.substring(index+1);
        System.out.println("显示获取的数据库信息："+news_title+news_time+news_content);
        json.put("news_title",news_title);
        json.put("news_time",news_time);
        json.put("news_content",news_content);
        json.put("result_msg",resultMsg);
        json.put("result_code",resultCode);
    }

    public void getNewsComment(Data data, JSONObject json) throws JSONException {
        String sql = createGetCommentSql(data);
        data.getParam().put("sql",sql);
        queryRecord(data,json);
    }

    private void queryRecord(Data data, JSONObject json) throws JSONException {
        /*--------------------获取变量 开始--------------------*/
        String resultMsg = "ok";
        int resultCode = 0;
        List jsonList = new ArrayList();
        /*--------------------获取变量 完毕--------------------*/
        /*--------------------数据操作 开始--------------------*/
        Db queryDb = new Db("news");
        String sql=data.getParam().getString("sql");
        showDebug("[queryRecord]构造的SQL语句是：" + sql);
        try {
            ResultSet rs = queryDb.executeQuery(sql);
            ResultSetMetaData rsmd = rs.getMetaData();
            int fieldCount = rsmd.getColumnCount();
            while (rs.next()) {
                Map map = new HashMap();
                for (int i = 0; i < fieldCount; i++) {
                    map.put(rsmd.getColumnName(i + 1), rs.getString(rsmd.getColumnName(i + 1)));
                }
                jsonList.add(map);
            }
            rs.close();
        } catch (Exception e) {
            e.printStackTrace();
            showDebug("[queryRecord]查询数据库出现错误：" + sql);
            resultCode = 10;
            resultMsg = "查询数据库出现错误！" + e.getMessage();
        }
        queryDb.close();
        /*--------------------数据操作 结束--------------------*/
        /*--------------------返回数据 开始--------------------*/
        json.put("aaData",jsonList);
        json.put("result_msg",resultMsg);															//如果发生错误就设置成"error"等
        json.put("result_code",resultCode);														//返回0表示正常，不等于0就表示有错误产生，错误代码
        /*--------------------返回数据 结束--------------------*/
    }

    private String createGetRecordSql(Data data, int module) throws JSONException {
        String sql = "select id,news_ID,title,time,news_url from news_info where module="+module;

//        String id = data.getParam().has("id")?data.getParam().getString("id"):null;
//        if(id!=null && !id.isEmpty())
//            sql = sql + " where id="+id;

        String KeyWords=data.getParam().has("keywords")?data.getParam().getString("keywords"):null;
        if(KeyWords!=null && !KeyWords.isEmpty()){
            if(sql.indexOf("where")>-1){
                sql=sql+" and title like '%"+KeyWords+"%'";
            }else{
                sql=sql+" where title like '%"+KeyWords+"%'";
            }
        }

        sql = sql+" order by id desc";
        return sql;
    }

    private String createGetCommentSql(Data data) throws JSONException {
        String sql = "select * from news_comments";
        String id = data.getParam().has("id")?data.getParam().getString("id"):null;
        if(id!=null && !id.isEmpty())
            sql = sql + " where news_id="+id;

        return sql;
    }
}
