package futures.dao;

import org.json.JSONException;
import org.json.JSONObject;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.*;

public class FuturesDao {
    public void showDebug(String msg) {
        System.out.println("[" + (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date()) + "][device/dao/Db]" + msg);
    }

    public void addFuturesRecord(Data data, JSONObject json) throws JSONException, SQLException {
        //构造sql语句，根据传递过来的条件参数
        String futures_id=data.getParam().has("futures_id")?data.getParam().getString("futures_id"):null;
        String futures_name=data.getParam().has("futures_name")?data.getParam().getString("futures_name"):null;
        String price_today_begin=data.getParam().has("price_today_begin")?data.getParam().getString("price_today_begin"):null;
        String price_yesterday=data.getParam().has("price_yesterday")?data.getParam().getString("price_yesterday"):null;
        String price_right_now=data.getParam().has("price_right_now")?data.getParam().getString("price_right_now"):null;
        String price_high=data.getParam().has("price_high")?data.getParam().getString("price_high"):null;
        String price_low=data.getParam().has("price_low")?data.getParam().getString("price_low"):null;
        String select_time=(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date());
        String date = (new SimpleDateFormat("yyyy-MM-dd")).format(new Date());
        if(futures_id!=null && futures_name!=null && price_today_begin!=null && price_yesterday!=null && price_right_now!=null && price_high!=null && price_low!=null){
            String sql="insert into futures(futures_id,futures_name,price_today_begin,price_yesterday,price_right_now,price_high,price_low,select_time,date)";
            sql=sql+" values('"+futures_id+"'";
            sql=sql+",'"+futures_name+"'";
            sql=sql+",'"+price_today_begin+"'";
            sql=sql+",'"+price_yesterday+"'";
            sql=sql+",'"+price_right_now+"'";
            sql=sql+",'"+price_high+"'";
            sql=sql+",'"+price_low+"'";
            sql=sql+",'"+select_time+"'";
            sql=sql+" ,'"+date+"')";
            data.getParam().put("sql",sql);
            updateRecord(data,json);
        }
    }
    /*删除记录*/
    public void deleteFuturesRecord(Data data, JSONObject json) throws JSONException, SQLException{
        //构造sql语句，根据传递过来的条件参数
        String id=data.getParam().has("id")?data.getParam().getString("id"):null;
        if(id!=null){
            String sql="delete from futures where id="+data.getParam().getString("id");
            data.getParam().put("sql",sql);
            updateRecord(data,json);
        }
    }
    /*修改记录*/
    public void modifyFuturesRecord(Data data, JSONObject json) throws JSONException, SQLException{
        //构造sql语句，根据传递过来的条件参数
        String id=data.getParam().has("id")?data.getParam().getString("id"):null;
        String futures_id=data.getParam().has("futures_id")?data.getParam().getString("futures_id"):null;
        String futures_name=data.getParam().has("futures_name")?data.getParam().getString("futures_name"):null;
        String price_today_begin=data.getParam().has("price_today_begin")?data.getParam().getString("price_today_begin"):null;
        String price_yesterday=data.getParam().has("price_yesterday")?data.getParam().getString("price_yesterday"):null;
        String price_right_now=data.getParam().has("price_right_now")?data.getParam().getString("price_right_now"):null;
        String price_high=data.getParam().has("price_high")?data.getParam().getString("price_high"):null;
        String price_low=data.getParam().has("price_low")?data.getParam().getString("price_low"):null;
        String select_time=(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date());
        String date = (new SimpleDateFormat("yyyy-MM-dd")).format(new Date());
        if(id!=null){
            String sql="update futures";
            sql=sql+" set futures_id='"+futures_id+"'";
            sql=sql+" ,futures_name='"+futures_name+"'";
            sql=sql+" ,price_today_begin='"+price_today_begin+"'";
            sql=sql+" ,price_yesterday='"+price_yesterday+"'";
            sql=sql+" ,price_right_now='"+price_right_now+"'";
            sql=sql+" ,price_high='"+price_high+"'";
            sql=sql+" ,price_low='"+price_low+"'";
            sql=sql+" ,select_time='"+select_time+"'";
            sql=sql+" ,date='"+date+"'";
            sql=sql+" where id="+id;
            data.getParam().put("sql",sql);
            updateRecord(data,json);
        }

    }
    /*查询记录*/
    public void getFuturesRecord(Data data, JSONObject json) throws JSONException, SQLException{
        //构造sql语句，根据传递过来的查询条件参数
        String sql=createGetRecordSql(data);			//构造sql语句，根据传递过来的查询条件参数
        data.getParam().put("sql",sql);
        queryRecord(data,json);
    }

    public void getFutureskline(Data data, JSONObject json) throws JSONException, SQLException {
        String sql=createGetKlineSql(data);			//构造sql语句，根据传递过来的查询条件参数
        data.getParam().put("sql",sql);
        queryRecord(data,json);
    }

    /*
     * 这是一个样板的函数，可以拷贝做修改用
     */
    private void updateRecord(Data data, JSONObject json) throws JSONException, SQLException{
        /*--------------------获取变量 开始--------------------*/
        JSONObject param=data.getParam();
        int resultCode=0;
        String resultMsg="ok";
        /*--------------------获取变量 完毕--------------------*/
        /*--------------------数据操作 开始--------------------*/
        String Dbname = "test";
        Db updateDb = new Db(Dbname);
        String sql=data.getParam().getString("sql");
        //showDebug("[updateRecord]"+sql);
        updateDb.executeUpdate(sql);
        updateDb.close();
        /*--------------------数据操作 结束--------------------*/
        /*--------------------返回数据 开始--------------------*/
        json.put("result_msg",resultMsg);															//如果发生错误就设置成"error"等
        json.put("result_code",resultCode);														//返回0表示正常，不等于0就表示有错误产生，错误代码
        /*--------------------返回数据 结束--------------------*/
    }
    private void queryRecord(Data data, JSONObject json) throws JSONException, SQLException{
        /*--------------------获取变量 开始--------------------*/
        String resultMsg = "ok";
        int resultCode = 0;
        List jsonList = new ArrayList();
        List jsonName=new ArrayList();
        /*--------------------获取变量 完毕--------------------*/
        /*--------------------数据操作 开始--------------------*/
        String Dbname = "test";
        Db queryDb = new Db(Dbname);
        String sql=data.getParam().getString("sql");
        //showDebug("[queryRecord]构造的SQL语句是：" + sql);
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
            for(int i=0;i<rsmd.getColumnCount();i++){
                String columnLabel=rsmd.getColumnLabel(i+1);
                jsonName.add(columnLabel);
            }
        } catch (Exception e) {
            e.printStackTrace();
            //showDebug("[queryRecord]查询数据库出现错误：" + sql);
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
        String date = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
        String sql="select * from futures where date = '" + date +"'";
        String id=data.getParam().has("id")?data.getParam().getString("id"):null;
        if(id!=null && !id.isEmpty()){
            sql=sql+" where id="+id;
        }
        String futuresId=data.getParam().has("futures_id")?data.getParam().getString("futures_id"):null;
        if(futuresId!=null && !futuresId.isEmpty()) {
            if (sql.indexOf("where") > -1) {
                sql = sql + " and futures_id='" + futuresId + "'";
            } else {
                sql = sql + " where futures_id='" + futuresId + "'";
            }
        }
        String futuresName=data.getParam().has("futures_name")?data.getParam().getString("futures_name"):null;
        if(futuresName!=null && !futuresName.isEmpty()){
            if(sql.indexOf("where")>-1){
                sql=sql+" and futures_name like '%"+futuresName+"%'";
            }else{
                sql=sql+" where futures_name like '%"+futuresName+"%'";
            }
        }
        return sql;
    }
    private String createGetKlineSql(Data data) throws JSONException {
        String futures_id=data.getParam().has("futures_id")?data.getParam().getString("futures_id"):null;
        String sql="select price_today_begin,price_right_now,price_high,price_low,date from futures where futures_id='" + futures_id +"'";
        return sql;
    }
}
