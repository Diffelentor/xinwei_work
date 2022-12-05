package exchanges.dao;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

public class GetExchangesData implements ServletContextListener{
    private Timer timer = null;
    private TimerTask task = null;
    ServletContext data;
    @Override
    public void contextDestroyed(ServletContextEvent context) {
        System.out.println("生命周期结束!");
    }

    @Override
    public void contextInitialized(ServletContextEvent context) {
        data = context.getServletContext();
        // 上下文初始化执行
        //System.out.println("================>[ServletContextListener]自动加载启动开始.");
        timer = new Timer(true);
        MyTimerTask task = new MyTimerTask();
        timer.schedule(task,2000,10000); //延迟2s，每隔10s执行
        System.out.println("[GetExchangesData]运行了");
    }

    public class MyTimerTask extends TimerTask{
        private StringBuffer out;
        @Override
        public void run(){
            Calendar calendar = Calendar.getInstance();
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-DD HH:mm:ss");
            /*目标外汇列表*/
            String[] exchanges_list = new String[]{"USDCNY","EURCNY","CNYJPY","GBPCNY","HKDCNY","DINIW"};

            System.out.println("Current Time："+new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));//获取当前系统时间
            System.out.println("开始定时获取外汇数据");
            try {
                for (String exchange_id : exchanges_list){
                    GetExchanges_and_store(exchange_id);
                }
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

    private void GetExchanges_and_store(String exchange_id) throws SQLException {
        String dbname = "test";
        Db updateDb = new Db(dbname);

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder(URI.create("https://hq.sinajs.cn/list="+exchange_id))
                .setHeader("Referer", "https://finance.sina.com.cn")
                .build();
        HttpResponse<String> response = null;
        try {
            response = client.send(request, HttpResponse.BodyHandlers.ofString());
        } catch (
                IOException e) {
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        String body = response.body();
        String[] infoStrings = body.split("\"");
        String[] infoArray = infoStrings[1].split(",");

        String name = infoArray[9];
        String time = infoArray[10] + " " + infoArray[0];
        String date = infoArray[10];
        double price_today_begin = Double.valueOf(infoArray[5]);
        double price_yesterday = Double.valueOf(infoArray[6]);
        double price_right_now = Double.valueOf(infoArray[1]);
        double price_high = Double.valueOf(infoArray[7]);
        double price_low = Double.valueOf(infoArray[8]);

        String sql = "";
        int count = 0;
        String check_if_exist = "select count(*) as total from exchanges where exchanges_id = '" + exchange_id +"' and date = '" + date +"'";
        try{
            ResultSet rs = updateDb.executeQuery(check_if_exist);
            while(rs.next()){
                count = (rs.getInt(1));
                //System.out.println("是否存在验证完成！");
            }
        }catch(Exception e){
            System.out.println(e);
        }
        /*第一次录入则插入记录*/
        if (count == 0){
            sql = "insert into exchanges(exchanges_id,exchanges_name,price_today_begin,price_yesterday,price_right_now,price_high,price_low,select_time,date)";
            sql += " values('" + exchange_id + "'" + " ,'" + name + "'" + " ,'" + price_today_begin + "'" + " ,'" + price_yesterday + "'" + " ,'" + price_right_now + "'" + " ,'" + price_high + "'" + " ,'" + price_low + "'" + " ,'" + time + "'" +" ,'" + date +"')";
        }
        /*非第一次则修改记录*/
        else{
            sql = "update exchanges set price_today_begin='"+price_today_begin+"'";
            sql += " ,price_yesterday='"+price_yesterday+"'";
            sql += " ,price_right_now='"+price_right_now+"'";
            sql += " ,price_high='"+price_high+"'";
            sql += " ,price_low='"+price_low+"'";
            sql += " ,select_time='"+time+"'";
            sql += " where exchanges_id='"+ exchange_id +"'";
            sql += " and date='" + date + "'";
        }
        updateDb.executeUpdate(sql);
        /*total表*/
        String sql_total = "";
        count = 0;
        String check_if_exist_total = "select count(*) as total from total where futures_id = '" + exchange_id + "'";
        try{
            ResultSet rs = updateDb.executeQuery(check_if_exist_total);
            while(rs.next()){
                count = (rs.getInt(1));
                //System.out.println("是否存在验证完成！");
            }
        }catch(Exception e){
            System.out.println(e);
        }
        /*第一次录入则插入记录*/
        if (count == 0){
            sql_total = "insert into total(futures_id,futures_name,type,price_today_begin,price_yesterday,price_right_now,price_high,price_low,select_time)";
            sql_total += " values('" + exchange_id + "'" + " ,'" + name + "'" + " ,'外汇' ,'" + price_today_begin + "'" + " ,'" + price_yesterday + "'" + " ,'" + price_right_now + "'" + " ,'" + price_high + "'" + " ,'" + price_low + "'" + " ,'" + time + "')";
        }
        /*非第一次则修改记录*/
        else{
            sql_total = "update total set price_today_begin='"+price_today_begin+"'";
            sql_total += " ,price_yesterday='"+price_yesterday+"'";
            sql_total += " ,price_right_now='"+price_right_now+"'";
            sql_total += " ,price_high='"+price_high+"'";
            sql_total += " ,price_low='"+price_low+"'";
            sql_total += " ,select_time='"+time+"'";
            sql_total += " where futures_id='"+ exchange_id +"'";
        }
        updateDb.executeUpdate(sql_total);
        updateDb.close();
    }
}
