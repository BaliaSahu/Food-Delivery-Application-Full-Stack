package com.food.FoodMan.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.food.FoodMan.request.UserRequest;
import com.food.FoodMan.response.UserResponse;
import com.food.FoodMan.service.UserService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/api/register")
	public ResponseEntity<?> register(@RequestBody UserRequest request){
		System.out.println("ALALA");
		try {
			UserResponse userResponse=this.userService.registerUser(request);
			return new ResponseEntity<UserResponse>(userResponse,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<String>("Registration Unsuccessfull",HttpStatus.BAD_REQUEST);
		}
		
	}
  
}
