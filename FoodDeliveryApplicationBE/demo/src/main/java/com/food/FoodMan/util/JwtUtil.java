package com.food.FoodMan.util;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;


@Component
public class JwtUtil {

	@Value("${JWT_SECRET_KEY}")
	private String SECRET_KEY;
	
	public String generateToken(UserDetails userDetails) {
		Map<String ,Object> claims=new HashMap<>();
		return createToken(claims,userDetails.getUsername());
	}
	
	private String createToken(Map<String,Object> claims,String subject) {
		
		return Jwts.builder()
				.setClaims(claims)
				.setSubject(subject)
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis()+1000*60*60*10))
				.signWith(SignatureAlgorithm.HS256,SECRET_KEY)
				.compact();
		
	}
	 
	public boolean validateToken(String token,UserDetails userDetails) {
		
		String username=getClaimBody(token).getSubject();
		
		return (username.equals(userDetails.getUsername()) && !checkExpiration(token));
	}
	
	private Claims getClaimBody(String token) {
		return Jwts.parser()
				.setSigningKey(SECRET_KEY)
				.parseClaimsJws(token)
				.getBody();
	} 
	
	private boolean checkExpiration(String token) {
		boolean isExpired= getClaimBody(token).getExpiration().before(new Date());
		
		return isExpired;
		
	}
	
	public String extractSubject(String token) {
		return Jwts.parser()
				.setSigningKey(SECRET_KEY)
				.parseClaimsJws(token)
				.getBody()
				.getSubject();
	}
}
