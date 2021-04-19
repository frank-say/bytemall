package com.frank.bytemall.api;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.frank.bytemall.api", "com.frank.bytemall.db", "com.frank.bytemall.core"})
@MapperScan("com.frank.bytemall.db.mapper")
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}
