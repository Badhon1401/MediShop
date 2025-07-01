package com.sda.medishop.infrastructure.service;

import com.sda.medishop.infrastructure.utils.UserPrincipal;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;

@Service
public class JWTService {

    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.token-expiration}")
    private long tokenExpiration;

    public String generateToken(UUID userId, String username, String email) {
        try {
            Map<String, Object> claims = new HashMap<>();
            claims.put("username", username);
            claims.put("email", email);

            return Jwts.builder()
                    .claims(claims)
                    .subject(userId.toString()) // UUID as String
                    .issuedAt(new Date(System.currentTimeMillis()))
                    .expiration(new Date(System.currentTimeMillis() + tokenExpiration))
                    .signWith(getKey())
                    .compact();

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error generating JWT token", e);
        }
    }

    private SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }


    public UUID extractUserId(String token) {
        String userIdString = extractClaim(token, Claims::getSubject);
        return UUID.fromString(userIdString);
    }


    public String extractUsername(String token) {
        return extractClaim(token, claims -> claims.get("username", String.class));
    }


    public String extractEmail(String token) {
        return extractClaim(token, claims -> claims.get("email", String.class));
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean validateToken(String token, UserPrincipal userPrincipal) {
        UUID userId = extractUserId(token);
        String userName = extractUsername(token);
        String userEmail = extractEmail(token);

        return userName.equals(userPrincipal.getUsername()) &&
                userEmail.equals(userPrincipal.getUserEmail()) &&
                userId.equals(userPrincipal.getUserId()) &&
                !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}
