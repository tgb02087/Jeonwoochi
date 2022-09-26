package com.ssafy.Controller;

import com.ssafy.Dto.Response.SearchResponse;
import com.ssafy.Dto.Response.WeatherResponse;
import com.ssafy.Service.SearchService;
import com.ssafy.Service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;
import java.util.List;

@Controller
public class ApiController {

    @Autowired
    private WeatherService ws;

    @Autowired
    private SearchService ss;
    @GetMapping("/")
    public ResponseEntity<?> test(){
        System.out.println("테스트");
        return new ResponseEntity<>("성공", HttpStatus.OK);
    }

    @PostMapping("/api/weather")
    public ResponseEntity<?> getWeather() throws IOException {
        List<WeatherResponse> list = ws.getWeather();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/api/search")
    public ResponseEntity<?> getSearch(@RequestParam(value = "keyword") String keyword){
        List<SearchResponse> list = ss.getSearch(keyword);
        return new ResponseEntity<>(list,HttpStatus.OK);
    }
}
