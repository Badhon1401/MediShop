# Supplier Module API Calls Documentation

## Base URL
```
http://localhost:8080/mediShop
```

## 1. Add New Supplier
**Endpoint:** `POST /api/suppliers`
**Description:** Creates a new supplier in the system

### Request Body:
```json
{
    "companyName": "MediCorp Solutions",
    "email": "contact@medicorp.com",
    "phone": "01512345678"
}
```

### Success Response (201 Created):
```json
{
    "supplierId": 1,
    "companyName": "MediCorp Solutions",
    "email": "contact@medicorp.com",
    "phone": "01512345678",
    "status": true,
    "createdAt": "2025-07-22T10:30:00",
    "updatedAt": null
}
```

### Error Responses:
- **400 Bad Request:** Invalid input data
- **409 Conflict:** Supplier already exists (duplicate email, company name, or phone)

---

## 2. Get All Suppliers
**Endpoint:** `GET /api/suppliers`
**Description:** Retrieves all suppliers in the system

### Success Response (200 OK):
```json
[
    {
        "supplierId": 1,
        "companyName": "MediCorp Solutions",
        "email": "contact@medicorp.com",
        "phone": "01512345678",
        "status": true,
        "createdAt": "2025-07-22T10:30:00",
        "updatedAt": null
    },
    {
        "supplierId": 2,
        "companyName": "HealthTech Supplies",
        "email": "info@healthtech.com",
        "phone": "01512345679",
        "status": false,
        "createdAt": "2025-07-21T09:15:00",
        "updatedAt": "2025-07-22T08:45:00"
    }
]
```

---

## 3. Get Active Suppliers
**Endpoint:** `GET /api/suppliers/active`
**Description:** Retrieves all active suppliers

### Success Response (200 OK):
```json
[
    {
        "supplierId": 1,
        "companyName": "MediCorp Solutions",
        "email": "contact@medicorp.com",
        "phone": "01512345678",
        "status": true,
        "createdAt": "2025-07-22T10:30:00",
        "updatedAt": null
    }
]
```

---

## 4. Get Inactive Suppliers
**Endpoint:** `GET /api/suppliers/inactive`
**Description:** Retrieves all inactive suppliers

### Success Response (200 OK):
```json
[
    {
        "supplierId": 2,
        "companyName": "HealthTech Supplies",
        "email": "info@healthtech.com",
        "phone": "015123456789",
        "status": false,
        "createdAt": "2025-07-21T09:15:00",
        "updatedAt": "2025-07-22T08:45:00"
    }
]
```

---

## 5. Get Supplier by ID
**Endpoint:** `GET /api/suppliers/{id}`
**Description:** Retrieves a specific supplier by their ID

### Example: `GET /api/suppliers/1`

### Success Response (200 OK):
```json
{
    "supplierId": 1,
    "companyName": "MediCorp Solutions",
    "email": "contact@medicorp.com",
    "phone": "01512345678",
    "status": true,
    "createdAt": "2025-07-22T10:30:00",
    "updatedAt": null
}
```

### Error Response:
- **404 Not Found:** Supplier not found

---

## 6. Get Supplier by Email
**Endpoint:** `GET /api/suppliers/email/{email}`
**Description:** Retrieves a supplier by their email address

### Example: `GET /api/suppliers/email/contact@medicorp.com`

### Success Response (200 OK):
```json
{
    "supplierId": 1,
    "companyName": "MediCorp Solutions",
    "email": "contact@medicorp.com",
    "phone": "01512345678",
    "status": true,
    "createdAt": "2025-07-22T10:30:00",
    "updatedAt": null
}
```

### Error Response:
- **404 Not Found:** Supplier not found

---

## 7. Get Supplier by Company Name
**Endpoint:** `GET /api/suppliers/company/{companyName}`
**Description:** Retrieves a supplier by their company name

### Example: `GET /api/suppliers/company/MediCorp Solutions`

### Success Response (200 OK):
```json
{
    "supplierId": 1,
    "companyName": "MediCorp Solutions",
    "email": "contact@medicorp.com",
    "phone": "01512345678",
    "status": true,
    "createdAt": "2025-07-22T10:30:00",
    "updatedAt": null
}
```

### Error Response:
- **404 Not Found:** Supplier not found

---

## 8. Search Suppliers
**Endpoint:** `GET /api/suppliers/search`
**Description:** Search suppliers by various criteria using query parameters

### Query Parameters:
- `companyName` (optional): Search by company name (partial match, case-insensitive)
- `email` (optional): Search by email (partial match, case-insensitive)
- `phone` (optional): Search by phone number (partial match)
- `status` (optional): Filter by status (true for active, false for inactive)

### Examples:
```
GET /api/suppliers/search?companyName=medi
GET /api/suppliers/search?email=contact
GET /api/suppliers/search?phone=123
GET /api/suppliers/search?status=true
GET /api/suppliers/search?companyName=medi&status=true
```

### Success Response (200 OK):
```json
[
    {
        "supplierId": 1,
        "companyName": "MediCorp Solutions",
        "email": "contact@medicorp.com",
        "phone": "01512345678",
        "status": true,
        "createdAt": "2025-07-22T10:30:00",
        "updatedAt": null
    }
]
```

---

## 9. Update Supplier
**Endpoint:** `PUT /api/suppliers/{id}`
**Description:** Updates supplier information

### Example: `PUT /api/suppliers/1`

### Request Body:
```json
{
    "companyName": "MediCorp Solutions Updated",
    "email": "newemail@medicorp.com",
    "phone": "01512345678",
    "status": false
}
```

### Success Response (200 OK):
```json
{
    "supplierId": 1,
    "companyName": "MediCorp Solutions Updated",
    "email": "newemail@medicorp.com",
    "phone": "01512345678",
    "status": false,
    "createdAt": "2025-07-22T10:30:00",
    "updatedAt": "2025-07-22T11:45:00"
}
```

### Error Responses:
- **400 Bad Request:** Invalid input data
- **404 Not Found:** Supplier not found
- **409 Conflict:** Duplicate supplier data (email, company name, or phone already exists)

---

## 10. Activate Supplier
**Endpoint:** `PATCH /api/suppliers/{id}/activate`
**Description:** Sets supplier status to active

### Example: `PATCH /api/suppliers/1/activate`

### Success Response (200 OK):
```json
{
    "supplierId": 1,
    "companyName": "MediCorp Solutions",
    "email": "contact@medicorp.com",
    "phone": "01512345678",
    "status": true,
    "createdAt": "2025-07-22T10:30:00",
    "updatedAt": "2025-07-22T12:00:00"
}
```

### Error Response:
- **404 Not Found:** Supplier not found

---

## 11. Deactivate Supplier
**Endpoint:** `PATCH /api/suppliers/{id}/deactivate`
**Description:** Sets supplier status to inactive

### Example: `PATCH /api/suppliers/1/deactivate`

### Success Response (200 OK):
```json
{
    "supplierId": 1,
    "companyName": "MediCorp Solutions",
    "email": "contact@medicorp.com",
    "phone": "01512345678",
    "status": false,
    "createdAt": "2025-07-22T10:30:00",
    "updatedAt": "2025-07-22T12:15:00"
}
```

### Error Response:
- **404 Not Found:** Supplier not found

---

## 12. Delete Supplier
**Endpoint:** `DELETE /api/suppliers/{id}`
**Description:** Permanently deletes a supplier from the system

### Example: `DELETE /api/suppliers/1`

### Success Response (204 No Content):
No response body

### Error Response:
- **404 Not Found:** Supplier not found

---

## Common Error Response Format

### Validation Errors (400 Bad Request):
```json
{
    "timestamp": "2025-07-22T12:30:00",
    "status": 400,
    "error": "Bad Request",
    "message": "Validation failed",
    "details": {
        "companyName": "Company name is required",
        "email": "Please provide a valid email address",
        "phone": "Phone number is required"
    }
}
```

### Duplicate Supplier Error (409 Conflict):
```json
{
    "timestamp": "2025-07-22T12:30:00",
    "status": 409,
    "error": "Conflict",
    "message": "Supplier with email 'contact@medicorp.com' already exists"
}
```

### Not Found Error (404 Not Found):
```json
{
    "timestamp": "2025-07-22T12:30:00",
    "status": 404,
    "error": "Not Found",
    "message": "Supplier not found with id: 999"
}
```

---

## Testing with cURL Examples

### 1. Add New Supplier:
```bash
curl -X POST http://localhost:8080/mediShop/api/suppliers \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "MediCorp Solutions",
    "email": "contact@medicorp.com",
    "phone": "01512345678"
  }'
```

### 2. Get All Suppliers:
```bash
curl -X GET http://localhost:8080/mediShop/api/suppliers
```

### 3. Search Suppliers:
```bash
curl -X GET "http://localhost:8080/mediShop/api/suppliers/search?companyName=medi&status=true"
```

### 4. Update Supplier:
```bash
curl -X PUT http://localhost:8080/mediShop/api/suppliers/1 \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Updated Company Name",
    "email": "updated@email.com",
    "phone": "+0987654321",
    "status": true
  }'
```

### 5. Activate Supplier:
```bash
curl -X PATCH http://localhost:8080/mediShop/api/suppliers/1/activate
```

### 6. Delete Supplier:
```bash
curl -X DELETE http://localhost:8080/mediShop/api/suppliers/1
```

---

## Request/Response Headers

### Common Request Headers:
```
Content-Type: application/json
Accept: application/json
```

### Common Response Headers:
```
Content-Type: application/json
```

---

## Status Codes Summary

- **200 OK:** Successful GET, PUT, PATCH operations
- **201 Created:** Successful POST operation (supplier created)
- **204 No Content:** Successful DELETE operation
- **400 Bad Request:** Invalid input data or validation errors
- **404 Not Found:** Supplier not found
- **409 Conflict:** Duplicate supplier data (email, company name, or phone)