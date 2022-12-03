package position.dao;

import org.json.JSONException;
import org.json.JSONObject;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.*;

public class DeviceDao {
	public void showDebug(String msg){
		System.out.println("["+(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date())+"][device/dao/Db]"+msg);
	}
	/*添加记录*/
	public void addDeviceRecord(Data data, JSONObject json) throws JSONException, SQLException {
		//构造sql语句，根据传递过来的条件参数
		String futures_id=data.getParam().has("futures_id")?data.getParam().getString("futures_id"):null;
		String futures_name=data.getParam().has("futures_name")?data.getParam().getString("futures_name"):null;
		String type=data.getParam().has("type")?data.getParam().getString("type"):null;
		String price_bought=data.getParam().has("type")?data.getParam().getString("price_bought"):null;
		String amount=data.getParam().has("amount")?data.getParam().getString("amount"):null;
		String user_name=data.getParam().has("user_name")?data.getParam().getString("user_name"):null;
		String select_time=(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date());
		String forward=data.getParam().has("forward")?data.getParam().getString("forward"):null;
		if(futures_id!=null && futures_name!=null && type!=null && amount!=null && user_name!=null){
			String sql="insert into my_position(futures_id,futures_name,type,price_bought,amount,user_name,select_time,forward)";
			sql=sql+" values('"+futures_id+"'";
			sql=sql+",'"+futures_name+"'";
			sql=sql+",'"+type+"'";
			sql=sql+",'"+price_bought+"'";
			sql=sql+",'"+amount+"'";
			sql=sql+",'"+user_name+"'";
			sql=sql+",'"+select_time+"'";
			sql=sql+" ,'"+forward+"')";
			data.getParam().put("sql",sql);
			updateRecord(data,json);
		}
	}
	/*删除记录*/
	public void deleteDeviceRecord(Data data, JSONObject json) throws JSONException, SQLException{
		//构造sql语句，根据传递过来的条件参数
		String id=data.getParam().has("id")?data.getParam().getString("id"):null;
		if(id!=null){
			String sql="delete from total where id="+data.getParam().getString("id");
			data.getParam().put("sql",sql);
			updateRecord(data,json);
		}
	}
	/*修改记录*/
	public void modifyDeviceRecord(Data data, JSONObject json) throws JSONException, SQLException{
		//构造sql语句，根据传递过来的条件参数
		String id=data.getParam().has("id")?data.getParam().getString("id"):null;
		String futures_id=data.getParam().has("futures_id")?data.getParam().getString("futures_id"):null;
		String futures_name=data.getParam().has("futures_name")?data.getParam().getString("futures_name"):null;
		String type=data.getParam().has("type")?data.getParam().getString("type"):null;
		String price_today_begin=data.getParam().has("price_today_begin")?data.getParam().getString("price_today_begin"):null;
		String price_yesterday=data.getParam().has("price_yesterday")?data.getParam().getString("price_yesterday"):null;
		String price_right_now=data.getParam().has("price_right_now")?data.getParam().getString("price_right_now"):null;
		String price_high=data.getParam().has("price_high")?data.getParam().getString("price_high"):null;
		String price_low=data.getParam().has("price_low")?data.getParam().getString("price_low"):null;
		String select_time=(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date());
		String date = (new SimpleDateFormat("yyyy-MM-dd")).format(new Date());
		if(id!=null){
			String sql="update total";
			sql=sql+" set futures_id='"+futures_id+"'";
			sql=sql+" ,futures_name='"+futures_name+"'";
			sql=sql+" ,type='"+type+"'";
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
	/*查询要下载的记录*/
	public void getDownloadRecord(Data data, JSONObject json) throws JSONException, SQLException{
		//构造sql语句，根据传递过来的查询条件参数
		String sql=createDownloadSql(data);			//构造sql语句，根据传递过来的查询条件参数
		data.getParam().put("sql",sql);
		queryRecord(data,json);
	}
	/*查询记录*/
	public void getDeviceRecord(Data data, JSONObject json) throws JSONException, SQLException{
		//构造sql语句，根据传递过来的查询条件参数
		String sql=createGetRecordSql(data);			//构造sql语句，根据传递过来的查询条件参数
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
	private void queryRecord(Data data, JSONObject json) throws JSONException, SQLException{
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

	private String createDownloadSql(Data data) throws JSONException {
		String sql="select M.futures_id,M.futures_name,M.type,M.price_bought,T.price_right_now,M.amount,M.forward from my_position M,total T where M.futures_id=T.futures_id and M.forward='开仓'";
		String id=data.getParam().has("id")?data.getParam().getString("id"):null;
		if(id!=null && !id.isEmpty()){
			sql=sql+" and id="+id;
		}
		String futuresId=data.getParam().has("futures_id")?data.getParam().getString("futures_id"):null;
		if(futuresId!=null && !futuresId.isEmpty()) {
			if (sql.indexOf("where") > -1) {
				sql = sql + " and M.futures_id='" + futuresId + "'";
			} else {
				sql = sql + " where M.futures_id='" + futuresId + "'";
			}
		}
		String futuresName=data.getParam().has("futures_name")?data.getParam().getString("futures_name"):null;
		if(futuresName!=null && !futuresName.isEmpty()){
			if(sql.indexOf("where")>-1){
				sql=sql+" and M.futures_name like '%"+futuresName+"%'";
			}else{
				sql=sql+" where M.futures_name like '%"+futuresName+"%'";
			}
		}
		String user_name=data.getParam().has("user_name")?data.getParam().getString("user_name"):null;
		if(user_name!=null && !user_name.isEmpty()){
			if(sql.indexOf("where")>-1){
				sql=sql+" and M.user_name="+user_name+"'";
			}else{
				sql=sql+" where M.user_name="+user_name+"'";
			}
		}
		String orderBy=data.getParam().has("order_by")?data.getParam().getString("order_by"):null;
		if(orderBy!=null && !orderBy.isEmpty()){
			sql=sql+" order by "+orderBy;
		}
		return sql;
	}

	private String createGetRecordSql(Data data) throws JSONException {
		String sql="select * from my_position M,total T where M.futures_id=T.futures_id and forward='开仓'";
		String id=data.getParam().has("id")?data.getParam().getString("id"):null;
		if(id!=null && !id.isEmpty()){
			sql=sql+" and id="+id;
		}
		String futuresId=data.getParam().has("futures_id")?data.getParam().getString("futures_id"):null;
		if(futuresId!=null && !futuresId.isEmpty()) {
			if (sql.indexOf("where") > -1) {
				sql = sql + " and M.futures_id='" + futuresId + "'";
			} else {
				sql = sql + " where M.futures_id='" + futuresId + "'";
			}
		}
		String futuresName=data.getParam().has("futures_name")?data.getParam().getString("futures_name"):null;
		if(futuresName!=null && !futuresName.isEmpty()){
			if(sql.indexOf("where")>-1){
				sql=sql+" and M.futures_name like '%"+futuresName+"%'";
			}else{
				sql=sql+" where M.futures_name like '%"+futuresName+"%'";
			}
		}
		String user_name=data.getParam().has("user_name")?data.getParam().getString("user_name"):null;
		if(user_name!=null && !user_name.isEmpty()){
			if(sql.indexOf("where")>-1){
				sql=sql+" and M.user_name like '%"+user_name+"%'";
			}else{
				sql=sql+" where M.user_name like '%"+user_name+"%'";
			}
		}
		String orderBy=data.getParam().has("order_by")?data.getParam().getString("order_by"):null;
		if(orderBy!=null && !orderBy.isEmpty()){
			sql=sql+" order by "+orderBy;
		}
		return sql;
	}

	//注意复制过来的时候类名会出现前缀，要删了。
	public void getAmplitudeByFuturesId(Data data, JSONObject json) throws JSONException, SQLException{
		/*--------------------获取变量 开始--------------------*/
		String resultMsg = "ok";
		int resultCode = 0;
		List jsonList = new ArrayList();
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.DATE,-1);
		String user_name=data.getParam().has("user_name")?data.getParam().getString("user_name"):null;
		String timeFrom="2015-09-20 00:00:00";
		String timeTo="2035-09-21 15:39:51";
//		String timeFrom=(new SimpleDateFormat("yyyy-MM-dd 00:00:00")).format(new Date());
//		String timeTo=(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date());
		/*--------------------获取变量 完毕--------------------*/
		/*--------------------数据操作 开始--------------------*/
		Db queryDb = new Db("test");
		String sql="SELECT (T.price_right_now-M.price_bought)*M.amount as earnings,M.futures_name FROM my_position M,total T";
		sql+= " where M.futures_id=T.futures_id and M.forward='开仓' and M.user_name='"+user_name+"' and M.select_time BETWEEN '"+timeFrom+"' and '"+timeTo+"'";
		showDebug("[queryRecord]构造的SQL语句是：" + sql);
		try {
			ResultSet rs = queryDb.executeQuery(sql);
			ResultSetMetaData rsmd = rs.getMetaData();
			int fieldCount = rsmd.getColumnCount();
			while (rs.next()) {
				//有一堆数据的话就就先put到一个map里面，最后把这个map add到一个List里，最后把这个List放到一个JSON里
				Map map = new HashMap();
				map.put("earnings",rs.getString("earnings"));
				map.put("futures_name",rs.getString("futures_name"));
				//map add进去自带一个大括号
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
}
