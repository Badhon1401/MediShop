package com.mediShop.medicine.infrastructure.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/medicines")
@Tag(name = "Medicine Management", description = "APIs for managing medicines - Proxied to Medicine Microservice")
@CrossOrigin(origins = "*")
public class MedicineProxyController {

    private final RestTemplate restTemplate;
    private final String medicineServiceUrl;

    @Autowired
    public MedicineProxyController(RestTemplate restTemplate,
                                   @Value("${medicine-service.url}") String medicineServiceUrl) {
        this.restTemplate = restTemplate;
        this.medicineServiceUrl = medicineServiceUrl;
    }

    private HttpHeaders createHeaders(HttpServletRequest request) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        
        // Forward Authorization header if present
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null) {
            headers.set("Authorization", authHeader);
        }
        
        return headers;
    }

    @GetMapping
    @Operation(summary = "Get all medicines", description = "Retrieves all medicines from the medicine microservice")
    @ApiResponse(responseCode = "200", description = "Medicines retrieved successfully")
    public ResponseEntity<List<Map<String, Object>>> getAllMedicines(HttpServletRequest request) {
        HttpEntity<Void> entity = new HttpEntity<>(createHeaders(request));
        
        return restTemplate.exchange(
                medicineServiceUrl + "/api/medicines",
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<List<Map<String, Object>>>() {}
        );
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get medicine by ID", description = "Retrieves a specific medicine by ID")
    @ApiResponse(responseCode = "200", description = "Medicine found")
    @ApiResponse(responseCode = "404", description = "Medicine not found")
    public ResponseEntity<Map<String, Object>> getMedicineById(
            @Parameter(description = "Medicine ID", required = true) @PathVariable Integer id,
            HttpServletRequest request) {
        HttpEntity<Void> entity = new HttpEntity<>(createHeaders(request));
        
        return restTemplate.exchange(
                medicineServiceUrl + "/api/medicines/" + id,
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<Map<String, Object>>() {}
        );
    }

    @PostMapping
    @Operation(summary = "Add a new medicine", description = "Creates a new medicine")
    @ApiResponse(responseCode = "201", description = "Medicine created successfully")
    @ApiResponse(responseCode = "400", description = "Invalid input data")
    public ResponseEntity<Map<String, Object>> addMedicine(
            @RequestBody Map<String, Object> medicineData,
            HttpServletRequest request) {
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(medicineData, createHeaders(request));
        
        return restTemplate.exchange(
                medicineServiceUrl + "/api/medicines",
                HttpMethod.POST,
                entity,
                new ParameterizedTypeReference<Map<String, Object>>() {}
        );
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update medicine", description = "Updates an existing medicine")
    @ApiResponse(responseCode = "200", description = "Medicine updated successfully")
    @ApiResponse(responseCode = "404", description = "Medicine not found")
    public ResponseEntity<Map<String, Object>> updateMedicine(
            @Parameter(description = "Medicine ID", required = true) @PathVariable Integer id,
            @RequestBody Map<String, Object> medicineData,
            HttpServletRequest request) {
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(medicineData, createHeaders(request));
        
        return restTemplate.exchange(
                medicineServiceUrl + "/api/medicines/" + id,
                HttpMethod.PUT,
                entity,
                new ParameterizedTypeReference<Map<String, Object>>() {}
        );
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete medicine", description = "Deletes a medicine")
    @ApiResponse(responseCode = "204", description = "Medicine deleted successfully")
    @ApiResponse(responseCode = "404", description = "Medicine not found")
    public ResponseEntity<Void> deleteMedicine(
            @Parameter(description = "Medicine ID", required = true) @PathVariable Integer id,
            HttpServletRequest request) {
        HttpEntity<Void> entity = new HttpEntity<>(createHeaders(request));
        
        restTemplate.exchange(
                medicineServiceUrl + "/api/medicines/" + id,
                HttpMethod.DELETE,
                entity,
                Void.class
        );
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    @Operation(summary = "Search medicines", description = "Search medicines by various criteria")
    @ApiResponse(responseCode = "200", description = "Search completed successfully")
    public ResponseEntity<List<Map<String, Object>>> searchMedicines(
            @Parameter(description = "Medicine name") @RequestParam(required = false) String name,
            @Parameter(description = "Medicine type") @RequestParam(required = false) String type,
            @Parameter(description = "Medicine category") @RequestParam(required = false) String category,
            HttpServletRequest request) {
        HttpEntity<Void> entity = new HttpEntity<>(createHeaders(request));
        
        StringBuilder urlBuilder = new StringBuilder(medicineServiceUrl + "/api/medicines/search?");
        if (name != null) urlBuilder.append("name=").append(name).append("&");
        if (type != null) urlBuilder.append("type=").append(type).append("&");
        if (category != null) urlBuilder.append("category=").append(category).append("&");
        
        // Remove trailing &
        String url = urlBuilder.toString();
        if (url.endsWith("&")) {
            url = url.substring(0, url.length() - 1);
        }
        
        return restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<List<Map<String, Object>>>() {}
        );
    }

    @GetMapping("/expiring")
    @Operation(summary = "Get expiring medicines", description = "Retrieves medicines that are expiring soon")
    @ApiResponse(responseCode = "200", description = "Expiring medicines retrieved successfully")
    public ResponseEntity<List<Map<String, Object>>> getExpiringMedicines(HttpServletRequest request) {
        HttpEntity<Void> entity = new HttpEntity<>(createHeaders(request));
        
        return restTemplate.exchange(
                medicineServiceUrl + "/api/medicines/expiring",
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<List<Map<String, Object>>>() {}
        );
    }
}