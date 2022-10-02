package com.ssafy;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class FestivalServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(FestivalServiceApplication.class, args);
    }
}
