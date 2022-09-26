package com.ssafy.Service;

import com.ssafy.Dto.Response.WeatherResponse;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WeatherService {

    @Value("${api.weather}")
    public String key;


    public List<WeatherResponse> getWeather() throws IOException {
        LocalDate now = LocalDate.now();
        String time = now.toString().replaceAll("-","");
        String host = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst" +
                "?serviceKey=" + key +
                "&numOfRows=1000&pageNo=1&dataType=JSON" +
                "&base_date="+ time +
                "&base_time=0500&nx=55&ny=127";
        String token = "";
        System.out.println(key);
        List<WeatherResponse> list = new ArrayList<>();
        try {
            URL url = new URL(host);

            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("GET");

            int responseCode = urlConnection.getResponseCode();
            System.out.println("responseCode = " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
            String line = "";
            String result = "";
            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("result = " + result);

            JSONParser parser = new JSONParser();
            JSONObject obj = (JSONObject) parser.parse(result);
            JSONObject respones = (JSONObject) obj.get("response");
            JSONObject body = (JSONObject) respones.get("body");
            JSONObject itmems = (JSONObject) body.get("items");
            JSONArray array = (JSONArray) itmems.get("item");
            System.out.println("arry크기 : "+array.size());

            String cur_fcstTime = "";
            boolean first = true;
            WeatherResponse weatherResponse = new WeatherResponse();
            for(int i=0; i<array.size(); i++){
                JSONObject item = (JSONObject) array.get(i);
                String fcstTime = item.get("fcstTime").toString();
                String category = item.get("category").toString();
                String fcstValue = item.get("fcstValue").toString();
                if(cur_fcstTime.equals(fcstTime)){
                    saveValue(weatherResponse,category,fcstValue);
                }else {
                    cur_fcstTime = fcstTime;
                    if(!first) {
                        list.add(weatherResponse);
                    } else first=false;
                    String fcstDate = item.get("fcstDate").toString();
                    weatherResponse = new WeatherResponse(fcstDate,fcstTime);
                    saveValue(weatherResponse,category,fcstValue);
                }
            }
        } catch(IOException | ParseException e) {
            e.printStackTrace();
        }
        return list;
    }
    public WeatherResponse saveValue(WeatherResponse weatherResponse, String category, String fcstValue){
        //System.out.println("category : "+category);
        //System.out.println("Val : "+fcstValue);
        if(category.equals("SKY")) weatherResponse.setSKY(fcstValue);
        else if(category.equals("TMP")) weatherResponse.setTMP(fcstValue);
        else if(category.equals("TMX")) weatherResponse.setTMX(fcstValue);
        else if(category.equals("TMN")) weatherResponse.setTMN(fcstValue);
        else if(category.equals("PTY")) weatherResponse.setPTY(fcstValue);
        return weatherResponse;
    }
}
