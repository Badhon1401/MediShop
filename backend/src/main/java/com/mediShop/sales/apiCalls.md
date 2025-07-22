# Sales Management API Calls

## Base URL
```
http://localhost:8080/mediShop
```

## 1. Add New Sales Record
**POST** `/api/sales`

### Request Body
```json
{
    "salesId": 1001,
    "customerPhoneNumber": "01512345678",
    "salesDate": "2024-01-15",
    "medicineName": "Paracetamol 500mg",
    "medicineUnitPrice": 2.50,
    "perMedicineTotalQuantity": 10,
    "perMedicineTotalAmount": 25.00,
    "totalPricePerCustomerTransaction": 25.00
}
```

### cURL Example
```bash
curl -X POST http://localhost:8080/mediShop/api/sales \
  -H "Content-Type: application/json" \
  -d '{
    "salesId": 1001,
    "customerPhoneNumber": "01512345678",
    "salesDate": "2024-01-15",
    "medicineName": "Paracetamol 500mg",
    "medicineUnitPrice": 2.50,
    "perMedicineTotalQuantity": 10,
    "perMedicineTotalAmount": 25.00,
    "totalPricePerCustomerTransaction": 25.00
  }'
```

### Expected Response (201 Created)
```json
{
    "itemsId": 1,
    "salesId": 1001,
    "customerPhoneNumber": "01512345678",
    "salesDate": "2024-01-15",
    "medicineName": "Paracetamol 500mg",
    "medicineUnitPrice": 2.50,
    "perMedicineTotalQuantity": 10,
    "perMedicineTotalAmount": 25.00,
    "totalPricePerCustomerTransaction": 25.00
}
```

---

## 2. Get All Sales Records
**GET** `/api/sales`

### cURL Example
```bash
curl -X GET http://localhost:8080/mediShop/api/sales
```

### Expected Response (200 OK)
```json
[
    {
        "itemsId": 1,
        "salesId": 1001,
        "customerPhoneNumber": "01512345678",
        "salesDate": "2024-01-15",
        "medicineName": "Paracetamol 500mg",
        "medicineUnitPrice": 2.50,
        "perMedicineTotalQuantity": 10,
        "perMedicineTotalAmount": 25.00,
        "totalPricePerCustomerTransaction": 25.00
    },
    {
        "itemsId": 2,
        "salesId": 1002,
        "customerPhoneNumber": "01587654321",
        "salesDate": "2024-01-16",
        "medicineName": "Ibuprofen 400mg",
        "medicineUnitPrice": 3.00,
        "perMedicineTotalQuantity": 5,
        "perMedicineTotalAmount": 15.00,
        "totalPricePerCustomerTransaction": 15.00
    }
]
```

---

## 3. Search Sales Records
**POST** `/api/sales/search`

### Request Body - Search by sales ID
```json
{
    "salesId": 1001
}
```

### Request Body - Search by customer phone number
```json
{
    "customerPhoneNumber": "01512345678"
}
```

### Request Body - Search by medicine name
```json
{
    "medicineName": "Paracetamol"
}
```

### Request Body - Search by date
```json
{
    "salesDate": "2024-01-15"
}
```

### Request Body - Search by date range
```json
{
    "startDate": "2024-01-01",
    "endDate": "2024-01-31"
}
```

### Request Body - Combined search criteria
```json
{
    "salesId": 1001,
    "customerPhoneNumber": "01512345678",
    "startDate": "2024-01-01",
    "endDate": "2024-01-31"
}
```

### cURL Example
```bash
curl -X POST http://localhost:8080/mediShop/api/sales/search \
  -H "Content-Type: application/json" \
  -d '{
    "customerPhoneNumber": "01512345678",
    "startDate": "2024-01-01",
    "endDate": "2024-01-31"
  }'
```

### Expected Response (200 OK)
```json
[
    {
        "itemsId": 1,
        "salesId": 1001,
        "customerPhoneNumber": "01512345678",
        "salesDate": "2024-01-15",
        "medicineName": "Paracetamol 500mg",
        "medicineUnitPrice": 2.50,
        "perMedicineTotalQuantity": 10,
        "perMedicineTotalAmount": 25.00,
        "totalPricePerCustomerTransaction": 25.00
    }
]
```

---

## 4. Update Sales Record
**PUT** `/api/sales`

### Request Body
```json
{
    "itemsId": 1,
    "salesId": 1001,
    "customerPhoneNumber": "01512345678",
    "salesDate": "2024-01-15",
    "medicineName": "Paracetamol 500mg Updated",
    "medicineUnitPrice": 3.00,
    "perMedicineTotalQuantity": 12,
    "perMedicineTotalAmount": 36.00,
    "totalPricePerCustomerTransaction": 36.00
}
```

### cURL Example
```bash
curl -X PUT http://localhost:8080/mediShop/api/sales \
  -H "Content-Type: application/json" \
  -d '{
    "itemsId": 1,
    "salesId": 1001,
    "customerPhoneNumber": "01512345678",
    "salesDate": "2024-01-15",
    "medicineName": "Paracetamol 500mg Updated",
    "medicineUnitPrice": 3.00,
    "perMedicineTotalQuantity": 12,
    "perMedicineTotalAmount": 36.00,
    "totalPricePerCustomerTransaction": 36.00
  }'
```

### Expected Response (200 OK)
```json
{
    "itemsId": 1,
    "salesId": 1001,
    "customerPhoneNumber": "01512345678",
    "salesDate": "2024-01-15",
    "medicineName": "Paracetamol 500mg Updated",
    "medicineUnitPrice": 3.00,
    "perMedicineTotalQuantity": 12,
    "perMedicineTotalAmount": 36.00,
    "totalPricePerCustomerTransaction": 36.00
}
```

---

## 5. Delete Sales Record
**DELETE** `/api/sales/{itemsId}`

### cURL Example
```bash
curl -X DELETE http://localhost:8080/mediShop/api/sales/1
```

### Expected Response (204 No Content)
```
(Empty response body)
```

---

## 6. Get Sales Analytics
**GET** `/api/sales/analytics`

### cURL Example
```bash
curl -X GET http://localhost:8080/mediShop/api/sales/analytics
```

### Expected Response (200 OK)
```json
{
    "totalSalesAmount": 5420.50,
    "totalTransactions": 125,
    "averageTransactionValue": 43.36,
    "topSellingMedicines": [
        {
            "medicineName": "Paracetamol 500mg",
            "totalQuantitySold": 250
        },
        {
            "medicineName": "Ibuprofen 400mg",
            "totalQuantitySold": 180
        },
        {
            "medicineName": "Aspirin 75mg",
            "totalQuantitySold": 150
        }
    ],
    "salesByDate": [
        {
            "date": "2024-01-15",
            "totalAmount": 450.75,
            "transactionCount": 8
        },
        {
            "date": "2024-01-16",
            "totalAmount": 380.25,
            "transactionCount": 6
        }
    ]
}
```

---

## 7. Get Daily Sales Total
**GET** `/api/sales/daily-total/{date}`

### cURL Example
```bash
curl -X GET http://localhost:8080/mediShop/api/sales/daily-total/2024-01-15
```

### Expected Response (200 OK)
```json
{
    "date": "2024-01-15",
    "totalSalesAmount": 450.75,
    "transactionCount": 8,
    "uniqueCustomers": 6
}
```

### Error Response (404 Not Found - No sales for that date)
```json
{
    "timestamp": "2024-01-16T10:30:00.000+00:00",
    "status": 404,
    "error": "Not Found",
    "message": "No sales found for date: 2024-01-15",
    "path": "/api/sales/daily-total/2024-01-15"
}
```

---

## 8. Get Sales Total Between Dates
**GET** `/api/sales/total-between-dates`

### Query Parameters
- `startDate` (required): Start date (YYYY-MM-DD format)
- `endDate` (required): End date (YYYY-MM-DD format)

### cURL Example
```bash
curl -X GET "http://localhost:8080/mediShop/api/sales/total-between-dates?startDate=2024-01-01&endDate=2024-01-31"
```

### Expected Response (200 OK)
```json
{
    "startDate": "2024-01-01",
    "endDate": "2024-01-31",
    "totalSalesAmount": 5420.50,
    "totalTransactions": 125,
    "averageDailySales": 174.85,
    "uniqueCustomers": 85
}
```

---

## 9. Get Unique Sales IDs
**GET** `/api/sales/unique-sales-ids`

### cURL Example
```bash
curl -X GET http://localhost:8080/mediShop/api/sales/unique-sales-ids
```

### Expected Response (200 OK)
```json
{
    "uniqueSalesIds": [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010],
    "totalUniqueSalesIds": 10
}
```

---

## 10. Get Medicine-wise Sales Quantity
**GET** `/api/sales/medicine-wise-quantity`

### cURL Example
```bash
curl -X GET http://localhost:8080/mediShop/api/sales/medicine-wise-quantity
```

### Expected Response (200 OK)
```json
[
    {
        "medicineName": "Paracetamol 500mg",
        "totalQuantitySold": 250
    },
    {
        "medicineName": "Ibuprofen 400mg",
        "totalQuantitySold": 180
    },
    {
        "medicineName": "Aspirin 75mg",
        "totalQuantitySold": 150
    },
    {
        "medicineName": "Omeprazole 20mg",
        "totalQuantitySold": 120
    }
]
```

---

## 11. Get Sales by Customer Phone Number
**GET** `/api/sales/customer/{phoneNumber}`

### cURL Example
```bash
curl -X GET http://localhost:8080/mediShop/api/sales/customer/01512345678
```

### Expected Response (200 OK)
```json
[
    {
        "itemsId": 1,
        "salesId": 1001,
        "customerPhoneNumber": "01512345678",
        "salesDate": "2024-01-15",
        "medicineName": "Paracetamol 500mg",
        "medicineUnitPrice": 2.50,
        "perMedicineTotalQuantity": 10,
        "perMedicineTotalAmount": 25.00,
        "totalPricePerCustomerTransaction": 25.00
    },
    {
        "itemsId": 5,
        "salesId": 1005,
        "customerPhoneNumber": "01512345678",
        "salesDate": "2024-01-18",
        "medicineName": "Vitamin D3",
        "medicineUnitPrice": 15.00,
        "perMedicineTotalQuantity": 2,
        "perMedicineTotalAmount": 30.00,
        "totalPricePerCustomerTransaction": 30.00
    }
]
```

---

## 12. Get Sales by Medicine Name
**GET** `/api/sales/medicine/{medicineName}`

### cURL Example
```bash
curl -X GET "http://localhost:8080/mediShop/api/sales/medicine/Paracetamol%20500mg"
```

### Expected Response (200 OK)
```json
[
    {
        "itemsId": 1,
        "salesId": 1001,
        "customerPhoneNumber": "01512345678",
        "salesDate": "2024-01-15",
        "medicineName": "Paracetamol 500mg",
        "medicineUnitPrice": 2.50,
        "perMedicineTotalQuantity": 10,
        "perMedicineTotalAmount": 25.00,
        "totalPricePerCustomerTransaction": 25.00
    },
    {
        "itemsId": 8,
        "salesId": 1008,
        "customerPhoneNumber": "01598765432",
        "salesDate": "2024-01-20",
        "medicineName": "Paracetamol 500mg",
        "medicineUnitPrice": 2.50,
        "perMedicineTotalQuantity": 20,
        "perMedicineTotalAmount": 50.00,
        "totalPricePerCustomerTransaction": 50.00
    }
]
```

---

## Common HTTP Status Codes

| Status Code | Description | When it occurs |
|-------------|-------------|----------------|
| 200 | OK | Successful GET, PUT operations |
| 201 | Created | Successful POST (add sales record) |
| 204 | No Content | Successful DELETE operation |
| 400 | Bad Request | Invalid input data, validation errors |
| 404 | Not Found | Sales record not found or no data for specified criteria |
| 409 | Conflict | Duplicate sales record or constraint violation |

---

## Error Response Examples

### 400 Bad Request (Validation Error)
```json
{
    "timestamp": "2024-01-16T10:30:00.000+00:00",
    "status": 400,
    "error": "Bad Request",
    "message": "Validation failed: Medicine unit price must be positive",
    "path": "/api/sales"
}
```

### 404 Not Found (Sales Record Not Found)
```json
{
    "timestamp": "2024-01-16T10:30:00.000+00:00",
    "status": 404,
    "error": "Not Found",
    "message": "Sales record with items ID 999 not found",
    "path": "/api/sales/999"
}
```

### 409 Conflict (Business Rule Violation)
```json
{
    "timestamp": "2024-01-16T10:30:00.000+00:00",
    "status": 409,
    "error": "Conflict",
    "message": "Per medicine total amount does not match unit price × quantity",
    "path": "/api/sales"
}
```

---

## Sample Multiple Medicine Transaction
For transactions involving multiple medicines, you would typically create multiple sales records with the same `salesId` but different medicine details:

### First Medicine in Transaction
```json
{
    "salesId": 2001,
    "customerPhoneNumber": "01512345678",
    "salesDate": "2024-01-20",
    "medicineName": "Paracetamol 500mg",
    "medicineUnitPrice": 2.50,
    "perMedicineTotalQuantity": 10,
    "perMedicineTotalAmount": 25.00,
    "totalPricePerCustomerTransaction": 55.00
}
```

### Second Medicine in Same Transaction
```json
{
    "salesId": 2001,
    "customerPhoneNumber": "01512345678",
    "salesDate": "2024-01-20",
    "medicineName": "Ibuprofen 400mg",
    "medicineUnitPrice": 3.00,
    "perMedicineTotalQuantity": 10,
    "perMedicineTotalAmount": 30.00,
    "totalPricePerCustomerTransaction": 55.00
}
```

---

## Postman Collection Import

You can import these API calls into Postman by creating a new collection and adding each request with the appropriate method, URL, headers, and body content as shown above. Remember to:

1. Set the base URL as an environment variable
2. Use proper Content-Type headers for POST/PUT requests
3. Handle URL encoding for query parameters with special characters
4. Set up authentication if your API requires it

---

## Data Validation Rules

Based on the entity structure, ensure the following validation rules when making API calls:

- `salesId`: Required, positive integer
- `customerPhoneNumber`: Required, valid phone number format
- `salesDate`: Required, valid date format (YYYY-MM-DD)
- `medicineName`: Required, non-empty string
- `medicineUnitPrice`: Required, positive decimal number
- `perMedicineTotalQuantity`: Required, positive integer
- `perMedicineTotalAmount`: Required, positive decimal (should equal unitPrice × quantity)
- `totalPricePerCustomerTransaction`: Required, positive decimal (sum of all medicines in the transaction)