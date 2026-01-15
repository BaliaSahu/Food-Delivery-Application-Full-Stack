package com.food.FoodMan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.food.FoodMan.Entity.Message;
import com.food.FoodMan.service.MessageService;
import com.food.FoodMan.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class MessageController {
	
	@Autowired
	private MessageService messageService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Value("${adminEmail}")
	private String adminEmail;
	
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
	
	@PostMapping("/send/message")
	public ResponseEntity<?> sendMessage(@RequestBody Message message,HttpServletRequest request){
		System.out.println("ASLSAAA"+message);
		try {
			String s=messageService.createMessage(message);
			return new ResponseEntity<String>(s,HttpStatus.OK);
		}catch(Exception e) {
			System.out.print("ASLSAAA"+e.getMessage()); 
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}
	}
	@DeleteMapping("/delete/message/{id}")
	public ResponseEntity<?> deleteMessage(@PathVariable("id") String id,HttpServletRequest request){
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
		try {
			String s=this.messageService.deleteMessage(id);
			return new ResponseEntity<String>(s,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}
	}
	@PatchMapping("/update/message/{status}/{id}")
	public ResponseEntity<?> updateMessage(@PathVariable("status") String status, @PathVariable("id") String id,HttpServletRequest request){
		System.out.println("ASLSAAA");
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
		try {
			String s=this.messageService.updateStatus(id, status); 
			return new ResponseEntity<String>(s,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}
	}
	@GetMapping("/read/message")
	public ResponseEntity<?> readMessage( HttpServletRequest request){
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
		try {
			List<Message> messages=this.messageService.allMessage();
			return new ResponseEntity<List<Message>>(messages,HttpStatus.OK);  
		}catch(Exception e) { 
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}
	} 
	
}
