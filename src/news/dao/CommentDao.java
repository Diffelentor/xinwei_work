package news.dao;

import org.json.JSONException;
import org.json.JSONObject;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.*;

public class CommentDao {
	public void showDebug(String msg){
		System.out.println("["+(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date())+"][device/dao/Db]"+msg);
	}
	/*添加记录*/
	public void addDeviceRecord(Data data, JSONObject json) throws JSONException, SQLException {
		//构造sql语句，根据传递过来的条件参数
		String deviceId=data.getParam().has("device_id")?data.getParam().getString("device_id"):null;
		String deviceName=data.getParam().has("device_name")?data.getParam().getString("device_name"):null;
		if(deviceId!=null && deviceName!=null){
			String sql="insert into device_file(device_id,device_name)";
			sql=sql+" values('"+deviceId+"'";
			sql=sql+" ,'"+deviceName+"')";
			data.getParam().put("sql",sql);
			updateRecord(data,json);
		}
	}
	/*删除记录*/
	public void deleteDeviceRecord(Data data, JSONObject json) throws JSONException, SQLException{
		//构造sql语句，根据传递过来的条件参数
		String id=data.getParam().has("id")?data.getParam().getString("id"):null;
		if(id!=null){
			String sql="delete from device_file where id="+data.getParam().getString("id");
			data.getParam().put("sql",sql);
			updateRecord(data,json);
		}
	}
	/*修改评论记录*/
	public void modifyCommentRecord(Data data, JSONObject json) throws JSONException, SQLException{
		//构造sql语句，根据传递过来的条件参数
		String id=data.getParam().has("id")?data.getParam().getString("id"):null;
		String Name=data.getParam().has("user_name")?data.getParam().getString("user_name"):null;
		String Comment=data.getParam().has("comment")?data.getParam().getString("comment"):null;
		if(id!=null && Name!=null && Comment!=null && !Name.isEmpty() && !Comment.isEmpty()){
			String sql="update xm06_news_comments";
			sql=sql+" set user_name='"+Name+"'";
			sql=sql+" ,comment='"+Comment+"'";
			sql=sql+" where id="+id;
			data.getParam().put("sql",sql);
			updateRecord(data,json);
		} else {
			int resultCode=10;
			String resultMsg="error!";
			json.put("result_msg",resultMsg);															//如果发生错误就设置成"error"等
			json.put("result_code",resultCode);
		}
	}
	/*查询记录*/
	public void getDeviceRecord(Data data, JSONObject json) throws JSONException, SQLException{
		//构造sql语句，根据传递过来的查询条件参数
		String sql=createGetRecordSql(data);			//构造sql语句，根据传递过来的查询条件参数
		data.getParam().put("sql",sql);
		queryRecord(data,json);
	}

	public void getCommentCountByHour(Data data, JSONObject json) throws JSONException, SQLException{
		String resultMsg = "获取评论计数成功！";
		int resultCode = 0;

		List jsonList = new ArrayList();
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.DATE,-1);
		String timeFrom = (new SimpleDateFormat("yyyy-MM-dd 00:00:00")).format(cal.getTime());
		String timeTo = (new SimpleDateFormat("yyyy-MM-dd 23:59:59")).format(cal.getTime());

		Db queryDb = new Db("test");
		String sql = "select DATE_FORMAT(submit_time,\"%Y-%m-%d %H\") as time_interval,count(*) as total from xm06_news_comments";
		sql = sql +" where submit_time between '2022-12-2 00:00:00' and '2022-12-2 23:59:59' ";
		sql = sql + " group by DATE_FORMAT(submit_time,\"%Y-%m-%d %H\") ";
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

	private String createGetRecordSql(Data data) throws JSONException {
		String sql="select * from device_file";
		String id=data.getParam().has("id")?data.getParam().getString("id"):null;
		if(id!=null && !id.isEmpty())
			sql=sql+" where id="+id;
		String deviceId=data.getParam().has("device_id")?data.getParam().getString("device_id"):null;
		if(deviceId !=null && !deviceId.isEmpty()){
			if(sql.indexOf("where")>-1){
				sql=sql+" and device_id like '%"+deviceId+"%'";
			}else{
				sql=sql+" where device_id like '%"+deviceId+"%'";
			}
		}
		String deviceName=data.getParam().has("device_name")?data.getParam().getString("device_name"):null;
		if(deviceName!=null && !deviceName.isEmpty()){
			if(sql.indexOf("where")>-1){
				sql=sql+" and device_name like '%"+deviceName+"%'";
			}else{
				sql=sql+" where device_name like '%"+deviceName+"%'";
			}
		}
		return sql;
	}

}
