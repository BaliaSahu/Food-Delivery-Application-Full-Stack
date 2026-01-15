package com.food.FoodMan.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.food.FoodMan.request.FoodRequest;
import com.food.FoodMan.response.FoodResponse;

public interface FoodService {

	
	
	public FoodResponse addFood(FoodRequest request,MultipartFile file);
	
	public List<FoodResponse> readFoods();
	
	public FoodResponse readFood(String id);
	
	public String deleteFood(String id);
	
	public boolean deleteFoodImage(String public_id);
}
