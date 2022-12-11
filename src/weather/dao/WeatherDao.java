package weather.dao;

import org.json.JSONException;
import org.json.JSONObject;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.*;

public class WeatherDao {
	public void showDebug(String msg){
		System.out.println("["+(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date())+"][device/dao/Db]"+msg);
	}
	/*删除记录*/
	public void deleteWeatherRecord(Data data, JSONObject json) throws JSONException, SQLException{
		//构造sql语句，根据传递过来的条件参数
		String id=data.getParam().has("id")?data.getParam().getString("id"):null;
		if(id!=null){
			String sql="delete from weather where id in ("+id+")";
			data.getParam().put("sql",sql);
			updateRecord(data,json);
		}
	}
	/*修改记录*/
	public void modifyWeatherRecord(Data data, JSONObject json) throws JSONException, SQLException{
		//构造sql语句，根据传递过来的条件参数
		String id=data.getParam().has("id")?data.getParam().getString("id"):null;
		String city=data.getParam().has("city")?data.getParam().getString("city"):null;
		String temperature=data.getParam().has("temperature")?data.getParam().getString("temperature"):null;
		String humidity=data.getParam().has("humidity")?data.getParam().getString("humidity"):null;
		String wind=data.getParam().has("wind")?data.getParam().getString("wind"):null;
		if(id!=null){
			String sql="update weather";
			sql=sql+" set city='"+city+"'";
			sql=sql+" ,temperature='"+temperature+"'";
			sql=sql+" ,humidity='"+humidity+"'";
			sql=sql+" ,wind='"+wind+"'";
			sql=sql+" where id="+id;
			data.getParam().put("sql",sql);
			updateRecord(data,json);
		}
	}
	/*查询记录*/
	public void getWeatherRecord(Data data, JSONObject json) throws JSONException, SQLException{
		//构造sql语句，根据传递过来的查询条件参数
		String sql=createGetRecordSql(data);			//构造sql语句，根据传递过来的查询条件参数
		data.getParam().put("sql",sql);
		queryRecord(data,json);
	}

	public void getWeatherStatisData(JSONObject json) throws JSONException, SQLException{
		String resultMsg = "ok";
		int resultCode = 0;
		List<String> xDataList = new ArrayList();
		List<Integer> yDataList = new ArrayList();
		JSONObject jsonObject = new JSONObject();
		SimpleDateFormat minuteFOrmate = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date nowTime = new Date();
		/*--------------------获取变量 完毕--------------------*/
		/*--------------------数据操作 开始--------------------*/
		Db queryDb = new Db("test");
		try {
			for(int i=6;i>=0;i--){
				Date startTime = getBeforeTime(nowTime,i,true);
				Date endTime = getBeforeTime(nowTime,i,false);
				int count = getWeatherCount(queryDb,format.format(startTime),format.format(endTime));
				xDataList.add(minuteFOrmate.format(startTime));
				yDataList.add(count);
			}
			jsonObject.put("xData",xDataList);
			jsonObject.put("yData",yDataList);
		}catch (Exception e){
			e.printStackTrace();
		}finally {
			queryDb.close();
		}
		json.put("data",jsonObject);
		json.put("result_msg",resultMsg);															//如果发生错误就设置成"error"等
		json.put("result_code",resultCode);
	}

	public int getWeatherCount(Db db,String startTime,String endTime){
		int count = 0;
		try {
			String sql = "select count(id) from weather where create_time between '"+startTime+"' and '"+endTime+"'";
			ResultSet rs = db.executeQuery(sql);
			while (rs.next()) {
				count = rs.getInt(1);
			}
			rs.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return count;
	}



	public static Date getBeforeTime(Date date,int minute,boolean start){
		Calendar beforeTime = Calendar.getInstance();
		beforeTime.setTime(date);
		beforeTime.add(Calendar.DAY_OF_MONTH, -minute);// minute分钟之前的时间
		// 秒
		if(start){
			beforeTime.set(Calendar.MINUTE,0);
			beforeTime.set(Calendar.HOUR_OF_DAY,0);
			beforeTime.set(Calendar.SECOND, 0);
		} else {
			beforeTime.set(Calendar.MINUTE,59);
			beforeTime.set(Calendar.HOUR_OF_DAY,23);
			beforeTime.set(Calendar.SECOND, 59);
		}
		Date beforeD = beforeTime.getTime();
		return beforeD;
	}

	public static Date getEndTime(Date date,int minute,boolean start){
		Calendar beforeTime = Calendar.getInstance();
		beforeTime.setTime(date);
		beforeTime.add(Calendar.MINUTE, minute);// minute分钟之前的时间
		// 秒
		if(start){
			beforeTime.set(Calendar.SECOND, 0);
		} else {
			beforeTime.set(Calendar.SECOND, 59);
		}
		Date beforeD = beforeTime.getTime();
		return beforeD;
	}

	public static void main(String[] args) {
		Date date = new Date();
		Date oneHourDate = getBeforeTime(date,60,false);
		System.out.println(date);
		System.out.println(oneHourDate);
		for(int i=0;i<10;i++){
			Date startTime = getEndTime(oneHourDate,i*6,true);
			Date endTime = getEndTime(startTime,5,false);
			System.out.println(startTime+"===="+endTime);
		}
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

	private String createGetRecordSql(Data data) throws JSONException {
		String sql="select * from weather";
		String id=data.getParam().has("id")?data.getParam().getString("id"):null;
		if(id!=null && !id.isEmpty()) {
			sql = sql + " where id=" + id;
		}
		String city=data.getParam().has("city")?data.getParam().getString("city"):null;
		if(city!=null && !city.isEmpty()){
			if(sql.indexOf("where")>-1){
				sql=sql+" and city like '%"+city+"%'";
			}else{
				sql=sql+" where city like '%"+city+"%'";
			}
		}
		String ids=data.getParam().has("ids")?data.getParam().getString("ids"):null;
		if(ids!=null && !ids.isEmpty()){
			if(sql.indexOf("where")>-1){
				sql=sql+" and id in ("+ids+")";
			}else{
				sql=sql+" where id in ("+ids+")";
			}
		}
		sql = sql+" order by create_time desc";
		String limit=data.getParam().has("limit")?data.getParam().getString("limit"):null;
		if(limit!=null){
			sql = sql+" limit 1";
		}
		return sql;
	}
}
