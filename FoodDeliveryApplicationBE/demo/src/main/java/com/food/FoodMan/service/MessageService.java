package com.food.FoodMan.service;

import java.util.List;

import com.food.FoodMan.Entity.Message;
import com.food.FoodMan.exception.DataNotFoundException;

public interface MessageService {
	public String createMessage(Message message) throws Exception;
	public String deleteMessage(String id)throws DataNotFoundException;
	public String updateStatus(String id,String status)throws Exception;
	public List<Message> allMessage();
}
