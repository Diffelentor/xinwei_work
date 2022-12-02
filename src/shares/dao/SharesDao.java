package shares.dao;

import org.json.JSONException;
import org.json.JSONObject;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
<<<<<<< Updated upstream
=======
import java.time.LocalTime;
>>>>>>> Stashed changes
import java.util.*;

public class SharesDao {
    public void showDebug(String msg) {
        System.out.println("[" + (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date()) + "][shares/dao/Db]" + msg);
    }
<<<<<<< Updated upstream
    public void addSharesRecord(Data data, JSONObject json) throws JSONException, SQLException {
        //构造sql语句，根据传递过来的条件参数
        String shares_id=data.getParam().has("shares_id")?data.getParam().getString("futures_id"):null;
        String shares_name=data.getParam().has("shares_name")?data.getParam().getString("futures_name"):null;
        String price_today_begin=data.getParam().has("price_today_begin")?data.getParam().getString("price_today_begin"):null;
        String price_yesterday=data.getParam().has("price_yesterday")?data.getParam().getString("price_yesterday"):null;
=======
    public String determine_date(){
        String date = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
        /*获取昨日日期*/
        Date today = new Date(System.currentTimeMillis() - 1000 * 60 * 60 * 24);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String yesterday = simpleDateFormat.format(today);//获取昨天日期

        /*解决在00:00-09:00间无法查询数据的问题*/
        LocalTime time = LocalTime.of(9, 00,00);
        LocalTime currentTime = LocalTime.now().withNano(0);

        if (currentTime.isBefore(time)) {
            // 日期设置为昨日
            date = yesterday;
        }
        return date;
    }
    public void addSharesRecord(Data data, JSONObject json) throws JSONException, SQLException {
        //构造sql语句，根据传递过来的条件参数
        String shares_id=data.getParam().has("shares_id")?data.getParam().getString("shares_id"):null;
        String shares_name=data.getParam().has("shares_name")?data.getParam().getString("shares_name"):null;
        String price_today_begin=data.getParam().has("price_today_begin")?data.getParam().getString("price_today_begin"):null;
        String price_pre=data.getParam().has("price_pre")?data.getParam().getString("price_pre"):null;
>>>>>>> Stashed changes
        String price_right_now=data.getParam().has("price_right_now")?data.getParam().getString("price_right_now"):null;
        String price_high=data.getParam().has("price_high")?data.getParam().getString("price_high"):null;
        String price_low=data.getParam().has("price_low")?data.getParam().getString("price_low"):null;
        String select_time=(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date());
<<<<<<< Updated upstream
        String date = (new SimpleDateFormat("yyyy-MM-dd")).format(new Date());
        if(shares_id!=null && shares_name!=null && price_today_begin!=null && price_yesterday!=null && price_right_now!=null && price_high!=null && price_low!=null){
            String sql="insert into futures(futures_id,futures_name,price_today_begin,price_yesterday,price_right_now,price_high,price_low,select_time,date)";
            sql=sql+" values('"+shares_id+"'";
            sql=sql+",'"+shares_name+"'";
            sql=sql+",'"+price_today_begin+"'";
            sql=sql+",'"+price_yesterday+"'";
=======
        String date = determine_date();
        if(shares_id!=null && shares_name!=null && price_today_begin!=null && price_pre!=null && price_right_now!=null && price_high!=null && price_low!=null){
            String sql="insert into shares(shares_id,shares_name,price_today_begin,price_pre,price_right_now,price_high,price_low,select_time,date)";
            sql=sql+" values('"+shares_id+"'";
            sql=sql+",'"+shares_name+"'";
            sql=sql+",'"+price_today_begin+"'";
            sql=sql+",'"+price_pre+"'";
>>>>>>> Stashed changes
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
    public void deleteSharesRecord(Data data, JSONObject json) throws JSONException, SQLException{
        //构造sql语句，根据传递过来的条件参数
<<<<<<< Updated upstream
        String id=data.getParam().has("id")?data.getParam().getString("id"):null;
        if(id!=null){
            String sql="delete from shares where id="+data.getParam().getString("id");
=======
        String shares_id=data.getParam().has("shares_id")?data.getParam().getString("shares_id"):null;
        String date = determine_date();
        if(shares_id!=null){
            String sql="delete from shares where shares_id='"+shares_id +"' and date ='" + date +"'";
>>>>>>> Stashed changes
            data.getParam().put("sql",sql);
            updateRecord(data,json);
        }
    }
    /*修改记录*/
    public void modifySharesRecord(Data data, JSONObject json) throws JSONException, SQLException{
        //构造sql语句，根据传递过来的条件参数
<<<<<<< Updated upstream
        String id=data.getParam().has("id")?data.getParam().getString("id"):null;
        String shares_id=data.getParam().has("shares_id")?data.getParam().getString("futures_id"):null;
        String shares_name=data.getParam().has("shares_name")?data.getParam().getString("futures_name"):null;
        String price_today_begin=data.getParam().has("price_today_begin")?data.getParam().getString("price_today_begin"):null;
        String price_yesterday=data.getParam().has("price_yesterday")?data.getParam().getString("price_yesterday"):null;
=======
        String shares_id=data.getParam().has("shares_id")?data.getParam().getString("shares_id"):null;
        String shares_name=data.getParam().has("shares_name")?data.getParam().getString("shares_name"):null;
        String price_today_begin=data.getParam().has("price_today_begin")?data.getParam().getString("price_today_begin"):null;
        String price_pre=data.getParam().has("price_pre")?data.getParam().getString("price_pre"):null;
>>>>>>> Stashed changes
        String price_right_now=data.getParam().has("price_right_now")?data.getParam().getString("price_right_now"):null;
        String price_high=data.getParam().has("price_high")?data.getParam().getString("price_high"):null;
        String price_low=data.getParam().has("price_low")?data.getParam().getString("price_low"):null;
        String select_time=(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date());
<<<<<<< Updated upstream
        String date = (new SimpleDateFormat("yyyy-MM-dd")).format(new Date());
        if(id!=null){
            String sql="update futures";
            sql=sql+" set futures_id='"+shares_id+"'";
            sql=sql+" ,futures_name='"+shares_name+"'";
            sql=sql+" ,price_today_begin='"+price_today_begin+"'";
            sql=sql+" ,price_yesterday='"+price_yesterday+"'";
=======
        String date = determine_date();
        if(shares_id!=null){
            String sql="update shares";
            sql=sql+" set shares_id='"+shares_id+"'";
            sql=sql+" ,shares_name='"+shares_name+"'";
            sql=sql+" ,price_today_begin='"+price_today_begin+"'";
            sql=sql+" ,price_pre='"+price_pre+"'";
>>>>>>> Stashed changes
            sql=sql+" ,price_right_now='"+price_right_now+"'";
            sql=sql+" ,price_high='"+price_high+"'";
            sql=sql+" ,price_low='"+price_low+"'";
            sql=sql+" ,select_time='"+select_time+"'";
            sql=sql+" ,date='"+date+"'";
<<<<<<< Updated upstream
            sql=sql+" where id="+id;
=======
            sql=sql+" where shares_id ='"+shares_id+"'";
            sql=sql+" and date='" + date +"'";
>>>>>>> Stashed changes
            data.getParam().put("sql",sql);
            updateRecord(data,json);
        }

    }
    /*查询记录*/
    public void getSharesRecord(Data data, JSONObject json) throws JSONException, SQLException{
        //构造sql语句，根据传递过来的查询条件参数
        String sql=createGetRecordSql(data);			//构造sql语句，根据传递过来的查询条件参数
        data.getParam().put("sql",sql);
        queryRecord(data,json);
    }

    public void getShareskline(Data data, JSONObject json) throws JSONException, SQLException {
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
        showDebug("[updateRecord]"+sql);
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
<<<<<<< Updated upstream
        //showDebug("[queryRecord]构造的SQL语句是：" + sql);
=======
        showDebug("[queryRecord]构造的SQL语句是：" + sql);
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

    private String createGetRecordSql(Data data) throws JSONException {
        String date = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
=======
    private String createGetRecordSql(Data data) throws JSONException {
        String date = determine_date();
>>>>>>> Stashed changes
        String sql="select * from shares where date = '" + date +"'";
        String id=data.getParam().has("id")?data.getParam().getString("id"):null;
        if(id!=null && !id.isEmpty()){
            sql=sql+" where id="+id;
        }
        String sharesId=data.getParam().has("shares_id")?data.getParam().getString("shares_id"):null;
        if(sharesId!=null && !sharesId.isEmpty()) {
            if (sql.indexOf("where") > -1) {
                sql = sql + " and shares_id='" + sharesId + "'";
            } else {
                sql = sql + " where shares_id='" + sharesId + "'";
            }
        }
        String sharesName=data.getParam().has("shares_name")?data.getParam().getString("shares_name"):null;
        if(sharesName!=null && !sharesName.isEmpty()){
            if(sql.indexOf("where")>-1){
                sql=sql+" and shares_name like '%"+sharesName+"%'";
            }else{
                sql=sql+" where shares_name like '%"+sharesName+"%'";
            }
        }
        return sql;
    }
    private String createGetKlineSql(Data data) throws JSONException {
        String shares_id=data.getParam().has("shares_id")?data.getParam().getString("shares_id"):null;
        String sql="select price_today_begin,price_right_now,price_high,price_low,date from shares where shares_id='" + shares_id +"'";
        return sql;
    }
}