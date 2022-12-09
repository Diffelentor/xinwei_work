package weather.file;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import user.dao.Data;

import javax.servlet.http.HttpServletResponse;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MyExcel {
    public MyExcel() {
    }

    public void exportData(HttpServletResponse response, JSONObject json) throws JSONException, IOException {
//创建HSSFWorkbook对象
        HSSFWorkbook wb = new HSSFWorkbook();
//创建HSSFSheet对象
        HSSFSheet sheet = wb.createSheet("sheet0");
        sheet.setColumnWidth(1,4000);
        sheet.setColumnWidth(4,7000);
        //写表头
        List<String> arrayTitle = Arrays.asList("城市","温度","天气","风力","创建时间");
        //创建HSSFRow对象
        HSSFRow rowTitle = sheet.createRow(0);

        for(int i=0;i<arrayTitle.size();i++){
            //创建HSSFCell对象
            HSSFCell cell=rowTitle.createCell(i);
            //设置单元格的值
            cell.setCellValue((String)arrayTitle.get(i));
            System.out.println("表头字段="+(String)arrayTitle.get(i));
        }
        ////////////////////
        JSONArray array=json.getJSONArray("aaData");
        for(int i=1;i<array.length()+1;i++){
            HSSFRow row = sheet.createRow(i);
            int j=0;
            HashMap<String,String> record=(HashMap<String,String>)array.get(i-1);
            for(String title:arrayTitle){
                //创建HSSFCell对象
                HSSFCell cell=row.createCell(j);
                //s何止单元格的值
                switch (j){
                    case 0:
                        cell.setCellValue(record.get("city"));break;
                    case 1:
                        cell.setCellValue(record.get("temperature"));break;
                    case 2:
                        cell.setCellValue(record.get("humidity"));break;
                    case 3:
                        cell.setCellValue(record.get("wind"));break;
                    case 4:
                        cell.setCellValue(record.get("create_time").substring(0,record.get("create_time").length()-2));break;
                }
                j++;
            }
        }
        try {
            // 输出Excel文件
            OutputStream outputStream = response.getOutputStream();
            // 下面几行是为了解决文件名乱码的问题
            response.setHeader("Content-Disposition", "attachment;filename=weatherData.xlsx");
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            response.setHeader("Pragma", "no-cache");//关闭缓存
            response.setHeader("Cache-Control", "no-cache");//关闭缓存
            response.setDateHeader("Expires", 0);//为了让浏览器不要缓存页面，也可以利用Expires实体报关域，设置为0
            wb.write(outputStream);
            outputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            //也可以在finally关闭流
        }
    }
}
