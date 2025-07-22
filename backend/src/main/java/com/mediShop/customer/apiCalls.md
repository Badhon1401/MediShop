# Customer Management API Calls

## Base URL
```
http://localhost:8080/api/customers
```

## 1. Create Customer
**POST** `/api/customers`

### Request Body
```json
{
    "name": "John Doe",
    "contactNumber": "+1234567890",
    "registrationDate": "2024-01-15"
}
```

### Request Body (Minimal - registration date will default to today)
```json
{
    "name": "Jane Smith",
    "contactNumber": "+9876543210"
}
```

### cURL Example
```bash
curl -X POST http://localhost:8080/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "contactNumber": "+1234567890",
    "registrationDate": "2024-01-15"
  }'
```

### Expected Response (201 Created)
```json
{
    "customerId": 1,
    "name": "John Doe",
    "contactNumber": "+1234567890",
    "registrationDate": "2024-01-15"
}
```

---

## 2. Get All Customers
**GET** `/api/customers`

### cURL Example
```bash
curl -X GET http://localhost:8080/api/customers
```

### Expected Response (200 OK)
```json
[
    {
        "customerId": 1,
        "name": "John Doe",
        "contactNumber": "+1234567890",
        "registrationDate": "2024-01-15"
    },
    {
        "customerId": 2,
        "name": "Jane Smith",
        "contactNumber": "+9876543210",
        "registrationDate": "2024-01-16"
    }
]
```

---

## 3. Get Customer by ID
**GET** `/api/customers/{id}`

### cURL Example
```bash
curl -X GET http://localhost:8080/api/customers/1
```

### Expected Response (200 OK)
```json
{
    "customerId": 1,
    "name": "John Doe",
    "contactNumber": "+1234567890",
    "registrationDate": "2024-01-15"
}
```

### Error Response (404 Not Found)
```json
{
    "timestamp": "2024-01-16T10:30:00.000+00:00",
    "status": 404,
    "error": "Not Found",
    "path": "/api/customers/999"
}
```

---

## 4. Update Customer
**PUT** `/api/customers/{id}`

### Request Body
```json
{
    "name": "John Doe Updated",
    "contactNumber": "+1234567891",
    "registrationDate": "2024-01-15"
}
```

### cURL Example
```bash
curl -X PUT http://localhost:8080/api/customers/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe Updated",
    "contactNumber": "+1234567891",
    "registrationDate": "2024-01-15"
  }'
```

### Expected Response (200 OK)
```json
{
    "customerId": 1,
    "name": "John Doe Updated",
    "contactNumber": "+1234567891",
    "registrationDate": "2024-01-15"
}
```

---

## 5. Delete Customer
**DELETE** `/api/customers/{id}`

### cURL Example
```bash
curl -X DELETE http://localhost:8080/api/customers/1
```

### Expected Response (204 No Content)
```
(Empty response body)
```

---

## 6. Search Customers (JSON Body)
**POST** `/api/customers/search`

### Request Body - Search by name
```json
{
    "name": "John"
}
```

### Request Body - Search by contact number
```json
{
    "contactNumber": "+1234567890"
}
```

### Request Body - Search by registration date range
```json
{
    "registrationDateFrom": "2024-01-01",
    "registrationDateTo": "2024-01-31"
}
```

### Request Body - Combined search criteria
```json
{
    "name": "John",
    "registrationDateFrom": "2024-01-01",
    "registrationDateTo": "2024-12-31"
}
```

### cURL Example
```bash
curl -X POST http://localhost:8080/api/customers/search \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "registrationDateFrom": "2024-01-01",
    "registrationDateTo": "2024-12-31"
  }'
```

### Expected Response (200 OK)
```json
[
    {
        "customerId": 1,
        "name": "John Doe",
        "contactNumber": "+1234567890",
        "registrationDate": "2024-01-15"
    }
]
```

---

## 7. Search Customers (Query Parameters)
**GET** `/api/customers/search`

### Search by name (partial match)
```
GET /api/customers/search?name=John
```

### Search by contact number (exact match)
```
GET /api/customers/search?contactNumber=+1234567890
```

### Search by registration date range
```
GET /api/customers/search?registrationDateFrom=2024-01-01&registrationDateTo=2024-01-31
```

### Combined search with multiple parameters
```
GET /api/customers/search?name=John&registrationDateFrom=2024-01-01&registrationDateTo=2024-12-31
```

### cURL Examples
```bash
# Search by name
curl -X GET "http://localhost:8080/api/customers/search?name=John"

# Search by contact number
curl -X GET "http://localhost:8080/api/customers/search?contactNumber=%2B1234567890"

# Search by date range
curl -X GET "http://localhost:8080/api/customers/search?registrationDateFrom=2024-01-01&registrationDateTo=2024-01-31"

# Combined search
curl -X GET "http://localhost:8080/api/customers/search?name=John&registrationDateFrom=2024-01-01&registrationDateTo=2024-12-31"
```

### Expected Response (200 OK)
```json
[
    {
        "customerId": 1,
        "name": "John Doe",
        "contactNumber": "+1234567890",
        "registrationDate": "2024-01-15"
    }
]
```

---

## Common HTTP Status Codes

| Status Code | Description | When it occurs |
|-------------|-------------|----------------|
| 200 | OK | Successful GET, PUT operations |
| 201 | Created | Successful POST (create customer) |
| 204 | No Content | Successful DELETE operation |
| 400 | Bad Request | Invalid input data, validation errors |
| 404 | Not Found | Customer not found |
| 409 | Conflict | Contact number already exists |

---

## Error Response Examples

### 400 Bad Request (Validation Error)
```json
{
    "timestamp": "2024-01-16T10:30:00.000+00:00",
    "status": 400,
    "error": "Bad Request",
    "message": "Validation failed",
    "path": "/api/customers"
}
```

### 409 Conflict (Duplicate Contact Number)
```json
{
    "timestamp": "2024-01-16T10:30:00.000+00:00",
    "status": 409,
    "error": "Conflict",
    "message": "Customer with this contact number already exists",
    "path": "/api/customers"
}
```

---

## Postman Collection Import

You can import these API calls into Postman by creating a new collection and adding each request with the appropriate method, URL, headers, and body content as shown above.