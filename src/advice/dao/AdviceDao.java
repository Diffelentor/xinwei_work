package advice.dao;

import org.json.JSONException;
import org.json.JSONObject;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.*;

public class AdviceDao {
    public void showDebug(String msg){
        System.out.println("["+(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date())+"][advice/dao/Db]"+msg);
    }
    /*添加记录*/
    public void addAdviceRecord(Data data, JSONObject json) throws JSONException, SQLException {
        //构造sql语句，根据传递过来的条件参数
        String username=data.getParam().has("username")?data.getParam().getString("username"):null;
        String content=data.getParam().has("content")?data.getParam().getString("content"):null;
        String date=(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date());
        if(username!=null && content!=null){
            String sql="insert into xm06_advice_file(username,content,release_time)";
            sql=sql+" values('"+username+"'";
            sql=sql+" ,'"+content+"'";
            sql=sql+",'"+date+"')";
            data.getParam().put("sql",sql);
            updateRecord(data,json);
        }
    }
    /*删除记录*/
    public void deleteAdviceRecord(Data data,JSONObject json) throws JSONException, SQLException{
        //构造sql语句，根据传递过来的条件参数
        String advice_id=data.getParam().has("advice_id")?data.getParam().getString("advice_id"):null;
        if(advice_id!=null){
            String sql="delete from xm06_advice_file where advice_id="+data.getParam().getString("advice_id");
            data.getParam().put("sql",sql);
            updateRecord(data,json);
        }
    }
    /*修改记录*/
    public void modifyAdviceRecord(Data data,JSONObject json) throws JSONException, SQLException{
        //构造sql语句，根据传递过来的条件参数
        String advice_id=data.getParam().has("advice_id")?data.getParam().getString("advice_id"):null;
        String content=data.getParam().has("content")?data.getParam().getString("content"):null;

        if(advice_id!=null){
            String sql="update xm06_advice_file";
            sql=sql+" set content='"+content+"'";
            sql=sql+" where advice_id="+advice_id;
            data.getParam().put("sql",sql);
            updateRecord(data,json);
        }
    }

    public void updateReplyRecord(Data data,JSONObject json) throws JSONException, SQLException{
        //构造sql语句，根据传递过来的条件参数
        String advice_id=data.getParam().has("advice_id")?data.getParam().getString("advice_id"):null;
        String reply=data.getParam().has("reply")?data.getParam().getString("reply"):null;
        String date=(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date());
        if(advice_id!=null){
            String sql="update xm06_advice_file";
            sql=sql+" set reply='"+reply+"',reply_time='"+date+"'";
            sql=sql+" where advice_id="+advice_id;
            data.getParam().put("sql",sql);
            updateRecord(data,json);
        }
    }

    /*查询记录*/
    public void getAdviceRecord(Data data,JSONObject json) throws JSONException, SQLException{
        //构造sql语句，根据传递过来的查询条件参数
        String sql=createGetRecordSql(data);			//构造sql语句，根据传递过来的查询条件参数
        data.getParam().put("sql",sql);
        queryRecord(data,json);
    }
    /*
     * 这是一个样板的函数，可以拷贝做修改用
     */
    private void updateRecord(Data data,JSONObject json) throws JSONException, SQLException{
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


    public void getcountisreplied(Data data, JSONObject json) throws JSONException, SQLException{
        /*--------------------获取变量 开始--------------------*/
        String resultMsg = "ok";
        int resultCode = 0;
        int count_question=0;
        int count_answer=0;
        List jsonList = new ArrayList();
        List jsonName=new ArrayList();
        /*--------------------获取变量 完毕--------------------*/
        /*--------------------数据操作 开始--------------------*/
        Db queryDb = new Db("test");
        String sql="select count(content) as count_question,count(reply) as count_answer from xm06_advice_file";
        showDebug("[queryRecord]构造的SQL语句是：" + sql);
        try {
            ResultSet rs = queryDb.executeQuery(sql);
            while(rs.next()){
//				Object object = rs.getObject("1");
                count_question = rs.getInt("count_question");
                count_answer = rs.getInt("count_answer");
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
        json.put("count_question",count_question);
        json.put("count_answer",count_answer);
        json.put("result_msg",resultMsg);															//如果发生错误就设置成"error"等
        json.put("result_code",resultCode);														//返回0表示正常，不等于0就表示有错误产生，错误代码
        /*--------------------返回数据 结束--------------------*/
    }

    private void queryRecord(Data data,JSONObject json) throws JSONException, SQLException{
        /*--------------------获取变量 开始--------------------*/
        String resultMsg = "ok";
        int resultCode = 0;
        List jsonList = new ArrayList();
        List jsonName=new ArrayList();
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
            for(int i=0;i<rsmd.getColumnCount();i++){
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

    private String createGetRecordSql(Data data) throws JSONException {
        String sql="select * from xm06_advice_file";
        String advice_id=data.getParam().has("advice_id")?data.getParam().getString("advice_id"):null;
        if(advice_id!=null && !advice_id.isEmpty()) {
            sql = sql + " where advice_id=" + advice_id;
        }
        String username=data.getParam().has("username")?data.getParam().getString("username"):null;
        if(username!=null && !username.isEmpty()){
            if(sql.indexOf("where")>-1){
                sql=sql+" and username like '%"+username+"%'";
            }else{
                sql=sql+" where username like '%"+username+"%'";
            }
        }
        String keyword=data.getParam().has("keyword")?data.getParam().getString("keyword"):null;
        if(keyword!=null && !keyword.isEmpty()){
            if(sql.indexOf("where")>-1){
                sql=sql+" and (content like '%"+keyword+"%' or reply like '%"+keyword+"%')";
            }else{
                sql=sql+" where (content like '%"+keyword+"%' or reply like '%"+keyword+"%')";
            }
        }
        return sql;
    }
}

