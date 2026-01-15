package com.food.FoodMan.serviceimpl;

import java.util.HashMap;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.food.FoodMan.Entity.CartEntity;
import com.food.FoodMan.Entity.FoodEntity;
import com.food.FoodMan.Entity.Order;
import com.food.FoodMan.exception.DataNotFoundException;
import com.food.FoodMan.repository.CartRepository;
import com.food.FoodMan.repository.FoodRepository;
import com.food.FoodMan.repository.OrderDetailsResponse;
import com.food.FoodMan.repository.OrderResponse;
import com.food.FoodMan.request.CartRequest;
import com.food.FoodMan.response.CartResponse;
import com.food.FoodMan.service.CartService;
import com.food.FoodMan.service.UserService;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	private CartRepository cartRepo;

	@Autowired
	private FoodRepository foodRepo;

	@Autowired
	private UserService userService;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public CartResponse addToCart(String email, CartRequest cartRequest) throws Exception {

		System.out.println("AYAA KAYAA");
		if (!amountCheck(cartRequest.getOrder(),cartRequest.getAmount())) {
			throw new Exception("Order Again WIth Correct Credentials.");
		}
		System.out.println("AYAA KAYAA-2");
		CartEntity cart = this.modelMapper.map(cartRequest, CartEntity.class);
 
		cart.setEmail(email); 
		cart.setOrder(cartRequest.getOrder());
		cart.setStatus("ordered");

		cart = this.cartRepo.save(cart);

		return this.modelMapper.map(cart, CartResponse.class);
	}

	private boolean amountCheck(List<Order> orders,Double amountSent) {
		List<FoodEntity> allFoods = orders.stream().map((e) -> foodIdCheck2(e.getFoodId()))
				.collect(Collectors.toList());
		Double amount = orders.stream().map((e) -> {
			FoodEntity ft = foodIdCheck2(e.getFoodId()); 
			return ft.getPrice() * e.getNum();
		}).reduce(0.0, (a, b) -> a + b);
		amount=amount+49+(orders.size()*5.0);
		return amount.equals(amount);
	}

	private FoodEntity foodIdCheck2(String id) {  
		FoodEntity food = this.foodRepo.findById(id)
				.orElseThrow(() -> new DataNotFoundException("Food not present with this id."));

		return food;
	}

	private boolean foodIdCheck(String id) {
		FoodEntity food = this.foodRepo.findById(id)
				.orElseThrow(() -> new DataNotFoundException("Food not present with this id."));

		return true;
	}

	@Override
	public List<CartResponse> allOrdersByEmail(String email) {
		// TODO Auto-generated method stub
		List<CartEntity> orders = this.cartRepo.findByEmail(email);
		List<CartResponse> orders2 = orders.stream().map((e) -> this.modelMapper.map(e, CartResponse.class))
				.collect(Collectors.toList());
		return orders2;
	}

	@Override
	public List<CartResponse> ordersByEmailAndStatus(String email, String status) {
		List<CartEntity> orders = this.cartRepo.findByEmailAndStatus(email, status);
		List<CartResponse> orders2 = orders.stream().map((e) -> this.modelMapper.map(e, CartResponse.class))
				.collect(Collectors.toList());
		return orders2;
	}

	@Override
	public List<CartResponse> orderByStatus(String status) {
		List<CartEntity> orders = this.cartRepo.findByStatus(status);
		List<CartResponse> orders2 = orders.stream().map((e) -> this.modelMapper.map(e, CartResponse.class))
				.collect(Collectors.toList());
		return orders2;
	}

	@Override
	public List<CartResponse> allOrders() {
		List<CartEntity> orders = this.cartRepo.findAll();
		List<CartResponse> orders2 = orders.stream().map((e) -> this.modelMapper.map(e, CartResponse.class))
				.collect(Collectors.toList());
		return orders2;
	}

	@Override
	public boolean deleteOrder(String email, String id) throws Exception {
		CartEntity cartEntity = this.cartRepo.findById(id)
				.orElseThrow(() -> new DataNotFoundException("Order is not present."));
		if (!email.equals(cartEntity.getEmail())) {
			throw new Exception("Order Cannot be deleted!");
		}
		this.cartRepo.deleteById(id);
		return true;
	}

	@Override
	public CartResponse updateOrder(String id, String status) throws Exception {
		CartEntity cartEntity = this.cartRepo.findById(id)
				.orElseThrow(() -> new DataNotFoundException("Order is not present."));

		if (!statusCheck(status,cartEntity.getStatus()) ) {
			throw new Exception("Invalid Credentials changes on orders.");
		}
		
		cartEntity.setStatus(status);
		cartEntity = this.cartRepo.save(cartEntity);
		return this.modelMapper.map(cartEntity, CartResponse.class);
	}
	private boolean statusCheck(String status,String oldStatus) {
		if(oldStatus.equals("ordered")) {
			if(status.equals("processing") || status.equals("not deliverable")) {
				return true;
			}
			return false;
		}
		else if(oldStatus.equals("processing")) {
			if(status.equals("delivered") || status.equals("cancel")) {
				return true;
			}
			return false;
		}
		else if(oldStatus.equals("delivered") || oldStatus.equals("cancel") || oldStatus.equals("not deliverable")) {
			return false; 
		} 
		return false;
	}
	@Override
	public CartResponse cancelOrder(String email, String id) throws Exception {
		CartEntity cartEntity = this.cartRepo.findById(id)
				.orElseThrow(() -> new DataNotFoundException("Order is not present."));
		if (!email.equals(cartEntity.getEmail())) {
			throw new Exception("Order Cannot be cancel!ed!");
		}
		String st=cartEntity.getStatus();
		if(st.equals("delivered") || st.equals("not deliverable") || st.equals("cancellled")) {
			throw new Exception("Order Cannot be cancel!ed!");
		}
		cartEntity.setStatus("cancelled");
		cartEntity = this.cartRepo.save(cartEntity);
		return this.modelMapper.map(cartEntity, CartResponse.class);
	}
	
	@Override
	public boolean deleteOrderById( String id) throws Exception {
		CartEntity cartEntity = this.cartRepo.findById(id)
				.orElseThrow(() -> new DataNotFoundException("Order is not present."));
		this.cartRepo.deleteById(id);
		return true;
	}
	
	@Override
	public boolean clearCart(String email) {
		// TODO Auto-generated method stub
		System.out.println("ASLA");
		this.cartRepo.deleteAllByEmail(email);
		return true;
	}

	@Override
	public CartResponse orderById(String id) {
		// TODO Auto-generated method stub
		CartEntity cart = this.cartRepo.findById(id)
				.orElseThrow(() -> new DataNotFoundException("Order Not Available!"));
  
		return this.modelMapper.map(cart, CartResponse.class);
	}

	@Override
	public OrderDetailsResponse orderDetailsByOrderId(String email, String orderId) {
		
		CartEntity orderCart=this.cartRepo.findById(orderId).orElseThrow(()-> new DataNotFoundException("Order Is not available!"));
		
		List<Order> orderItems=orderCart.getOrder();
		List<FoodEntity> foodItems=orderItems.stream().map((e)->{
			return this.foodRepo.findById(e.getFoodId())
					.orElseThrow(()-> new DataNotFoundException("Order items Is not available!"));
		}).collect(Collectors.toList());
		
		List<OrderResponse> orderResponse1=foodItems.stream()
				.map((e)-> this.modelMapper.map(e,OrderResponse.class))
				.collect(Collectors.toList());
		
		orderResponse1.forEach(res->{
			Order matchOrder=orderItems.stream()
					.filter(o-> o.getFoodId().equals(res.getId()))
					.findFirst()
					.orElse(null);
			if(matchOrder!=null) {
				res.setNum(matchOrder.getNum()); 
			}
		});
		OrderDetailsResponse orderDetailsResponse=this.modelMapper.map(orderCart, OrderDetailsResponse.class);
		orderDetailsResponse.setOrderResponse(orderResponse1);
		System.out.println(orderResponse1);
		return orderDetailsResponse;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
