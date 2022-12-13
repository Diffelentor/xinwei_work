package shares.dao;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class GetSharesData implements ServletContextListener{
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
        System.out.println("[GetSharesData]运行了");
    }

    public class MyTimerTask extends TimerTask{
        @Override
        public void run(){
            Calendar calendar = Calendar.getInstance();
            /*目标股票列表*/
            String[] shares_list = new String[]{"sh000001","sz399001","sh000300","sz399415","sz399006","sh600000","sh600015","sh601318","sh601628","sh601988","sh600028","sh601857","sh600055","sz300015","sz300396","sh600085","sh600129","sh600332","sz000538","sh600519","sh600132","sz000858","sh600048","sh600606","sz000002"};

            System.out.println("Current Time："+new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));//获取当前系统时间
            System.out.println("开始定时获取股票数据");
            try {
                for (String share_id : shares_list){
                    GetShares_and_store(share_id);
                }
            } catch (SQLException | IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

    private void GetShares_and_store(String share_id) throws SQLException, IOException {
        String dbname = "test";
        Db updateDb = new Db(dbname);

        // 1. 获取访问地址URL
        URL url = new URL("https://hq.sinajs.cn/list=" + share_id);
        // 2. 创建HttpURLConnection对象
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        /* 3. 设置请求参数等 */
        // 请求方式
        connection.setRequestMethod("POST");
        // 设置连接超时时间
        connection.setConnectTimeout(3000);
        // 设置是否向 HttpUrlConnection 输出，对于post请求，参数要放在 http 正文内，因此需要设为true，默认为false。
        connection.setDoOutput(true);
        // 设置是否从 HttpUrlConnection读入，默认为true
        connection.setDoInput(true);
        // 设置是否使用缓存
        connection.setUseCaches(false);
        // 设置此 HttpURLConnection 实例是否应该自动执行 HTTP 重定向
        connection.setInstanceFollowRedirects(true);
        // 设置使用标准编码格式编码参数的名-值对
        connection.setRequestProperty("Referer", "https://finance.sina.com.cn");
        // 连接
        connection.connect();
        // 从连接中读取响应信息
        String msg = "";
        int code = connection.getResponseCode();
        if (code == 200) {
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(),"GBK"));
            String line;
            while ((line = reader.readLine()) != null) {
                //msg += line.split("\\.")[0].substring(line.split("\\.")[0].indexOf("\""+1)).trim() + "\n";
                Pattern p = Pattern.compile("\"(.*?)\"");
                Matcher m = p.matcher(line);
                while(m.find()){
                    msg = m.group().replace("\"","");
                }
            }
            reader.close();
        }
        //System.out.println(msg);
        String[] infoArray = msg.split(",");
        //System.out.println(infoArray[0]);

        String name = infoArray[0];
        double price_today_begin = Double.valueOf(infoArray[1]);
        double price_yesterday = Double.valueOf(infoArray[2]);
        double price_right_now = Double.valueOf(infoArray[3]);
        double price_high = Double.valueOf(infoArray[4]);
        double price_low = Double.valueOf(infoArray[5]);
        double deal_count = Double.valueOf(infoArray[8]);
        double deal_amount = Double.valueOf(infoArray[9]);
        String time = infoArray[30] + " " + infoArray[31];
        String date = infoArray[30];
        //System.out.println("执行到这里");
        String sql = "";
        int count = 0;
        String check_if_exist = "select count(*) as total from xm06_shares where shares_id = '" + share_id +"' and date = '" + date +"'";
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
            sql = "insert into xm06_shares(shares_id,shares_name,price_today_begin,price_pre,price_right_now,price_high,price_low,deal_count,deal_amount,select_time,date)";
            sql += " values('" + share_id + "'" + " ,'" + name + "'" + " ,'" + price_today_begin + "'" + " ,'" + price_yesterday + "'" + " ,'" + price_right_now + "'" + " ,'" + price_high + "'" + " ,'" + price_low + "'" + " ,'" + deal_count + "'" + " ,'" + deal_amount + "'" + " ,'" + time + "'" +" ,'"+date+"')";
        }
        else{
            sql = "update xm06_shares set price_today_begin='"+price_today_begin+"'";
            sql += " ,price_pre='"+price_yesterday+"'";
            sql += " ,price_right_now='"+price_right_now+"'";
            sql += " ,price_high='"+price_high+"'";
            sql += " ,price_low='"+price_low+"'";
            sql += " ,deal_count='"+deal_count+"'";
            sql += " ,deal_amount='"+deal_amount+"'";
            sql += " ,select_time='"+time+"'";
            sql += " where shares_id='"+ share_id +"'";
            sql += " and date='" + date + "'";
        }
        updateDb.executeUpdate(sql);

        /*写入total*/
        String sql_total = "";
        count = 0;
        String check_if_exist_total = "select count(*) as total from xm06_total where futures_id = '" + share_id + "'";
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
            sql_total = "insert into xm06_total(futures_id,futures_name,type,price_today_begin,price_yesterday,price_right_now,price_high,price_low,deal_count,deal_amount,select_time)";
            sql_total += " values('" + share_id + "'" + " ,'" + name + "'" + " ,'股票' ,'" + price_today_begin + "'" + " ,'" + price_yesterday + "'" + " ,'" + price_right_now + "'" + " ,'" + price_high + "'" + " ,'" + price_low + "' ,'" + deal_count + "'" + " ,'" + deal_amount + "'" + " ,'" + time + "')";
        }
        /*非第一次则修改记录*/
        else{
            sql_total = "update xm06_total set price_today_begin='"+price_today_begin+"'";
            sql_total += " ,price_yesterday='"+price_yesterday+"'";
            sql_total += " ,price_right_now='"+price_right_now+"'";
            sql_total += " ,price_high='"+price_high+"'";
            sql_total += " ,price_low='"+price_low+"'";
            sql_total += " ,deal_count='"+deal_count+"'";
            sql_total += " ,deal_amount='"+deal_amount+"'";
            sql_total += " ,select_time='"+time+"'";
            sql_total += " where futures_id='"+ share_id +"'";
        }
        updateDb.executeUpdate(sql_total);
        updateDb.close();
    }
}
