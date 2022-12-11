package complain.dao;

import org.json.JSONException;
import org.json.JSONObject;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.*;

public class ComplainDao {
    public void showDebug(String msg){
        System.out.println("["+(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date())+"][complain/dao/Db]"+msg);
    }
    /*添加记录*/
    public void addComplainRecord(Data data, JSONObject json) throws JSONException, SQLException {
        //构造sql语句，根据传递过来的条件参数
        String username=data.getParam().has("username")?data.getParam().getString("username"):null;
        String question=data.getParam().has("question")?data.getParam().getString("question"):null;
        if(username!=null && question!=null){
            String sql="insert into xm06_complain_file(username,question)";
            sql=sql+" values('"+username+"'";
            sql=sql+" ,'"+question+"')";
            data.getParam().put("sql",sql);
            updateRecord(data,json);
        }
    }
    /*删除记录*/
    public void deleteComplainRecord(Data data,JSONObject json) throws JSONException, SQLException{
        //构造sql语句，根据传递过来的条件参数
        String complain_id=data.getParam().has("complain_id")?data.getParam().getString("complain_id"):null;
        if(complain_id!=null){
            String sql="delete from xm06_complain_file where complain_id="+data.getParam().getString("complain_id");
            data.getParam().put("sql",sql);
            updateRecord(data,json);
        }
    }
    /*修改记录*/
    public void modifyComplainRecord(Data data,JSONObject json) throws JSONException, SQLException{
        //构造sql语句，根据传递过来的条件参数
        String complain_id=data.getParam().has("complain_id")?data.getParam().getString("complain_id"):null;
        String question=data.getParam().has("question")?data.getParam().getString("question"):null;

        if(complain_id!=null){
            String sql="update xm06_complain_file";
            sql=sql+" set question='"+question+"'";
            sql=sql+" where complain_id="+complain_id;
            data.getParam().put("sql",sql);
            updateRecord(data,json);
        }
    }

    public void updateReplyRecord(Data data,JSONObject json) throws JSONException, SQLException{
        //构造sql语句，根据传递过来的条件参数
        String complain_id=data.getParam().has("complain_id")?data.getParam().getString("complain_id"):null;
        String answer=data.getParam().has("answer")?data.getParam().getString("answer"):null;

        if(complain_id!=null){
            String sql="update xm06_complain_file";
            sql=sql+" set answer='"+answer+"'";
            sql=sql+" where complain_id="+complain_id;
            data.getParam().put("sql",sql);
            updateRecord(data,json);
        }
    }

    /*查询记录*/
    public void getComplainRecord(Data data,JSONObject json) throws JSONException, SQLException{
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
        String sql="select count(question) as count_question,count(answer) as count_answer from xm06_complain_file";
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
        String sql="select * from xm06_complain_file";
        String complain_id=data.getParam().has("complain_id")?data.getParam().getString("complain_id"):null;
        if(complain_id!=null && !complain_id.isEmpty()) {
            sql = sql + " where complain_id=" + complain_id;
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
                sql=sql+" and (question like '%"+keyword+"%' or answer like '%"+keyword+"%')";
            }else{
                sql=sql+" where (question like '%"+keyword+"%' or answer like '%"+keyword+"%')";
            }
        }
        return sql;
    }
}

