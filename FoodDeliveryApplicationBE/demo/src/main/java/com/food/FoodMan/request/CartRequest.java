package com.food.FoodMan.request;

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
public class CartRequest {
	private String name;
	private String address;
	private long mobile;
	private Double amount;
	private List<Order> order;
}
