package com.food.FoodMan.response;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.food.FoodMan.Entity.Order;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartResponse {
	private String id;
	private String email;
	private String status;
	private String name;
	private String address;
	private long mobile;
	private Double amount;
	private List<Order> order;
	private LocalDate orderDate;
}
