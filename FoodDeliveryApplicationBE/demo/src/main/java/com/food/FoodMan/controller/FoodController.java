package com.food.FoodMan.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.food.FoodMan.Entity.FoodEntity;
import com.food.FoodMan.repository.FoodRepository;
import com.food.FoodMan.request.FoodRequest;
import com.food.FoodMan.response.FoodResponse;
import com.food.FoodMan.serviceimpl.FoodServiceImpl;
import com.food.FoodMan.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin("*")
public class FoodController {
	
	@Autowired
	private FoodServiceImpl foodService;
	
	@Autowired
	private FoodRepository foodRepo;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Value("${adminEmail}")
	private String adminEmail;
	
	@Autowired
	private ModelMapper modelMapper; 
	private String getEmail(String authHeader) {
		String email = null;
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			email = this.jwtUtil.extractSubject(authHeader.substring(7));
		}
		if (email == null) {
			return null;
		}
		return email;
	}
	
	@PostMapping(value="/add/food",consumes = {"multipart/form-data"}) 
	public ResponseEntity<?> addFood(@RequestPart("data") FoodRequest request,
			@RequestPart("image") MultipartFile file,HttpServletRequest request1){
		
		String authHeader = request1.getHeader("Authorization");
		String email = null;
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			email = getEmail(authHeader);
		}
		if (email == null) {
			return new ResponseEntity<String>("Emailid not found!", HttpStatus.BAD_REQUEST); 
		}
		if (!email.equals(adminEmail)) {
			return new ResponseEntity<String>("You are not an Admin", HttpStatus.BAD_REQUEST);
		} 
		
		
		System.out.println(request);
		FoodResponse ft=this.foodService.addFood(request, file);
		
		return new ResponseEntity<>(ft,HttpStatus.OK);
	} 
	@PostMapping("/add/food2") 
	public ResponseEntity<?> addFood2(@RequestBody FoodRequest request ,HttpServletRequest request1
			){
		String authHeader = request1.getHeader("Authorization");
		String email = null;
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			email = getEmail(authHeader);
		}
		if (email == null) {
			return new ResponseEntity<String>("Emailid not found!", HttpStatus.BAD_REQUEST); 
		}
		if (!email.equals(adminEmail)) {
			return new ResponseEntity<String>("You are not an Admin", HttpStatus.BAD_REQUEST);
		}
		
		
		
		
		System.out.println(request.getName());
		FoodEntity ft=this.foodRepo.save(modelMapper.map(request, FoodEntity.class));
		System.out.println(ft);
		FoodResponse fs=this.modelMapper.map(ft, FoodResponse.class);
		return new ResponseEntity<FoodResponse>(fs,HttpStatus.OK);
	}
	
	@GetMapping("/read/foods") 
	public ResponseEntity<List<FoodResponse>> readFoods(){
		
		return new ResponseEntity<>(this.foodService.readFoods(),HttpStatus.OK);
	}
	@GetMapping("/admin/read/foods") 
	public ResponseEntity<?> readFoodss(HttpServletRequest request1){
		String authHeader = request1.getHeader("Authorization");
		String email = null;
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			email = getEmail(authHeader);
		}
		if (email == null) {
			return new ResponseEntity<String>("Emailid not found!", HttpStatus.BAD_REQUEST); 
		}
		if (!email.equals(adminEmail)) {
			return new ResponseEntity<String>("You are not an Admin", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(this.foodService.readFoods(),HttpStatus.OK);
	}
	@GetMapping("/read/{id}")
	public ResponseEntity<FoodResponse> readFood(@PathVariable String id){ 
		return new ResponseEntity<>(this.foodService.readFood(id),HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteFood(@PathVariable String id,HttpServletRequest request){
		String authHeader = request.getHeader("Authorization");
		String email = null;
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			email = getEmail(authHeader);
		}
		if (email == null) {
			return new ResponseEntity<String>("Emailid not found!", HttpStatus.BAD_REQUEST); 
		}
		if (!email.equals(adminEmail)) {
			return new ResponseEntity<String>("You are not an Admin", HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity<>(this.foodService.deleteFood(id),HttpStatus.OK);
	}
} 
