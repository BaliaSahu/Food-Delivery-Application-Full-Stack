package com.food.FoodMan.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.food.FoodMan.Entity.FoodEntity;

@Repository
public interface FoodRepository extends MongoRepository<FoodEntity,String> {

}
