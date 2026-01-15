package com.food.FoodMan.Entity;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection="messages")
public class Message {
	@Id
	private String id;
	private String firstName;
	private String lastName;
	private String email;
	private String message;
	private String status;
	private LocalDate messageDate=LocalDate.now();
}
