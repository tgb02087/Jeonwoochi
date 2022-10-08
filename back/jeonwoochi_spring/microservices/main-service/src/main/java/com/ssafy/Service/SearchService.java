package com.ssafy.Service;

import com.ssafy.Dto.Response.SearchResponse;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService {

    @Value("${api.search.ID}")
    public String id;

    @Value("${api.search.Secret}")
    public String secret;

    //네이버 뉴스 api호출
    public List<SearchResponse> getSearch(String keyword) {
        List<SearchResponse> list = new ArrayList<>();
        try {
            String host = "https://openapi.naver.com/v1/search/news.json" +
                    "?query=" + URLEncoder.encode(keyword, StandardCharsets.UTF_8.toString()) +
                    "&display=3" +
                    "&start=1" +
                    "&sort=sim";
            URL url = new URL(host);
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestProperty("X-Naver-Client-Id",id);
            urlConnection.setRequestProperty("X-Naver-Client-Secret",secret);
            urlConnection.setRequestMethod("GET");

            int responseCode = urlConnection.getResponseCode();
            System.out.println("responseCode = " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
            String line = "";
            String res = "";
            while((line=br.readLine())!=null){
                res+=line;
            }
            System.out.println("res = " + res);

            JSONParser parser = new JSONParser();
            JSONObject obj = (JSONObject) parser.parse(res);
            //JSONObject rss = (JSONObject) obj.get("rss");
            //JSONObject channel = (JSONObject) rss.get("channel");
            JSONArray items = (JSONArray) obj.get("items");

            for(int i=0; i< items.size(); i++){
                JSONObject item = (JSONObject) items.get(i);
                String title = item.get("title").toString();
                String link = item.get("link").toString();
                list.add(new SearchResponse(title,link));
            }

        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
        return list;
    }
}
