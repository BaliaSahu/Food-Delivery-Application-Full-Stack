package com.food.FoodMan.service;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryImageService {
	public Map upload(MultipartFile file);

	public boolean delete(String public_id);
}
