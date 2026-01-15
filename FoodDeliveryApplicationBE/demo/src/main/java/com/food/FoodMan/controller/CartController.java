package com.food.FoodMan.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.food.FoodMan.Entity.Order;
import com.food.FoodMan.repository.OrderDetailsResponse;
import com.food.FoodMan.request.CartRequest;
import com.food.FoodMan.response.CartResponse;
import com.food.FoodMan.service.CartService;
import com.food.FoodMan.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class CartController {

	@Autowired
	private CartService cartService;

	@Autowired
	private JwtUtil jwtUtil;

	
	@Value("${adminEmail}")
	private String adminEmail;

	private String getEmail(String authHeader) {
		String email = null;
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			email = this.jwtUtil.extractSubject(authHeader.substring(7));
		}
		if (email == null) {
			return null;
		}
		return email;
	}

	@PostMapping("/create/order")
	public ResponseEntity<?> addToCart(@RequestBody CartRequest cartRequest, HttpServletRequest request) {
		System.out.println("AYAYAYAYAYA");
		String authHeader = request.getHeader("Authorization");
		String email = null;
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			email = getEmail(authHeader);
		}
		if (email == null) {
			return new ResponseEntity<String>("Emailid not found!", HttpStatus.BAD_REQUEST);
		}
		try {
			CartResponse cartRes = this.cartService.addToCart(email, cartRequest);
			return new ResponseEntity<CartResponse>(cartRes, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<String>("Something went wrong!" + e.getMessage(), HttpStatus.BAD_REQUEST);
		}

	}

	@PostMapping("/cancel/order/{id}")
	public ResponseEntity<?> cancelOrder(@PathVariable("id") String id, HttpServletRequest request) throws Exception {
		System.out.println("AYA"); 
		String authHeader = request.getHeader("Authorization");
		String email = null;
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			email = getEmail(authHeader);
		}
		if (email == null) {
			return new ResponseEntity<String>("Emailid not found!", HttpStatus.BAD_REQUEST);
		}
		try {
			CartResponse cartResponse = this.cartService.cancelOrder(email, id);
			return new ResponseEntity<CartResponse>(cartResponse, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Something went wrong!" + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/order/{id}")
	public ResponseEntity<?> orderById(@PathVariable("id") String id){
		CartResponse cart=this.cartService.orderById(id);
		return new ResponseEntity<CartResponse>(cart,HttpStatus.OK);
	}
	
	@GetMapping("/all/user/orders")
	public ResponseEntity<?> allOrdersByEmail(HttpServletRequest request) {
		String authHeader = request.getHeader("Authorization");
		String email = null;
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			email = getEmail(authHeader);
		}
		if (email == null) {
			return new ResponseEntity<String>("Emailid not found!", HttpStatus.BAD_REQUEST);
		}

		List<CartResponse> orders = this.cartService.allOrdersByEmail(email);
		return new ResponseEntity<List<CartResponse>>(orders, HttpStatus.OK);
	}

	@GetMapping("/all/orders")
	public ResponseEntity<?> allOrders(HttpServletRequest request) {
		String authHeader = request.getHeader("Authorization");
		String email = null;
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			email = getEmail(authHeader);
		}
		if (email == null) {
			return new ResponseEntity<String>("Emailid not found!", HttpStatus.BAD_REQUEST);
		}
		if (!email.equals(adminEmail)) {
			return new ResponseEntity<String>("You are not an Admin", HttpStatus.BAD_REQUEST);
		}
		List<CartResponse> orders = this.cartService.allOrders();
		return new ResponseEntity<List<CartResponse>>(orders, HttpStatus.OK);
	}
	@GetMapping("/order/details/{id}")
	public ResponseEntity<?> orderDetails(@PathVariable("id")String id, HttpServletRequest request) {
		String authHeader = request.getHeader("Authorization");
		String email = null;
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			email = getEmail(authHeader);
		}
		if (email == null) {
			return new ResponseEntity<String>("Emailid not found!", HttpStatus.BAD_REQUEST); 
		}
		if (!email.equals(adminEmail)) {
			return new ResponseEntity<String>("You are not an Admin", HttpStatus.BAD_REQUEST);
		}
		OrderDetailsResponse orderDetailsResponse=this.cartService.orderDetailsByOrderId(email, id);
		return new ResponseEntity<OrderDetailsResponse>(orderDetailsResponse, HttpStatus.OK);
	} 
	
	@GetMapping("/order/user/{status}")
	public ResponseEntity<?> orderByEmailStatus(@PathVariable("status") String status, HttpServletRequest request) {
		String authHeader = request.getHeader("Authorization");
		String email = null;
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			email = getEmail(authHeader);
		}
		if (email == null) {
			return new ResponseEntity<String>("Emailid not found!", HttpStatus.BAD_REQUEST);
		}
		if (!email.equals(adminEmail)) {
			return new ResponseEntity<String>("You are not an Admin", HttpStatus.BAD_REQUEST);
		}
		try {
			List<CartResponse> cartResponse = this.cartService.ordersByEmailAndStatus(email, status);
			return new ResponseEntity<List<CartResponse>>(cartResponse, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Something went wrong!" + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@PatchMapping("/order/{id}/{status}")
	public ResponseEntity<?> orderByStatus(@PathVariable("id")String id,@PathVariable("status") String status, HttpServletRequest request) {
		String authHeader = request.getHeader("Authorization");
		String email = null;
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			email = getEmail(authHeader);
		}
		if (email == null) {
			return new ResponseEntity<String>("Emailid not found!", HttpStatus.BAD_REQUEST);
		}
		if (!email.equals(adminEmail)) {
			return new ResponseEntity<String>("You are not an Admin", HttpStatus.BAD_REQUEST);
		}
		try {
			CartResponse cartResponse = this.cartService.updateOrder(id, status);
			return new ResponseEntity<CartResponse>(cartResponse, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Something went wrong!" + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@DeleteMapping("/clear/order")
	public ResponseEntity<?> clearOrder(HttpServletRequest request) { 
		String authHeader = request.getHeader("Authorization");
		String email = null;
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			email = getEmail(authHeader);
		}
		if (email == null) {
			return new ResponseEntity<String>("Emailid not found!", HttpStatus.BAD_REQUEST);
		}
		if (!email.equals(adminEmail)) {
			return new ResponseEntity<String>("You are not an Admin", HttpStatus.BAD_REQUEST);
		}
		boolean b = this.cartService.clearCart(email);
		return new ResponseEntity<String>("Deleted Successfully", HttpStatus.OK);

	}
	@DeleteMapping("/order/{id}")
	public ResponseEntity<?> clearOrder(@PathVariable("id") String id,HttpServletRequest request) { 
		String authHeader = request.getHeader("Authorization");
		String email = null;
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			email = getEmail(authHeader);
		}
		if (email == null) {
			return new ResponseEntity<String>("Emailid not found!", HttpStatus.BAD_REQUEST);
		}
		if (!email.equals(adminEmail)) {
			return new ResponseEntity<String>("You are not an Admin", HttpStatus.BAD_REQUEST);
		}
		try { 
			boolean b = this.cartService.deleteOrderById(id);
			return new ResponseEntity<String>("Deleted Successfully", HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.OK);
		} 

	}

}
