package com.food.FoodMan.Entity;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection="Carts")
public class CartEntity {
	
	@Id
	private String id;
	private String email;
	private String name;
	private String address;
	private long mobile;
	private String status;
	private Double amount;
	private List<Order> order;
	private LocalDate orderDate=LocalDate.now();
	
}
