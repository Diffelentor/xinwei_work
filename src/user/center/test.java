package user.center;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class test {
    public static void main(String[] args) throws JSONException {
        JSONObject json = new JSONObject("{\"result_msg\":\"ok\",\"aaData\":[{\"password\":\"12345\",\"is_manager\":\"Yes\",\"email\":null,\"username\":\"AAAAA\"}],\"action\":\"login\",\"result_code\":0}\n");
        System.out.println(json.toString());
        JSONArray aaData=json.getJSONArray("aaData");
        JSONObject aData=aaData.getJSONObject(0);
        System.out.println(aData.toString());
    }
}
