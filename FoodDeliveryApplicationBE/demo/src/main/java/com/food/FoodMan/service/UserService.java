package com.food.FoodMan.service;

import com.food.FoodMan.request.UserRequest;
import com.food.FoodMan.response.UserResponse;

public interface UserService {
	
	UserResponse registerUser(UserRequest request)throws Exception;
	
	String findByUserId();
	
}
