package com.food.FoodMan.repository;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {

	private String id;
	private String imageUrl;
	private String name;
	private double price;
	private String category;
	private Integer num;
}
