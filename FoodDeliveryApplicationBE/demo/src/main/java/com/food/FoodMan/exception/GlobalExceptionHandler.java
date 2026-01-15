package com.food.FoodMan.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(DataNotFoundException.class)
	public ResponseEntity<Map> handleDataNotFoundException(DataNotFoundException e){
		Map m=new HashMap();
		m.put("error", "Data Not found with this id.");
		m.put("message", e.getMessage());
		return new ResponseEntity<>(m,HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<Map> handleException(Exception e){
		Map m=new HashMap();
		m.put("error", "Internal Server error!!");
		m.put("message", e.getMessage());
		return new ResponseEntity<>(m,HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
