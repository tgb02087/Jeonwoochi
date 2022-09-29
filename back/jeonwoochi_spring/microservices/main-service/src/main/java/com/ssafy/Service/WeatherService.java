package com.ssafy.Service;

import com.ssafy.Dto.Response.WeatherInfoResponse;
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

    //날씨api 호출
    public List<WeatherInfoResponse> getWeather(String x, String y) throws IOException {
        LocalDate now = LocalDate.now();
        String time = now.toString().replaceAll("-","");
        String host = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst" +
                "?serviceKey=" + key +
                "&numOfRows=1500&pageNo=1&dataType=JSON" +
                "&base_date="+ time +
                "&base_time=0200" +
                "&nx=" +x+
                "&ny="+ y;
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
            // Response 결과
            //System.out.println("result = " + result);

            JSONParser parser = new JSONParser();
            JSONObject obj = (JSONObject) parser.parse(result);
            JSONObject respones = (JSONObject) obj.get("response");
            JSONObject hearder = (JSONObject) respones.get("header");
            String code = hearder.get("resultCode").toString();
            if(!code.equals("00")) return null;
            JSONObject body = (JSONObject) respones.get("body");
            JSONObject itmems = (JSONObject) body.get("items");
            JSONArray array = (JSONArray) itmems.get("item");
            //System.out.println("arry크기 : "+array.size());

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
                    if(i== array.size()-1) list.add(weatherResponse);
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
        return setList(list);
    }
    //응답 데이터 저장
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

    //날씨 데이터 정제
    public List<WeatherInfoResponse> setList(List<WeatherResponse> list){
//        for(int i=0; i< list.size(); i++){
//            System.out.println("list크기 : "+ list.size());
//            WeatherResponse weatherResponse = list.get(i);
//            System.out.println(weatherResponse.getFcstDate());
//        }
        List<WeatherInfoResponse> newlist = new ArrayList<>();
        String cur_data = "";
        int[] sky_stat = new int[9];
        boolean first = true;
        WeatherInfoResponse weatherInfoResponse = new WeatherInfoResponse();
        for(int i=0; i< list.size(); i++){
            WeatherResponse weatherResponse = list.get(i);
            String Data = weatherResponse.getFcstDate();
            if (cur_data.equals(Data)){
                sky_stat = setSky(weatherResponse,sky_stat);
                setTm(weatherResponse,weatherInfoResponse);
                if(i== list.size()-1){
                    weatherInfoResponse = addSky(weatherInfoResponse,sky_stat);
                    newlist.add(weatherInfoResponse);
                }
            }
            else{
                cur_data = Data;
                if(!first){
                    weatherInfoResponse = addSky(weatherInfoResponse,sky_stat);
                    newlist.add(weatherInfoResponse);
                }else first=false;
                weatherInfoResponse = new WeatherInfoResponse();
                weatherInfoResponse.setData(Data);
                sky_stat = setSky(weatherResponse,sky_stat);
                setTm(weatherResponse,weatherInfoResponse);
            }
        }
        return newlist;
    }
    //날씨 데이터 정제
    private WeatherInfoResponse addSky(WeatherInfoResponse weatherInfoResponse, int[] sky_stat){
        String s = "";
        for(int j=1; j<sky_stat.length; j++){
            if(sky_stat[j]>0) s+=j+" ";
        }
        weatherInfoResponse.setSky(s);
        return weatherInfoResponse;
    }

    //날씨 세팅
    private int[] setSky(WeatherResponse weatherResponse, int[] sky_stat){
        if(weatherResponse.getSKY()!=null) {
            int sky = Integer.parseInt(weatherResponse.getSKY());
            sky_stat[sky]++;
        }
        if(weatherResponse.getPTY()!=null) {
            String pty = weatherResponse.getPTY();
            if(pty.equals("1")) sky_stat[5]++;
            else if(pty.equals("2")) sky_stat[6]++;
            else if(pty.equals("3")) sky_stat[7]++;
            else if(pty.equals("4")) sky_stat[8]++;
        }
        return sky_stat;
    }

    //온도 세팅
    private void setTm(WeatherResponse cur, WeatherInfoResponse nw){
        if(cur.getTMN()!=null) nw.setTmn(cur.getTMN());
        if(cur.getTMX()!=null) nw.setTmx(cur.getTMX());
    }
}
