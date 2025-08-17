// ValidationErrorResponse.java
package com.mediShop.supplier.infrastructure.web.exception;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public class ValidationErrorResponse extends ErrorResponse {
    
    private Map<String, String> fieldErrors;
    private List<String> globalErrors;
    
    public ValidationErrorResponse() {
        super();
    }
    
    public ValidationErrorResponse(int status, String error, String message, 
                                 LocalDateTime timestamp, String path,
                                 Map<String, String> fieldErrors, List<String> globalErrors) {
        super(status, error, message, timestamp, path);
        this.fieldErrors = fieldErrors;
        this.globalErrors = globalErrors;
    }
    
    // Getters and Setters
    public Map<String, String> getFieldErrors() {
        return fieldErrors;
    }
    
    public void setFieldErrors(Map<String, String> fieldErrors) {
        this.fieldErrors = fieldErrors;
    }
    
    public List<String> getGlobalErrors() {
        return globalErrors;
    }
    
    public void setGlobalErrors(List<String> globalErrors) {
        this.globalErrors = globalErrors;
    }
}