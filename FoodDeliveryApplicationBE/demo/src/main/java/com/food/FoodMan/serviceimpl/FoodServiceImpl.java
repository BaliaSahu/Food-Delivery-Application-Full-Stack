package com.food.FoodMan.serviceimpl;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.food.FoodMan.Entity.FoodEntity;
import com.food.FoodMan.exception.DataNotFoundException;
import com.food.FoodMan.repository.FoodRepository;
import com.food.FoodMan.request.FoodRequest;
import com.food.FoodMan.response.FoodResponse;
import com.food.FoodMan.service.FoodService;

@Service
public class FoodServiceImpl implements FoodService {
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private CloudinaryImageServiceImpl cloudinaryImageService;

	@Autowired
	private FoodRepository foodRepo;
	
	@Override
	public FoodResponse addFood(FoodRequest request, MultipartFile file) {
		// TODO Auto-generated method stub
		
		FoodEntity ft=modelMapper.map(request, FoodEntity.class);
		Map data=this.cloudinaryImageService.upload(file);
		System.out.println(data);
		
		System.out.println(ft);
		ft.setImageUrl(data.get("url").toString());
		String s=data.get("public_id")+"";
		System.out.println(s);
		ft.setPublicId(s);
		System.out.println(ft.getPublicId());
		
		FoodEntity ft2=this.foodRepo.save(ft);
		System.out.println(ft2);
		return this.modelMapper.map(ft2, FoodResponse.class);
	}

	@Override
	public List<FoodResponse> readFoods() {
		// TODO Auto-generated method stub
		
		List<FoodEntity> allFt=this.foodRepo.findAll();
		List<FoodResponse> allfr=allFt.stream().map((e)->
		this.modelMapper.map(e, FoodResponse.class))
				.collect(Collectors.toList());
		
		return allfr;
	}

	@Override
	public FoodResponse readFood(String id) {
		// TODO Auto-generated method stub
		
		Optional<FoodEntity> ft=this.foodRepo.findById(id);
		if(!ft.isPresent()) {
			throw new DataNotFoundException("Id with this food is not present!");
		}
		return this.modelMapper.map(ft.get(), FoodResponse.class);
		
	}

	@Override
	public String deleteFood(String id) {
		// TODO Auto-generated method stub
		
		Optional<FoodEntity> ft=this.foodRepo.findById(id);
		
		if(!ft.isPresent()) {
			throw new DataNotFoundException("Data With this id is not present!");
		}
		FoodEntity ft2=ft.get();
		
		
		boolean suc=this.cloudinaryImageService.delete(ft2.getPublicId());
		System.out.println(suc);
		if(!suc) {
			throw new RuntimeException("Image cannot deleted.");
		}
		this.foodRepo.delete(ft.get());
		
		return "Deleted Successfully!";
	}
	@Override
	public boolean deleteFoodImage(String public_id) { 
		// TODO Auto-generated method stub
		
		return this.cloudinaryImageService.delete(public_id);
		
	}

}
