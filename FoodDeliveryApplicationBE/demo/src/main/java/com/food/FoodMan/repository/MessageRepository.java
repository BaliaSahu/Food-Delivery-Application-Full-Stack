package com.food.FoodMan.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.food.FoodMan.Entity.Message;

@Repository
public interface MessageRepository extends MongoRepository<Message,String> {

}
