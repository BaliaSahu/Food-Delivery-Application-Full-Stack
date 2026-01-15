package com.food.FoodMan.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import com.food.FoodMan.Entity.Order;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailsResponse {
	
	private String id;
	private String email;
	private String name;
	private String address;
	private long mobile;
	private String status;
	private Double amount;
	private List<OrderResponse> orderResponse;
	private LocalDate orderDate;
}
