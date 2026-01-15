package com.food.FoodMan.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.food.FoodMan.Entity.UserEntity;

@Repository
public interface UserRepository extends MongoRepository<UserEntity,String> {
	
	Optional<UserEntity> findByEmail(String email);

}
