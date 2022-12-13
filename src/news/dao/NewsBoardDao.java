package news.dao;

import org.json.JSONException;
import org.json.JSONObject;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.text.SimpleDateFormat;
import java.util.*;

public class NewsBoardDao {
    public void showDebug(String msg){
        System.out.println("["+(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date())+"][device/dao/Db]"+msg);
    }

    //========================查询驾驶舱界面最新热点新闻记录========================
    public void getZXRDRecord(Data data, JSONObject json) throws JSONException {
        String sql = createSql(data,1);
        data.getParam().put("sql",sql);
        queryRecord(data,json);
    }
    //========================查询驾驶舱界面最新热点新闻记录========================
    public void getCJXWRecord(Data data, JSONObject json) throws JSONException {
        String sql = createSql(data,2);
        data.getParam().put("sql",sql);
        queryRecord(data,json);
    }
    //========================查询驾驶舱界面最新热点新闻记录========================
    public void getGJXWRecord(Data data, JSONObject json) throws JSONException {
        String sql = createSql(data,3);
        data.getParam().put("sql",sql);
        queryRecord(data,json);
    }

    //========================公共函数开始================
    private void queryRecord(Data data, JSONObject json) throws JSONException {
        /*--------------------获取变量 开始--------------------*/
        String resultMsg = "ok";
        int resultCode = 0;
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

    private String createSql(Data data, int module) throws JSONException {
        String sql = "select id,title,time from xm06_news_info where module="+module;
        sql = sql+" order by id desc limit 5";
        return sql;
    }
}
