package com.food.FoodMan.service;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.food.FoodMan.Entity.UserEntity;
import com.food.FoodMan.exception.DataNotFoundException;
import com.food.FoodMan.repository.UserRepository;

@Service
public class MyUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		UserEntity user=this.userRepo.findByEmail(email).orElseThrow(()->new DataNotFoundException("User Not Found!!"));
		
		
		return new User(user.getEmail(),user.getPassword(),Collections.emptyList());
	
	}
} 
