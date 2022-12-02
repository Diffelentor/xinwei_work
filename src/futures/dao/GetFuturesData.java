package futures.dao;

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

public class GetFuturesData implements ServletContextListener{
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
        Date date = (new Date());
        int period = 30 * 1000;
        MyTimerTask task = new MyTimerTask();
        timer.schedule(task,2000,10000); //延迟2s，每隔20s执行
        System.out.println("[GetFuturesData]运行了");
    }

    public class MyTimerTask extends TimerTask{
        private StringBuffer out;
        @Override
        public void run(){
            Calendar calendar = Calendar.getInstance();
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-DD HH:mm:ss");
            /*目标期货列表*/
            String[] futures_list = new String[]{"SC2301","TA2301","MA2301","RB2301","AL2301","I2301","V2301","P2301","M2301","Y2301","FU2301","AU0","AG0","CU2301"};

            System.out.println("Current Time："+new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));//获取当前系统时间
            System.out.println("开始定时获取期货数据");
            try {
                for (String future_id :futures_list){
                    GetFutures_and_store(future_id);
                }
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

    private void GetFutures_and_store(String future_id) throws SQLException {
        String dbname = "test";
        Db updateDb = new Db(dbname);

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder(URI.create("https://hq.sinajs.cn/list=" + future_id))
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
        //System.out.println(body);
        String name = infoArray[0];
        double price_today_begin = Double.valueOf(infoArray[2]);
        double price_yesterday = Double.valueOf(infoArray[5]);
        double price_right_now = Double.valueOf(infoArray[8]);
        double price_high = Double.valueOf(infoArray[3]);
        double price_low = Double.valueOf(infoArray[4]);
        double deal_price = Double.valueOf(infoArray[9]);
        double deal_price_yesterday = Double.valueOf(infoArray[10]);
        double buy_amount = Double.valueOf(infoArray[11]);
        double sell_amount = Double.valueOf(infoArray[12]);
        String time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
        String date = new SimpleDateFormat("yyyy-MM-dd").format(new Date());

        String sql = "";
        int count = 0;
        String check_if_exist = "select count(*) as total from futures where futures_id = '" + future_id +"' and date = '" + date +"'";
        try{
            ResultSet rs = updateDb.executeQuery(check_if_exist);
            while(rs.next()){
                count = (rs.getInt(1));
                //System.out.println("是否存在验证完成！");
            }
        }catch(Exception e){
            System.out.println(e);
        }

        if (count == 0){
            sql = "insert into futures(futures_id,futures_name,price_today_begin,price_yesterday,price_right_now,price_high,price_low,deal_price,deal_price_yesterday,buy_amount,sell_amount,select_time,date)";
            sql += " values('" + future_id + "'" + " ,'" + name + "'" + " ,'" + price_today_begin + "'" + " ,'" + price_yesterday + "'" + " ,'" + price_right_now + "'" + " ,'" + price_high + "'" + " ,'" + price_low + "'" + " ,'" + deal_price + "'" + " ,'" + deal_price_yesterday + "'"+ " ,'" + buy_amount + "'"+ " ,'" + sell_amount + "'" + " ,'" + time + "'"+" ,'" +date+"')";
        }
        else{
            sql = "update futures set price_today_begin='"+price_today_begin+"'";
            sql += " ,price_yesterday='"+price_yesterday+"'";
            sql += " ,price_right_now='"+price_right_now+"'";
            sql += " ,price_high='"+price_high+"'";
            sql += " ,price_low='"+price_low+"'";
            sql += " ,deal_price='"+deal_price+"'";
            sql += " ,deal_price_yesterday='"+deal_price_yesterday+"'";
            sql += " ,buy_amount='"+buy_amount+"'";
            sql += " ,sell_amount='"+sell_amount+"'";
            sql += " ,select_time='"+time+"'";
            sql += " where futures_id='"+ future_id +"'";
            sql += " and date='" + date + "'";
        }
        updateDb.executeUpdate(sql);

        /*写入total*/
        String sql_total = "";
        count = 0;
        String check_if_exist_total = "select count(*) as total from total where id = '" + future_id +"' and date = '" + date +"'";
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
            sql_total = "insert into total(id,name,price_pre,price_today_begin,price_right_now,price_high,price_low,select_time,date,type)";
            sql_total += " values('" + future_id + "'" + " ,'" + name + "'" + " ,'" + price_today_begin + "'" + " ,'" + price_yesterday + "'" + " ,'" + price_right_now + "'" + " ,'" + price_high + "'" + " ,'" + price_low + "'" + " ,'" + time + "'" +" ,'" + date +"' ,'1')";
        }
        /*非第一次则修改记录*/
        else{
            sql_total = "update total set price_today_begin='"+price_today_begin+"'";
            sql_total += " ,price_pre='"+price_yesterday+"'";
            sql_total += " ,price_right_now='"+price_right_now+"'";
            sql_total += " ,price_high='"+price_high+"'";
            sql_total += " ,price_low='"+price_low+"'";
            sql_total += " ,select_time='"+time+"'";
            sql_total += " where id='"+ future_id +"'";
            sql_total += " and date='" + date + "'";
        }
        updateDb.executeUpdate(sql_total);
        updateDb.close();
    }
}
