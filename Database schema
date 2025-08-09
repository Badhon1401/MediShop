# MediShop Database Schema Documentation

## 📊 Database Overview

The MediShop system uses PostgreSQL as its primary database with a normalized schema designed to efficiently manage medical inventory, user access, sales transactions, and supplier relationships.

## 🗂️ Entity Relationship Diagram

```mermaid
erDiagram
    USER {
        int user_id PK
        string name
        string email UK
        string phone
        enum role
        string password
    }
    
    MEDICINE {
        int medicine_id PK
        string name
        enum type
        string batch_number UK
        string description
        double unit_price
        string company_name
    }
    
    SUPPLIER {
        int supplier_id PK
        string company_name
        string email
        string phone
        boolean status
    }
    
    INVENTORY {
        int inventory_id PK
        string medicine_name
        string batch_number
        string company_name
        date expiry_date
        string location
        timestamp last_updated
        enum type
        date purchase_date
        int total_quantity
        int available_quantity
        int unit_price
        int purchase_price
        int discount
    }
    
    SALES {
        int sales_id
        int items_id PK
        string customer_phoneNumber
        date sales_date
        string medicine_name
        double medicine_unit_price
        int per_medicine_total_quantity
        double per_medicine_total_amount
        double total_price_per_customer_transaction
    }
    
    CUSTOMER {
        int customer_id PK
        string name
        string contact_number
        date registration_date
    }
    
    %% Relationships
    MEDICINE ||--o{ INVENTORY : "has batches"
    SUPPLIER ||--o{ INVENTORY : "supplies"
    INVENTORY ||--o{ SALES : "sold from"
    CUSTOMER ||--o{ SALES : "purchases"
    USER ||--o{ INVENTORY : "manages"
```

## 📋 Table Specifications

### 1. User Table
Manages system users with role-based access control.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `user_id` | Integer | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for each user |
| `name` | String(100) | NOT NULL | Full name of the user |
| `email` | String(150) | NOT NULL, UNIQUE | Login email with validation |
| `phone` | String(15) | NOT NULL | Bangladeshi phone number with validation |
| `role` | Enum | NOT NULL | Role (Manager, Salesperson) |
| `password` | String(255) | NOT NULL | Hashed password |

**Business Rules:**
- Email must be unique across the system
- Phone number must follow Bangladeshi format
- Passwords must be hashed before storage
- Only two roles are supported: Manager and Salesperson

---

### 2. Medicine Table
Core medicine catalog with basic information.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `medicine_id` | Integer | PRIMARY KEY, AUTO_INCREMENT | Unique medicine identifier |
| `name` | String(200) | NOT NULL | Name of the medicine |
| `type` | Enum | NOT NULL | Medicine type (Tablet, Syrup, Injection, etc.) |
| `batch_number` | String(50) | UNIQUE, NOT NULL | Unique batch identifier |
| `description` | String(500) | NULLABLE | Optional medicine description |
| `unit_price` | Double | NOT NULL, CHECK > 0 | Base selling price per unit |
| `company_name` | String(100) | NOT NULL | Manufacturing company name |

**Business Rules:**
- Batch numbers must be globally unique
- Unit price must be positive
- Medicine types are predefined enums

---

### 3. Supplier Table
Manages supplier information and relationships.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `supplier_id` | Integer | PRIMARY KEY, AUTO_INCREMENT | Unique supplier identifier |
| `company_name` | String(150) | NOT NULL | Supplier company name |
| `email` | String(150) | NULLABLE | Supplier contact email |
| `phone` | String(15) | NULLABLE | Supplier contact phone |
| `status` | Boolean | NOT NULL, DEFAULT TRUE | Active/Inactive status |

**Business Rules:**
- Suppliers can be marked as inactive but not deleted
- Contact information is optional but recommended

---

### 4. Inventory Table
Central table managing stock levels, locations, and financial data.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `inventory_id` | Integer | PRIMARY KEY, AUTO_INCREMENT | Unique inventory entry identifier |
| `medicine_name` | String(200) | NOT NULL | Referenced medicine name |
| `batch_number` | String(50) | NOT NULL | Medicine batch number |
| `company_name` | String(100) | NOT NULL | Medicine company name |
| `expiry_date` | Date | NOT NULL | Batch expiration date |
| `location` | String(100) | NOT NULL | Storage location (shelf/section) |
| `last_updated` | Timestamp | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Last modification time |
| `type` | Enum | NOT NULL | Medicine type |
| `purchase_date` | Date | NOT NULL | Date of stock purchase |
| `total_quantity` | Integer | NOT NULL, CHECK >= 0 | Total quantity purchased |
| `available_quantity` | Integer | NOT NULL, CHECK >= 0 | Remaining quantity in stock |
| `unit_price` | Integer | NOT NULL, CHECK > 0 | Selling price per unit |
| `purchase_price` | Integer | NOT NULL, CHECK > 0 | Purchase cost per unit |
| `discount` | Integer | NOT NULL, DEFAULT 0, CHECK >= 0 | Discount amount on selling price |

**Business Rules:**
- Available quantity cannot exceed total quantity
- Expiry date must be in the future when adding new stock
- Purchase price should typically be less than selling price
- Location helps in physical inventory management

---

### 5. Sales Table
Records all sales transactions with detailed breakdown.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `sales_id` | Integer | NOT NULL | Transaction group identifier (can repeat) |
| `items_id` | Integer | PRIMARY KEY, AUTO_INCREMENT | Unique sales item identifier |
| `customer_phoneNumber` | String(15) | NULLABLE | Customer contact number |
| `sales_date` | Date | NOT NULL, DEFAULT CURRENT_DATE | Date of sale |
| `medicine_name` | String(200) | NOT NULL | Name of sold medicine |
| `medicine_unit_price` | Double | NOT NULL, CHECK > 0 | Price per unit at time of sale |
| `per_medicine_total_quantity` | Integer | NOT NULL, CHECK > 0 | Quantity sold for this medicine |
| `per_medicine_total_amount` | Double | NOT NULL, CHECK > 0 | Total amount for this medicine |
| `total_price_per_customer_transaction` | Double | NOT NULL, CHECK > 0 | Total transaction amount |

**Business Rules:**
- Multiple medicines can share the same `sales_id` (one transaction)
- Each medicine line item gets unique `items_id`
- Prices are captured at time of sale for historical accuracy
- Customer phone number is optional (walk-in customers)

---

### 6. Customer Table
Manages customer information and registration details.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `customer_id` | Integer | PRIMARY KEY, AUTO_INCREMENT | Unique customer identifier |
| `name` | String(100) | NOT NULL | Customer full name |
| `contact_number` | String(15) | NULLABLE | Optional customer phone number |
| `registration_date` | Date | NOT NULL, DEFAULT CURRENT_DATE | Customer registration date |

**Business Rules:**
- Customer registration is optional for purchases
- Contact information helps with follow-ups and loyalty programs

## 🔗 Table Relationships

### Primary Relationships

1. **Medicine → Inventory** (One-to-Many)
   - One medicine can have multiple inventory batches
   - Relationship: `medicine.batch_number = inventory.batch_number`

2. **Supplier → Inventory** (One-to-Many)
   - One supplier can supply multiple inventory items
   - Relationship: Implicit through supplier management

3. **Inventory → Sales** (One-to-Many)
   - One inventory item can be sold multiple times
   - Relationship: `inventory.medicine_name = sales.medicine_name`

4. **Customer → Sales** (One-to-Many)
   - One customer can make multiple purchases
   - Relationship: `customer.contact_number = sales.customer_phoneNumber`

5. **User → Inventory** (One-to-Many)
   - Users manage inventory items based on their roles
   - Relationship: Through application logic and user roles

### Foreign Key Constraints

```sql
-- Example FK constraints to be implemented
ALTER TABLE inventory 
ADD CONSTRAINT fk_inventory_medicine 
FOREIGN KEY (batch_number) REFERENCES medicine(batch_number);

ALTER TABLE sales 
ADD CONSTRAINT fk_sales_customer 
FOREIGN KEY (customer_phoneNumber) REFERENCES customer(contact_number);
```

## 📈 Indexes for Performance

### Recommended Indexes

```sql
-- Inventory table indexes
CREATE INDEX idx_inventory_medicine_name ON inventory(medicine_name);
CREATE INDEX idx_inventory_expiry_date ON inventory(expiry_date);
CREATE INDEX idx_inventory_available_qty ON inventory(available_quantity);
CREATE INDEX idx_inventory_location ON inventory(location);

-- Sales table indexes
CREATE INDEX idx_sales_date ON sales(sales_date);
CREATE INDEX idx_sales_customer ON sales(customer_phoneNumber);
CREATE INDEX idx_sales_medicine ON sales(medicine_name);

-- Medicine table indexes
CREATE INDEX idx_medicine_name ON medicine(name);
CREATE INDEX idx_medicine_type ON medicine(type);
CREATE INDEX idx_medicine_company ON medicine(company_name);

-- User table indexes
CREATE INDEX idx_user_email ON user(email);
CREATE INDEX idx_user_role ON user(role);
```

## 🚨 Data Integrity Rules

### Business Logic Constraints

1. **Stock Validation**
   - `available_quantity <= total_quantity`
   - Cannot sell more than available stock

2. **Date Validation**
   - `expiry_date > purchase_date`
   - `sales_date >= purchase_date`

3. **Price Validation**
   - All prices must be positive
   - `unit_price >= purchase_price` (recommended)

4. **Quantity Validation**
   - All quantities must be non-negative
   - Sales quantity must not exceed available stock

## 🔄 Common Queries

### Frequently Used Query Patterns

1. **Low Stock Alert**
```sql
SELECT * FROM inventory 
WHERE available_quantity < 10 
ORDER BY available_quantity ASC;
```

2. **Expiring Soon**
```sql
SELECT * FROM inventory 
WHERE expiry_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '30 days'
ORDER BY expiry_date ASC;
```

3. **Sales Report**
```sql
SELECT medicine_name, SUM(per_medicine_total_quantity) as total_sold,
       SUM(per_medicine_total_amount) as total_revenue
FROM sales 
WHERE sales_date BETWEEN '2024-01-01' AND '2024-12-31'
GROUP BY medicine_name;
```

## 📊 Data Analytics Considerations

- **Partitioning**: Consider partitioning `sales` table by date for large datasets
- **Archiving**: Implement data archiving for old sales and expired inventory records
- **Audit Trail**: Consider adding audit columns (created_by, updated_by, timestamps)
- **Soft Deletes**: Implement soft deletes for critical business data
