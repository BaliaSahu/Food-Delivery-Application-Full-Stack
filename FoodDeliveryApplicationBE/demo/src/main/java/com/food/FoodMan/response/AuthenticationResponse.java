package com.food.FoodMan.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthenticationResponse {

	private String email;
	private String token;
	
}
