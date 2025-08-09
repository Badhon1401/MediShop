# MediShop: Smart Medical Inventory Management System

![MediShop](https://img.shields.io/badge/Status-In%20Development-yellow)
![Frontend](https://img.shields.io/badge/Frontend-React.js-blue)
![Backend](https://img.shields.io/badge/Backend-Spring%20Boot-green)
![Database](https://img.shields.io/badge/Database-PostgreSQL-blue)

## 📋 Overview

MediShop is an advanced, web-based inventory management system designed specifically for clinics and pharmacies to streamline their medicine inventory operations. The platform provides real-time tracking of stock levels, batch expirations, supplier details, and purchase costs, ensuring operational efficiency and reducing waste.

### ✨ Key Features

- 🏥 **Real-time Inventory Management** - Track medicine stock levels and availability
- ⏰ **Smart Expiry Alerts** - Automated notifications for approaching expiration dates
- 📊 **Analytics Dashboard** - Comprehensive insights into stock consumption and trends
- 👥 **Role-based Access Control** - Different permissions for managers, salespersons, and customers
- 🔍 **Advanced Search & Filtering** - Find medicines by name, batch, supplier, or category
- 📈 **Supplier Performance Tracking** - Monitor and evaluate supplier reliability
- 💰 **Cost Management** - Track buying, selling prices, and discount metrics

## 🏗️ Architecture

This project follows a **modular monorepo structure** with clean architecture principles:

```
MediShop/
├── backend/           # Spring Boot API
├── frontend/          # React.js Application
├── README.md
└── .gitignore
```

### Technology Stack

**Frontend:**
- React.js with TypeScript
- Modern UI components
- State management
- Responsive design

**Backend:**
- Spring Boot (Java)
- RESTful APIs
- Clean Architecture pattern
- Domain-driven design

**Database:**
- PostgreSQL
- Optimized schema design
- ACID compliance

**Integrations:**
- Twilio/Email API for alerts
- Export functionality (PDF/CSV)

## 👥 User Roles

### 🔧 Pharmacist / Inventory Manager
- Complete medicine management (CRUD operations)
- Stock quantity and batch metadata management
- Price and discount configuration
- Storage location assignment
- Supplier relationship management

### 💼 Salesperson
- Medicine sales recording
- Stock quantity adjustments
- Transaction management

### 👤 Patient (Customer)
- View available medicines
- Browse medicine details and pricing
- Check stock availability

## 🗄️ Database Schema

### Core Tables

- **User**: User authentication and role management
- **Medicine**: Medicine catalog with metadata
- **Inventory**: Stock tracking with batch-level details
- **Sales**: Transaction records and sales history
- **Supplier**: Supplier information and contacts
- **Customer**: Customer information and registration

## 🚀 Getting Started

### Prerequisites

- Java 11 or higher
- Node.js 16+ and npm/yarn
- PostgreSQL 12+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Badhon1401/MediShop.git
   cd medishop
   ```

2. **Backend Setup**
   ```bash
   cd backend
   mvn clean  (optional)
   mvn clean install
   mvn clean spring-boot:run
   ```

3. **Frontend Setup**
   ```bash
   cd frontend/mediShop-ui
   npm install
   npm run dev
   ```

4. **Database Setup**
   ```bash
   # Create PostgreSQL database
   createdb medishop_db
   
   # Update application.properties with your database credentials
   ```

### Configuration

Update `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/medishop_db
spring.datasource.username=your_username
spring.datasource.password=your_password

# Email/SMS configuration for alerts
twilio.account.sid=your_twilio_sid
twilio.auth.token=your_twilio_token
```

## 📱 API Documentation

Once the backend is running, access the API documentation at:
- **Swagger UI**: `http://localhost:8080/swagger-ui.html`
- **OpenAPI JSON**: `http://localhost:8080/api-docs`

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend/mediShop-ui
npm test
```

## 📊 Features by Module

### Medicine Management 
- Add, edit, delete medicine entries
- Batch-level tracking
- Categorization and storage management
- Price and discount configuration

### Expiry Tracking 
- Batch-wise expiry date management
- Automated expiry alerts
- Expired medicine audit reports

### Stock Management 
- Minimum stock threshold settings
- Low stock notifications
- Real-time quantity tracking

### Reporting & Analytics 
- Daily, weekly, monthly reports
- Sales volume and trend analysis
- Export capabilities (PDF/CSV)
- Performance dashboards

### Supplier Management 
- Supplier profile management
- Performance evaluation
- Purchase history tracking

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style and architecture
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 Development Team

- **Hasnain** 
- **Rakibul** 
- **Badhon**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Issues

Found a bug or have a feature request? Please open an issue on the [GitHub Issues](https://github.com/your-username/medishop/issues) page.

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

## 🔄 Project Status

**Current Phase**: Development in Progress

### Upcoming Features
- Advanced analytics with ML
- Barcode scanning integration
- Mobile application

---

**Made with ❤️ for healthcare management**
