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

        Db updateDb = new Db("test");

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
                String sql = "insert into xm06_news_info(news_ID,title,content,time,news_url) ";
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

    //手动导入新闻（发表文章）
    public void InsertNewsInfo(Data data, JSONObject json) throws JSONException {
        String resultMsg = "发表新闻成功！";
        int resultCode = 0;
        Db updateDb = new Db("test");

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String Time = simpleDateFormat.format(new Date());

        String Writer = data.getParam().has("writer")?data.getParam().getString("writer"):null;
        String Title = data.getParam().has("title")?data.getParam().getString("title"):null;
        String Content = data.getParam().has("news_content")?data.getParam().getString("news_content"):null;

        if (Writer!=null && Title!=null && Content!=null && !Writer.isEmpty() && !Title.isEmpty() && !Content.isEmpty()) {
            String sql = "insert into xm06_news_info(module,writer,title,content,time) values(";
            sql = sql + "1 ,'"+Writer+"' ,'"+Title+"' ,'"+Content+"' ,'"+Time+"')";
            showDebug("构造的sql语句:"+sql);
            updateDb.executeUpdate(sql);
        }else {
            resultMsg = "发表新闻失败！";
            resultCode = 10;
        }
        updateDb.close();

        json.put("result_msg",resultMsg);
        json.put("result_code",resultCode);
    }


    public void getNewsCountByHour(Data data, JSONObject json) throws JSONException {
        String resultMsg = "获取计数成功！";
        int resultCode = 0;

        List jsonList = new ArrayList();
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DATE,-1);
        String timeFrom = (new SimpleDateFormat("yyyy-MM-dd 00:00:00")).format(cal.getTime());
        String timeTo = (new SimpleDateFormat("yyyy-MM-dd 23:59:59")).format(cal.getTime());

        Db queryDb = new Db("test");
        String sql = "select DATE_FORMAT(time,\"%Y-%m-%d %H\") as time_interval,count(*) as total from xm06_news_info";
        sql = sql +" where time between '2022-11-28 00:00:00' and '2022-11-28 23:59:59' ";
        sql = sql + " group by DATE_FORMAT(time,\"%Y-%m-%d %H\") ";
        showDebug("[getNewsCountByHour]构造的SQL语句是："+sql);

        try {
            ResultSet rs = queryDb.executeQuery(sql);
            ResultSetMetaData rsmd = rs.getMetaData();
            int fieldCount = rsmd.getColumnCount();
            while (rs.next()){
                HashMap map = new HashMap();
                map.put("time_interval",rs.getString("time_interval"));
                map.put("total",rs.getString("total"));
                jsonList.add(map);
            }
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
            showDebug("[getNewsCountByHour]查询数据库出现错误："+sql);
            resultCode = 10;
            resultMsg = "查询数据库出现错误！" +e.getMessage();
        }
        queryDb.close();
        /*--------------------返回数据 开始--------------------*/
        json.put("aaData",jsonList);
        json.put("result_msg",resultMsg);															//如果发生错误就设置成"error"等
        json.put("result_code",resultCode);														//返回0表示正常，不等于0就表示有错误产生，错误代码
        /*--------------------返回数据 结束--------------------*/
    }

        //发表评论实现
    public void addNewsComments(Data data, JSONObject json) throws JSONException {
        String resultMsg = "发表评论成功！";
        int resultCode = 0;
        Db updateDb = new Db("test");

        int news_id = data.getParam().has("news_id")?data.getParam().getInt("news_id"):0;
        String Name = data.getParam().has("user_name")?data.getParam().getString("user_name"):null;
        String Comments = data.getParam().has("news_comments")?data.getParam().getString("news_comments"):null;
        //String Time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String Time = simpleDateFormat.format(new Date());
        System.out.println("News_ID:"+news_id+"Name:"+Name+"Comments:"+Comments);
        if (news_id!=0 && Name!=null && Comments!=null && !Comments.isEmpty()){
            String sql = "insert into xm06_news_comments(news_id,user_name,comment,submit_time)";
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

    //回复评论实现
    public void addCommentReply(Data data, JSONObject json) throws JSONException {
        String resultMsg = "回复评论成功！";
        int resultCode = 0;
        Db updateDb = new Db("test");

        int comment_id = data.getParam().has("commentId")?data.getParam().getInt("commentId"):0;
        String user_name = data.getParam().has("reply_name")?data.getParam().getString("reply_name"):null;
        String reply_content = data.getParam().has("reply_content")?data.getParam().getString("reply_content"):null;
        //String Time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String Time = simpleDateFormat.format(new Date());
        System.out.println("comment_id:"+comment_id+"user_name:"+user_name+"contents:"+reply_content);

        if (comment_id!=0 && user_name!=null && reply_content!=null && !reply_content.isEmpty()){
            String sql = "insert into xm06_comment_reply(reply_id,name,reply,time)";
            sql = sql+"values('"+comment_id+"'";
            sql = sql +" ,'"+user_name+"'";
            sql = sql +" ,'"+reply_content+"'";
            sql = sql +" ,'"+Time+"')";
            showDebug("[addCommentReply]构造的sql语句:"+sql);
            updateDb.executeUpdate(sql);
        }else {
            resultMsg = "发表回复失败";
            resultCode = 10;
        }
        updateDb.close();

        json.put("result_msg",resultMsg);
        json.put("result_code",resultCode);
    }

    //删除评论
    public void deleteNewsComment(Data data, JSONObject json) throws JSONException, SQLException {
        int id = data.getParam().has("commentID")?data.getParam().getInt("commentID"):0;
        if(id != 0){
            System.out.println("获取到的comment_id不为空！！！");
            //先删除评论的回复
            String sql = "delete from xm06_comment_reply where reply_id="+id;
            data.getParam().put("sql",sql);
            updateRecord(data,json);

            //再删除该条评论
            String sql1 = "delete from xm06_news_comments where id="+id;
            data.getParam().put("sql",sql1);
            updateRecord(data,json);
        }
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
        int id=data.getParam().has("id")?data.getParam().getInt("id"):0;

        String news_title = "";
        String news_time = "";
        String news_content = "";
        String news_writer = "";

        String sql = "select * from xm06_news_info where id="+id;
        showDebug("[queryRecord]构造的SQL语句是：" + sql);
        Db queryDb = new Db("test");
        try{
            ResultSet rs = queryDb.executeQuery(sql);
            ResultSetMetaData rsmd = rs.getMetaData();
            while(rs.next()){
                news_title=rs.getString("title");
                news_time=rs.getString("time");
                news_content=rs.getString("content");
                news_writer=rs.getString("writer");
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
        json.put("news_writer",news_writer);
        json.put("result_msg",resultMsg);
        json.put("result_code",resultCode);
    }

    public void modifyNewsContent(Data data, JSONObject json) throws JSONException {
        String resultMsg = "ok";
        int resultCode = 0;
        int id=data.getParam().has("id")?data.getParam().getInt("id"):0;

        String news_title = "";
        String news_content = "";
        String news_writer = "";

        String sql = "select * from xm06_news_info where id="+id;
        showDebug("[queryRecord]构造的SQL语句是：" + sql);
        Db queryDb = new Db("test");
        try{
            ResultSet rs = queryDb.executeQuery(sql);
            ResultSetMetaData rsmd = rs.getMetaData();
            while(rs.next()){
                news_title=rs.getString("title");
                news_content=rs.getString("content");
                news_writer=rs.getString("writer");
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
//        while((index=news_content.indexOf("\n"))!=-1)
//            news_content=news_content.substring(0,index)+"<br>"+news_content.substring(index+1);
        while((index=news_content.indexOf(" "))!=-1)
            news_content=news_content.substring(0,index)+"&nbsp"+news_content.substring(index+1);
//        System.out.println("显示获取的数据库信息："+news_title+news_content);
        json.put("news_title",news_title);
        json.put("news_content",news_content);
        json.put("news_writer",news_writer);
        json.put("result_msg",resultMsg);
        json.put("result_code",resultCode);
    }

    public void modifyNewsSubmit(Data data, JSONObject json) throws JSONException, SQLException {
        String resultMsg = "ok";
        int resultCode = 0;
        int id = data.getParam().has("id")?data.getParam().getInt("id"):0;
        String title = data.getParam().has("title")?data.getParam().getString("title"):null;
        String writer = data.getParam().has("writer")?data.getParam().getString("writer"):null;
        String content = data.getParam().has("news_content")?data.getParam().getString("news_content"):null;

        if (id!=0 && title!=null && writer!=null && content!=null && !title.isEmpty() && !content.isEmpty()) {
            String sql="update xm06_news_info";
            sql=sql+" set title='"+title+"'";
            sql=sql+" ,writer='"+writer+"'";
            sql=sql+" ,content='"+content+"'";
            sql=sql+" where id="+id;
            data.getParam().put("sql",sql);
            updateRecord(data,json);
        }else {
            resultMsg = "前端传来的数据为空";
            resultCode = 10;
            json.put("result_msg",resultMsg);															//如果发生错误就设置成"error"等
            json.put("result_code",resultCode);
        }
    }

    public void deleteNewsRecord(Data data, JSONObject json) throws JSONException, SQLException {
        int id=data.getParam().has("news_ID")?data.getParam().getInt("news_ID"):null;
        if (id != 0){
            String sql = "delete from xm06_news_info where id="+id;
            data.getParam().put("sql",sql);
            updateRecord(data,json);
        } else {
            int resultCode=10;
            String resultMsg="error!";
            json.put("result_msg",resultMsg);															//如果发生错误就设置成"error"等
            json.put("result_code",resultCode);
        }

    }

    public void getNewsComment(Data data, JSONObject json) throws JSONException {
        String sql = createGetCommentSql(data);
        data.getParam().put("sql",sql);
        queryRecord(data,json);

        String reply_sql = createGetReplySql(data);
        if (reply_sql!=null && !reply_sql.isEmpty()){
            data.getParam().put("sql",reply_sql);
            queryReply(data,json);
        }
    }

    private void queryRecord(Data data, JSONObject json) throws JSONException {
        /*--------------------获取变量 开始--------------------*/
        String resultMsg = "ok";
        int resultCode = 0;
        List jsonList = new ArrayList();
        List jsonName = new ArrayList();
        /*--------------------获取变量 完毕--------------------*/
        /*--------------------数据操作 开始--------------------*/
        Db queryDb = new Db("test");
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

            //加表头信息
            for (int i = 0; i <rsmd.getColumnCount();i++){
                String columnLabel=rsmd.getColumnLabel(i+1);
                jsonName.add(columnLabel);
            }

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
        json.put("aaFieldName",jsonName);
        json.put("result_msg",resultMsg);															//如果发生错误就设置成"error"等
        json.put("result_code",resultCode);														//返回0表示正常，不等于0就表示有错误产生，错误代码
        /*--------------------返回数据 结束--------------------*/
    }

    private void queryReply(Data data, JSONObject json) throws JSONException {
        /*--------------------获取变量 开始--------------------*/
        String resultMsg1 = "ok";
        int resultCode1 = 0;
        List jsonList = new ArrayList();
        /*--------------------获取变量 完毕--------------------*/
        /*--------------------数据操作 开始--------------------*/
        Db queryDb = new Db("test");
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
            resultCode1 = 10;
            resultMsg1 = "查询数据库出现错误！" + e.getMessage();
        }
        queryDb.close();
        /*--------------------数据操作 结束--------------------*/
        /*--------------------返回数据 开始--------------------*/
        System.out.println("获取的评论回复："+jsonList);
        json.put("bbData",jsonList);
        json.put("result_msg1",resultMsg1);															//如果发生错误就设置成"error"等
        json.put("result_code1",resultCode1);														//返回0表示正常，不等于0就表示有错误产生，错误代码
        /*--------------------返回数据 结束--------------------*/
    }

    private void updateRecord(Data data, JSONObject json) throws JSONException, SQLException{
        /*--------------------获取变量 开始--------------------*/
        JSONObject param=data.getParam();
        int resultCode=0;
        String resultMsg="ok";
        /*--------------------获取变量 完毕--------------------*/
        /*--------------------数据操作 开始--------------------*/
        Db updateDb = new Db("test");
        String sql=data.getParam().getString("sql");
        showDebug("[updateRecord]"+sql);
        updateDb.executeUpdate(sql);
        updateDb.close();
        /*--------------------数据操作 结束--------------------*/
        /*--------------------返回数据 开始--------------------*/
        json.put("result_msg",resultMsg);															//如果发生错误就设置成"error"等
        json.put("result_code",resultCode);														//返回0表示正常，不等于0就表示有错误产生，错误代码
        /*--------------------返回数据 结束--------------------*/
    }

    private String createGetRecordSql(Data data, int module) throws JSONException {
        String sql = "select id,news_ID,title,time,news_url,writer from xm06_news_info where module="+module;

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
        String sql = "select * from xm06_news_comments";
        String id = data.getParam().has("id")?data.getParam().getString("id"):null;
        if(id!=null && !id.isEmpty())
            sql = sql + " where news_id="+id;

        String KeyWords=data.getParam().has("keywords")?data.getParam().getString("keywords"):null;
        if(KeyWords!=null && !KeyWords.isEmpty()){
            if(sql.indexOf("where")>-1){
                sql=sql+" and comment like '%"+KeyWords+"%'";
            }else{
                sql=sql+" where comment like '%"+KeyWords+"%'";
            }
        }

        return sql;
    }

    private String createGetReplySql(Data data) throws JSONException {
        String sql = "";
        int id = data.getParam().has("id")?data.getParam().getInt("id"):0;
        if(id!=0) {
            sql  =sql+"select * from xm06_comment_reply where reply_id in (";
            sql = sql+" select id from xm06_news_comments where news_id="+id+" )";
        }

        return sql;
    }
}

