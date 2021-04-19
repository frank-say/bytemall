package com.frank.bytemall.core.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

	@Value(value = "${jwt.secret}")
	public String SECRET;
	
	public String createToken(Long userId, Integer expireHours){
		Algorithm algorithm = Algorithm.HMAC256(SECRET);
		Map<String, Object> map = new HashMap<String, Object>();
		LocalDateTime now = LocalDateTime.now();
		// 过期时间：2小时
		LocalDateTime expireDate = now.plusHours(expireHours);
		map.put("alg", "HS256");
		map.put("typ", "JWT");
		return JWT.create()
			// 设置头部信息 Header
			.withHeader(map)
			// 设置 载荷 Payload
			.withClaim("userId", userId)
			// 生成签名的时间
			.withIssuedAt(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()))
			// 签名过期的时间
			.withExpiresAt(Date.from(expireDate.atZone(ZoneId.systemDefault()).toInstant()))
			// 签名 Signature
			.sign(algorithm);
	}
	
	public Long verifyTokenAndGetUserId(String token) {
		Algorithm algorithm = Algorithm.HMAC256(SECRET);
		JWTVerifier verifier = JWT.require(algorithm).build();
		DecodedJWT jwt = verifier.verify(token);
		Map<String, Claim> claims = jwt.getClaims();
		Claim claim = claims.get("userId");
		return claim.asLong();
	}
}
