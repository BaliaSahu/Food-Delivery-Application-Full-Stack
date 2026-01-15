package com.food.FoodMan.serviceimpl;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.food.FoodMan.Entity.UserEntity;
import com.food.FoodMan.exception.DataNotFoundException;
import com.food.FoodMan.repository.UserRepository;
import com.food.FoodMan.request.UserRequest;
import com.food.FoodMan.response.UserResponse;
import com.food.FoodMan.service.AuthenticationFacade;
import com.food.FoodMan.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepo;

	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private AuthenticationFacade authenticationFacade;
	
	@Override
	public UserResponse registerUser(UserRequest request) throws Exception {
		// TODO Auto-generated method stub
		
		Optional<UserEntity> ue=this.userRepo.findByEmail(request.getEmail());
		if(ue.isPresent()) {
			throw new Exception("User Already Exist");
		}
		
		UserEntity user=modelMapper.map(request, UserEntity.class);
		user.setPassword(this.passwordEncoder.encode(request.getPassword()));
		if(request.getEmail().equals("baliasahu7382@gmail.com")) {
			user.setRole("admin");
		}
		else {
			user.setRole("user");
		}
		UserEntity user2=this.userRepo.save(user);
		
		return this.modelMapper.map(user2, UserResponse.class);
	}

	@Override
	public String findByUserId() {
		
		String loggedInUserEmail=this.authenticationFacade.getAuthentication().getName();
		
		UserEntity user=this.userRepo.findByEmail(loggedInUserEmail).orElseThrow(()-> new DataNotFoundException("User not found."));
		
		return user.getId();
	}

}
