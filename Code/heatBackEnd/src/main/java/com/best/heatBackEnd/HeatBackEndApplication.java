package com.best.heatBackEnd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HeatBackEndApplication {

	public static void main(String[] args) {
		SpringApplication.run(HeatBackEndApplication.class, args);
//
//		String datasourcePassword = System.getenv("DATASOURCE_PASSWORD");
//
//		System.out.println("DATASOURCE_PASSWORD: " + datasourcePassword);
	}

}
