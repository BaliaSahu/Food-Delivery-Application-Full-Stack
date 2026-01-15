package com.food.FoodMan.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;


@Configuration
public class ClodinaryConfig {
	
	@Value("${cloud_name}")
	private String cloud_name;
	@Value("${api_key}")
	private String api_key;
	@Value("${api_secret}")
	private String api_secret;
	@Bean
	public Cloudinary getCloudinary() {
		
		Map config=new HashMap();
		config.put("cloud_name", cloud_name);
		config.put("api_key",api_key);
		config.put("api_secret",api_secret);
		config.put("secure",true);
		return new Cloudinary(config);
	}
	
}
