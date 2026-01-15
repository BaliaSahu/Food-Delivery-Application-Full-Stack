package com.food.FoodMan.service;

import java.util.List;

import com.food.FoodMan.Entity.CartEntity;
import com.food.FoodMan.Entity.Order;
import com.food.FoodMan.repository.OrderDetailsResponse;
import com.food.FoodMan.request.CartRequest;
import com.food.FoodMan.response.CartResponse;

public interface CartService {
	public CartResponse addToCart(String email,CartRequest cartRequest) throws Exception;
	 
	public List<CartResponse> allOrdersByEmail(String email);
	
	public CartResponse orderById(String id);
	 
	public List<CartResponse> allOrders();
	
	public List<CartResponse> ordersByEmailAndStatus(String email,String status);
	
	public List<CartResponse> orderByStatus(String status);
	
	public boolean deleteOrder(String email,String id) throws Exception;
	
	public CartResponse updateOrder(String id,String status) throws Exception;
	
	public CartResponse cancelOrder(String email,String id) throws Exception;

	public boolean clearCart(String email);
	
	public OrderDetailsResponse orderDetailsByOrderId(String email,String orderId );

	boolean deleteOrderById(String id) throws Exception;
}
