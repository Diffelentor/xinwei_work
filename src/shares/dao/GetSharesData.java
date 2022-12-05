package shares.dao;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

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
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                msg += line + "\n";
            }
            reader.close();
        }
        System.out.println(msg);
    }
}
