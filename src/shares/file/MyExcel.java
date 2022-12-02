package shares.file;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import shares.dao.Data;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;

public class MyExcel {
    public MyExcel(String s) {
    }

    public void exportData(Data data, JSONObject json) throws JSONException, IOException {
//创建HSSFWorkbook对象
        HSSFWorkbook wb = new HSSFWorkbook();
//创建HSSFSheet对象
        HSSFSheet sheet = wb.createSheet("sheet0");

        //写表头
        JSONArray arrayTitle=json.getJSONArray("aaFieldName");
        //创建HSSFRow对象
        HSSFRow rowTitle = sheet.createRow(0);
        for(int i=0;i<arrayTitle.length();i++){
            //创建HSSFCell对象
            HSSFCell cell=rowTitle.createCell(i);
            //设置单元格的值
            cell.setCellValue((String)arrayTitle.get(i));
<<<<<<< Updated upstream
            System.out.println("表头字段="+(String)arrayTitle.get(i));
=======
            //System.out.println("表头字段="+(String)arrayTitle.get(i));
>>>>>>> Stashed changes
        }
        ////////////////////
        JSONArray array=json.getJSONArray("aaData");
        for(int i=1;i<array.length()+1;i++){
            HSSFRow row = sheet.createRow(i);
            int j=0;
            HashMap<String,String> record=(HashMap<String,String>)array.get(i-1);
            for(HashMap.Entry<String,String> entry:record.entrySet()){
                for(int c = 0; c < arrayTitle.length();c++){
                    if(entry.getKey()==arrayTitle.get(c)){
                        j=c;
                        break;
                    }
                }
<<<<<<< Updated upstream
                System.out.println("key ="+entry.getKey()+"---value="+entry.getValue());
=======
                //System.out.println("key ="+entry.getKey()+"---value="+entry.getValue());
>>>>>>> Stashed changes
                //创建HSSFCell对象
                HSSFCell cell=row.createCell(j);
                //s何止单元格的值
                cell.setCellValue(entry.getValue());

            }
        }
//输出Excel文件
        FileOutputStream output=new FileOutputStream(json.getString("file_path"));
        wb.write(output);
        output.flush();
        output.close();
    }
}
