package com.food.FoodMan.Entity;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection="users")
public class UserEntity {
	
	private String id;
	private String email;
	private String password;
	private String name;
	private String role;
}
