package com.food.FoodMan.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.food.FoodMan.request.AuthenticationRequest;
import com.food.FoodMan.request.UserRequest;
import com.food.FoodMan.response.AuthenticationResponse;
import com.food.FoodMan.response.UserResponse;
import com.food.FoodMan.service.MyUserDetailsService;
import com.food.FoodMan.util.JwtUtil;

@RestController
public class AuthController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private MyUserDetailsService myUserDetailsService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@PostMapping("/api/login")
	public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request ){
		
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()));
		
		UserDetails userDetails=this.myUserDetailsService.loadUserByUsername(request.getEmail());
		String jwtToken=jwtUtil.generateToken(userDetails); 
		 
		return new ResponseEntity<AuthenticationResponse>(new AuthenticationResponse(request.getEmail(),jwtToken),HttpStatus.OK);
	}
	@PostMapping("/api/admin/login")
	public ResponseEntity<?> loginAdmin(@RequestBody AuthenticationRequest request ){
		if(!request.getEmail().equals("baliasahu7382@gmail.com")) {
			return new ResponseEntity<String>("Invalid Login",HttpStatus.BAD_REQUEST);
		}
		
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()));
		
		UserDetails userDetails=this.myUserDetailsService.loadUserByUsername(request.getEmail());
		
		String jwtToken=jwtUtil.generateToken(userDetails);
		
		return new ResponseEntity<AuthenticationResponse>(new AuthenticationResponse(request.getEmail(),jwtToken),HttpStatus.OK);
	}
	
	
	
}
