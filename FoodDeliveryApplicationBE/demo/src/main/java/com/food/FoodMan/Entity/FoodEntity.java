package com.food.FoodMan.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Document(collection="foods")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class FoodEntity {
	@Id
	private String id;
	private String imageUrl;
	private String publicId;
	private String name;
	private String description;
	private double price;
	private String category;
	
	
}
