package com.ssafy.Controller;

import com.ssafy.Dto.Response.SearchResponse;
import com.ssafy.Dto.Response.WeatherInfoResponse;
import com.ssafy.Service.SearchService;
import com.ssafy.Service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;
import java.util.List;

@Controller
public class ApiController {

    @Autowired
    private WeatherService ws;

    @Autowired
    private SearchService ss;

    //날씨 api 호출
    @GetMapping("/api/weather")
    public ResponseEntity<?> getWeather(@RequestParam(value = "x")String x, @RequestParam(value = "y")String y) throws IOException {
        List<WeatherInfoResponse> list = ws.getWeather(x,y);
        if(list==null) return new ResponseEntity<>("실패", HttpStatus.OK);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    //네이버 뉴스 api 호출
    @GetMapping("/api/search")
    public ResponseEntity<?> getSearch(@RequestParam(value = "keyword") String keyword){
        List<SearchResponse> list = ss.getSearch(keyword);
        return new ResponseEntity<>(list,HttpStatus.OK);
    }
}
