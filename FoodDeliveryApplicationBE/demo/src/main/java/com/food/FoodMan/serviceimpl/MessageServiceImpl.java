package com.food.FoodMan.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.food.FoodMan.Entity.Message;
import com.food.FoodMan.exception.DataNotFoundException;
import com.food.FoodMan.repository.MessageRepository;
import com.food.FoodMan.service.MessageService;

@Service
public class MessageServiceImpl implements MessageService {
	@Autowired
	private MessageRepository messageRepo;

	@Override
	public String createMessage(Message message) throws Exception {
		// TODO Auto-generated method stub
		if(message.getFirstName().length()<=25 && message.getLastName().length()<=25 && message.getMessage().length()<200 && message.getEmail().length()<60 && 
				message.getFirstName().length()>=3 && message.getLastName().length()>=3 && message.getMessage().length()>=5 && message.getEmail().length()>=12) {
			message.setStatus("not read");
			this.messageRepo.save(message);
			return "Message Sent Successfully.";
		}else {
			throw new Exception("InValid Message");
		}
	}

	@Override
	public String deleteMessage(String id) throws DataNotFoundException {
		// TODO Auto-generated method stub
		Message m=this.messageRepo.findById(id).orElseThrow(()-> new DataNotFoundException("Message Not Available!"));
		this.messageRepo.deleteById(id);
		return "message deleted Successfully";
	}

	@Override
	public String updateStatus(String id,String status) throws Exception {
		// TODO Auto-generated method stub
		Message m=this.messageRepo.findById(id).orElseThrow(()-> new DataNotFoundException("Message Not Available!"));
		if(m.getStatus().equals("read")) {
			throw new Exception("You Already read the message");
		}
		if(!status.equals("read")) {
			throw new Exception("You Cannot change the status of the message");
		}
		m.setStatus("read");
		this.messageRepo.save(m);
		return "Message Status Updated Successfully";
	}

	@Override
	public List<Message> allMessage() {
		// TODO Auto-generated method stub
		List<Message> messages=this.messageRepo.findAll();
		return messages;
	}

}
