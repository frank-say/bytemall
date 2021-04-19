package com.frank.bytemall.admin;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.frank.bytemall.admin", "com.frank.bytemall.core", "com.frank.bytemall.db"})
@MapperScan("com.frank.bytemall.db.mapper")
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}