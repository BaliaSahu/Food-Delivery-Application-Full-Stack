package com.food.FoodMan.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.food.FoodMan.Entity.CartEntity;

public interface CartRepository extends MongoRepository<CartEntity,String> {

	List<CartEntity> findByEmail(String email);
	
	List<CartEntity> findByEmailAndStatus(String email,String status);

	List<CartEntity> findByStatus(String status);
	
	void deleteAllByEmail(String email); 
}  
 