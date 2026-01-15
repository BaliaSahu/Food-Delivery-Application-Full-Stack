package com.food.FoodMan.serviceimpl;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.food.FoodMan.service.AuthenticationFacade;

@Component
public class AuthenticationFacadeImpl implements AuthenticationFacade {

	@Override
	public Authentication getAuthentication() {
		
		return SecurityContextHolder.getContext().getAuthentication();
	}
	
}
