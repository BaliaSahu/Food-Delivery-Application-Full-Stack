package com.food.FoodMan.serviceimpl;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.food.FoodMan.service.CloudinaryImageService;

@Service
public class CloudinaryImageServiceImpl implements CloudinaryImageService {

	@Autowired
	private Cloudinary cloudinary;
	
	@Override
	public Map upload(MultipartFile file) {
		// TODO Auto-generated method stub
		try {
			
			Map data=this.cloudinary.uploader().upload(file.getBytes(), Map.of());
			return data;
			
		}catch(IOException e) {
			throw new RuntimeException("Image Upload failed!!");
		}
		
	}

	@Override
	public boolean delete(String public_id) {
		// TODO Auto-generated method stub
		try {
			System.out.println(public_id);
			Map m=this.cloudinary.uploader().destroy(public_id, ObjectUtils.emptyMap());
			String s=(String)m.get("result");
			System.out.println(s);
			return "ok".equals(s) || "not found".equals(s);
		}
		catch(Exception e) {
			throw new RuntimeException("Image deletion unsuccessfull!!");
		}
		
	}

	
	
}
