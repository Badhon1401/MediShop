# MediShop Project File Structure Documentation

## 📁 Project Architecture Overview

The MediShop project follows a **modular monorepo architecture** with clear separation between frontend and backend concerns. The structure implements **Clean Architecture** principles with **Domain-Driven Design (DDD)** patterns.

```
MediShop/
├── 📂 backend/                    # Spring Boot Application
├── 📂 frontend/                   # React.js Application
├── 📄 README.md                   # Project documentation
├── 📄 DATABASE_SCHEMA.md          # Database schema documentation
├── 📄 FILE_STRUCTURE.md           # This file
├── 🔧 .gitignore                  # Git ignore rules
├── 🔧 docker-compose.yml          # Docker orchestration (optional)
└── 🔧 .env.example                # Environment variables template
```

## 🔧 Backend Structure (Spring Boot)

The backend follows **Clean Architecture** with **Domain-Driven Design** principles, organized into distinct modules by business domain.

### 📂 Complete Backend Structure

```
backend/
├── 📂 src/
│   ├── 📂 main/
│   │   ├── 📂 java/
│   │   │   └── 📂 com.mediShop/           # Root package
│   │   │       ├── 📂 medicine/           # Medicine Domain Module
│   │   │       │   ├── 📂 domain/         # Business Logic Layer
│   │   │       │   │   ├── 📂 entity/     # Domain Entities
│   │   │       │   │   │   ├── 📄 Medicine.java
│   │   │       │   │   │   ├── 📄 MedicineBatch.java
│   │   │       │   │   │   └── 📄 MedicineCategory.java
│   │   │       │   │   ├── 📂 repository/ # Domain Repositories (Interfaces)
│   │   │       │   │   │   ├── 📄 MedicineRepository.java
│   │   │       │   │   │   └── 📄 MedicineBatchRepository.java
│   │   │       │   │   ├── 📂 service/    # Domain Services
│   │   │       │   │   │   ├── 📄 MedicineService.java
│   │   │       │   │   │   ├── 📄 ExpiryTrackingService.java
│   │   │       │   │   │   └── 📄 StockAlertService.java
│   │   │       │   │   └── 📂 valueobject/ # Value Objects
│   │   │       │   │       ├── 📄 MedicineType.java
│   │   │       │   │       ├── 📄 BatchNumber.java
│   │   │       │   │       └── 📄 Price.java
│   │   │       │   ├── 📂 application/    # Application Layer
│   │   │       │   │   ├── 📂 usecase/    # Use Cases/Application Services
│   │   │       │   │   │   ├── 📄 AddMedicineUseCase.java
│   │   │       │   │   │   ├── 📄 UpdateMedicineUseCase.java
│   │   │       │   │   │   ├── 📄 DeleteMedicineUseCase.java
│   │   │       │   │   │   ├── 📄 SearchMedicineUseCase.java
│   │   │       │   │   │   ├── 📄 CheckExpiryUseCase.java
│   │   │       │   │   │   └── 📄 GenerateStockAlertUseCase.java
│   │   │       │   │   ├── 📂 dto/         # Data Transfer Objects
│   │   │       │   │   │   ├── 📄 MedicineRequestDto.java
│   │   │       │   │   │   ├── 📄 MedicineResponseDto.java
│   │   │       │   │   │   ├── 📄 MedicineSearchDto.java
│   │   │       │   │   │   └── 📄 ExpiryAlertDto.java
│   │   │       │   │   └── 📂 exception/  # Application Exceptions
│   │   │       │   │       ├── 📄 MedicineNotFoundException.java
│   │   │       │   │       ├── 📄 DuplicateBatchException.java
│   │   │       │   │       └── 📄 InvalidMedicineDataException.java
│   │   │       │   └── 📂 infrastructure/ # Infrastructure Layer
│   │   │       │       ├── 📂 web/        # REST Controllers
│   │   │       │       │   ├── 📄 MedicineController.java
│   │   │       │       │   ├── 📄 ExpiryController.java
│   │   │       │       │   └── 📄 StockAlertController.java
│   │   │       │       ├── 📂 persistence/ # Database Implementation
│   │   │       │       │   ├── 📂 entity/ # JPA Entities
│   │   │       │       │   │   ├── 📄 MedicineEntity.java
│   │   │       │       │   │   └── 📄 MedicineBatchEntity.java
│   │   │       │       │   ├── 📂 repository/ # JPA Repositories
│   │   │       │       │   │   ├── 📄 JpaMedicineRepository.java
│   │   │       │       │   │   └── 📄 JpaMedicineBatchRepository.java
│   │   │       │       │   └── 📂 mapper/ # Entity-Domain Mappers
│   │   │       │       │       ├── 📄 MedicineMapper.java
│   │   │       │       │       └── 📄 MedicineBatchMapper.java
│   │   │       │       └── 📂 exception/ # Infrastructure Exceptions
│   │   │       │           ├── 📄 DatabaseException.java
│   │   │       │           └── 📄 MedicineInfrastructureException.java
│   │   │       │
│   │   │       ├── 📂 user/               # User Management Module
│   │   │       │   ├── 📂 domain/
│   │   │       │   │   ├── 📂 entity/
│   │   │       │   │   │   ├── 📄 User.java
│   │   │       │   │   │   └── 📄 UserRole.java
│   │   │       │   │   ├── 📂 repository/
│   │   │       │   │   │   └── 📄 UserRepository.java
│   │   │       │   │   ├── 📂 service/
│   │   │       │   │   │   ├── 📄 UserService.java
│   │   │       │   │   │   └── 📄 AuthenticationService.java
│   │   │       │   │   └── 📂 valueobject/
│   │   │       │   │       ├── 📄 Email.java
│   │   │       │   │       ├── 📄 PhoneNumber.java
│   │   │       │   │       └── 📄 Password.java
│   │   │       │   ├── 📂 application/
│   │   │       │   │   ├── 📂 usecase/
│   │   │       │   │   │   ├── 📄 RegisterUserUseCase.java
│   │   │       │   │   │   ├── 📄 LoginUseCase.java
│   │   │       │   │   │   ├── 📄 UpdateUserUseCase.java
│   │   │       │   │   │   └── 📄 DeleteUserUseCase.java
│   │   │       │   │   ├── 📂 dto/
│   │   │       │   │   │   ├── 📄 UserRegistrationDto.java
│   │   │       │   │   │   ├── 📄 LoginRequestDto.java
│   │   │       │   │   │   ├── 📄 UserResponseDto.java
│   │   │       │   │   │   └── 📄 AuthenticationResponseDto.java
│   │   │       │   │   └── 📂 exception/
│   │   │       │   │       ├── 📄 UserNotFoundException.java
│   │   │       │   │       ├── 📄 DuplicateEmailException.java
│   │   │       │   │       └── 📄 InvalidCredentialsException.java
│   │   │       │   └── 📂 infrastructure/
│   │   │       │       ├── 📂 web/
│   │   │       │       │   ├── 📄 UserController.java
│   │   │       │       │   └── 📄 AuthController.java
│   │   │       │       ├── 📂 persistence/
│   │   │       │       │   ├── 📂 entity/
│   │   │       │       │   │   └── 📄 UserEntity.java
│   │   │       │       │   ├── 📂 repository/
│   │   │       │       │   │   └── 📄 JpaUserRepository.java
│   │   │       │       │   └── 📂 mapper/
│   │   │       │       │       └── 📄 UserMapper.java
│   │   │       │       └── 📂 security/
│   │   │       │           ├── 📄 JwtTokenProvider.java
│   │   │       │           ├── 📄 PasswordEncoder.java
│   │   │       │           └── 📄 SecurityUtils.java
│   │   │       │
│   │   │       ├── 📂 inventory/          # Inventory Management Module
│   │   │       │   ├── 📂 domain/
│   │   │       │   │   ├── 📂 entity/
│   │   │       │   │   │   ├── 📄 Inventory.java
│   │   │       │   │   │   ├── 📄 StockMovement.java
│   │   │       │   │   │   └── 📄 Location.java
│   │   │       │   │   ├── 📂 repository/
│   │   │       │   │   │   ├── 📄 InventoryRepository.java
│   │   │       │   │   │   └── 📄 StockMovementRepository.java
│   │   │       │   │   ├── 📂 service/
│   │   │       │   │   │   ├── 📄 InventoryService.java
│   │   │       │   │   │   ├── 📄 StockTrackingService.java
│   │   │       │   │   │   └── 📄 LocationService.java
│   │   │       │   │   └── 📂 valueobject/
│   │   │       │   │       ├── 📄 Quantity.java
│   │   │       │   │       ├── 📄 LocationCode.java
│   │   │       │   │       └── 📄 StockLevel.java
│   │   │       │   ├── 📂 application/
│   │   │       │   │   ├── 📂 usecase/
│   │   │       │   │   │   ├── 📄 AddInventoryUseCase.java
│   │   │       │   │   │   ├── 📄 UpdateInventoryUseCase.java
│   │   │       │   │   │   ├── 📄 TransferStockUseCase.java
│   │   │       │   │   │   └── 📄 GetInventoryReportUseCase.java
│   │   │       │   │   ├── 📂 dto/
│   │   │       │   │   │   ├── 📄 InventoryRequestDto.java
│   │   │       │   │   │   ├── 📄 InventoryResponseDto.java
│   │   │       │   │   │   ├── 📄 StockTransferDto.java
│   │   │       │   │   │   └── 📄 InventoryReportDto.java
│   │   │       │   │   └── 📂 exception/
│   │   │       │   │       ├── 📄 InsufficientStockException.java
│   │   │       │   │       ├── 📄 LocationNotFoundException.java
│   │   │       │   │       └── 📄 InventoryNotFoundException.java
│   │   │       │   └── 📂 infrastructure/
│   │   │       │       ├── 📂 web/
│   │   │       │       │   ├── 📄 InventoryController.java
│   │   │       │       │   └── 📄 StockMovementController.java
│   │   │       │       ├── 📂 persistence/
│   │   │       │       │   ├── 📂 entity/
│   │   │       │       │   │   ├── 📄 InventoryEntity.java
│   │   │       │       │   │   └── 📄 StockMovementEntity.java
│   │   │       │       │   ├── 📂 repository/
│   │   │       │       │   │   ├── 📄 JpaInventoryRepository.java
│   │   │       │       │   │   └── 📄 JpaStockMovementRepository.java
│   │   │       │       │   └── 📂 mapper/
│   │   │       │       │       ├── 📄 InventoryMapper.java
│   │   │       │       │       └── 📄 StockMovementMapper.java
│   │   │       │       └── 📂 scheduler/
│   │   │       │           ├── 📄 InventoryAlertScheduler.java
│   │   │       │           └── 📄 ExpiryCheckScheduler.java
│   │   │       │
│   │   │       ├── 📂 supplier/           # Supplier Management Module
│   │   │       │   ├── 📂 domain/
│   │   │       │   │   ├── 📂 entity/
│   │   │       │   │   │   ├── 📄 Supplier.java
│   │   │       │   │   │   └── 📄 SupplierContact.java
│   │   │       │   │   ├── 📂 repository/
│   │   │       │   │   │   └── 📄 SupplierRepository.java
│   │   │       │   │   └── 📂 service/
│   │   │       │   │       ├── 📄 SupplierService.java
│   │   │       │   │       └── 📄 SupplierPerformanceService.java
│   │   │       │   ├── 📂 application/
│   │   │       │   │   ├── 📂 usecase/
│   │   │       │   │   │   ├── 📄 AddSupplierUseCase.java
│   │   │       │   │   │   ├── 📄 UpdateSupplierUseCase.java
│   │   │       │   │   │   ├── 📄 DeactivateSupplierUseCase.java
│   │   │       │   │   │   └── 📄 GetSupplierPerformanceUseCase.java
│   │   │       │   │   ├── 📂 dto/
│   │   │       │   │   │   ├── 📄 SupplierRequestDto.java
│   │   │       │   │   │   ├── 📄 SupplierResponseDto.java
│   │   │       │   │   │   └── 📄 SupplierPerformanceDto.java
│   │   │       │   │   └── 📂 exception/
│   │   │       │   │       ├── 📄 SupplierNotFoundException.java
│   │   │       │   │       └── 📄 DuplicateSupplierException.java
│   │   │       │   └── 📂 infrastructure/
│   │   │       │       ├── 📂 web/
│   │   │       │       │   └── 📄 SupplierController.java
│   │   │       │       └── 📂 persistence/
│   │   │       │           ├── 📂 entity/
│   │   │       │           │   └── 📄 SupplierEntity.java
│   │   │       │           ├── 📂 repository/
│   │   │       │           │   └── 📄 JpaSupplierRepository.java
│   │   │       │           └── 📂 mapper/
│   │   │       │               └── 📄 SupplierMapper.java
│   │   │       │
│   │   │       ├── 📂 sales/              # Sales Management Module
│   │   │       │   ├── 📂 domain/
│   │   │       │   │   ├── 📂 entity/
│   │   │       │   │   │   ├── 📄 Sale.java
│   │   │       │   │   │   ├── 📄 SaleItem.java
│   │   │       │   │   │   └── 📄 Customer.java
│   │   │       │   │   ├── 📂 repository/
│   │   │       │   │   │   ├── 📄 SalesRepository.java
│   │   │       │   │   │   └── 📄 CustomerRepository.java
│   │   │       │   │   └── 📂 service/
│   │   │       │   │       ├── 📄 SalesService.java
│   │   │       │   │       └── 📄 CustomerService.java
│   │   │       │   ├── 📂 application/
│   │   │       │   │   ├── 📂 usecase/
│   │   │       │   │   │   ├── 📄 ProcessSaleUseCase.java
│   │   │       │   │   │   ├── 📄 RegisterCustomerUseCase.java
│   │   │       │   │   │   └── 📄 GetSalesReportUseCase.java
│   │   │       │   │   ├── 📂 dto/
│   │   │       │   │   │   ├── 📄 SaleRequestDto.java
│   │   │       │   │   │   ├── 📄 SaleResponseDto.java
│   │   │       │   │   │   ├── 📄 CustomerRequestDto.java
│   │   │       │   │   │   ├── 📄 CustomerResponseDto.java
│   │   │       │   │   │   └── 📄 SalesReportDto.java
│   │   │       │   │   └── 📂 exception/
│   │   │       │   │       ├── 📄 SaleProcessingException.java
│   │   │       │   │       └── 📄 CustomerNotFoundException.java
│   │   │       │   └── 📂 infrastructure/
│   │   │       │       ├── 📂 web/
│   │   │       │       │   ├── 📄 SalesController.java
│   │   │       │       │   └── 📄 CustomerController.java
│   │   │       │       └── 📂 persistence/
│   │   │       │           ├── 📂 entity/
│   │   │       │           │   ├── 📄 SalesEntity.java
│   │   │       │           │   └── 📄 CustomerEntity.java
│   │   │       │           ├── 📂 repository/
│   │   │       │           │   ├── 📄 JpaSalesRepository.java
│   │   │       │           │   └── 📄 JpaCustomerRepository.java
│   │   │       │           └── 📂 mapper/
│   │   │       │               ├── 📄 SalesMapper.java
│   │   │       │               └── 📄 CustomerMapper.java
│   │   │       │
│   │   │       ├── 📂 reporting/          # Reporting & Analytics Module
│   │   │       │   ├── 📂 domain/
│   │   │       │   │   ├── 📂 entity/
│   │   │       │   │   │   ├── 📄 Report.java
│   │   │       │   │   │   └── 📄 Analytics.java
│   │   │       │   │   ├── 📂 repository/
│   │   │       │   │   │   └── 📄 ReportRepository.java
│   │   │       │   │   └── 📂 service/
│   │   │       │   │       ├── 📄 ReportGenerationService.java
│   │   │       │   │       └── 📄 AnalyticsService.java
│   │   │       │   ├── 📂 application/
│   │   │       │   │   ├── 📂 usecase/
│   │   │       │   │   │   ├── 📄 GenerateSalesReportUseCase.java
│   │   │       │   │   │   ├── 📄 GenerateInventoryReportUseCase.java
│   │   │       │   │   │   ├── 📄 GenerateExpiryReportUseCase.java
│   │   │       │   │   │   └── 📄 ExportReportUseCase.java
│   │   │       │   │   ├── 📂 dto/
│   │   │       │   │   │   ├── 📄 ReportRequestDto.java
│   │   │       │   │   │   ├── 📄 ReportResponseDto.java
│   │   │       │   │   │   └── 📄 AnalyticsDto.java
│   │   │       │   │   └── 📂 exception/
│   │   │       │   │       └── 📄 ReportGenerationException.java
│   │   │       │   └── 📂 infrastructure/
│   │   │       │       ├── 📂 web/
│   │   │       │       │   └── 📄 ReportController.java
│   │   │       │       ├── 📂 persistence/
│   │   │       │       │   ├── 📂 repository/
│   │   │       │       │   │   └── 📄 JpaReportRepository.java
│   │   │       │       │   └── 📂 mapper/
│   │   │       │       │       └── 📄 ReportMapper.java
│   │   │       │       └── 📂 export/
│   │   │       │           ├── 📄 PdfExportService.java
│   │   │       │           └── 📄 CsvExportService.java
│   │   │       │
│   │   │       ├── 📂 shared/             # Shared Components
│   │   │       │   ├── 📂 common/
│   │   │       │   │   ├── 📂 entity/
│   │   │       │   │   │   └── 📄 BaseEntity.java
│   │   │       │   │   ├── 📂 exception/
│   │   │       │   │   │   ├── 📄 DomainException.java
│   │   │       │   │   │   ├── 📄 ApplicationException.java
│   │   │       │   │   │   └── 📄 InfrastructureException.java
│   │   │       │   │   ├── 📂 validation/
│   │   │       │   │   │   ├── 📄 EmailValidator.java
│   │   │       │   │   │   ├── 📄 PhoneValidator.java
│   │   │       │   │   │   └── 📄 DateValidator.java
│   │   │       │   │   └── 📂 util/
│   │   │       │   │       ├── 📄 DateUtils.java
│   │   │       │   │       ├── 📄 StringUtils.java
│   │   │       │   │       └── 📄 NumberUtils.java
│   │   │       │   ├── 📂 notification/
│   │   │       │   │   ├── 📄 NotificationService.java
│   │   │       │   │   ├── 📄 EmailNotificationService.java
│   │   │       │   │   └── 📄 SmsNotificationService.java
│   │   │       │   └── 📂 audit/
│   │   │       │       ├── 📄 AuditLog.java
│   │   │       │       └── 📄 AuditService.java
│   │   │       │
│   │   │       ├── 📂 configuration/      # Configuration Classes
│   │   │       │   ├── 📄 SecurityConfig.java
│   │   │       │   ├── 📄 OpenApiConfig.java
│   │   │       │   ├── 📄 PersistenceConfig.java
│   │   │       │   ├── 📄 WebConfig.java
│   │   │       │   ├── 📄 JpaConfig.java
│   │   │       │   ├── 📄 EmailConfig.java
│   │   │       │   ├── 📄 SchedulingConfig.java
│   │   │       │   └── 📄 CacheConfig.java
│   │   │       │
│   │   │       └── 📄 MediShopApplication.java  # Main Application Class
│   │   │
│   │   └── 📂 resources/              # Application Resources
│   │       ├── 📄 application.properties      # Main configuration
│   │       ├── 📄 application-dev.properties  # Development config
│   │       ├── 📄 application-prod.properties # Production config
│   │       ├── 📄 application-test.properties # Test config
│   │       ├── 📂 db/                 # Database Scripts
│   │       │   ├── 📂 migration/      # Flyway/Liquibase migrations
│   │       │   │   ├── 📄 V001__Create_User_Table.sql
│   │       │   │   ├── 📄 V002__Create_Medicine_Table.sql
│   │       │   │   ├── 📄 V003__Create_Supplier_Table.sql
│   │       │   │   ├── 📄 V004__Create_Inventory_Table.sql
│   │       │   │   ├── 📄 V005__Create_Sales_Table.sql
│   │       │   │   ├── 📄 V006__Create_Customer_Table.sql
│   │       │   │   └── 📄 V007__Add_Indexes.sql
│   │       │   └── 📂 seed/           # Test/Demo data
│   │       │       ├── 📄 demo-users.sql
│   │       │       ├── 📄 demo-medicines.sql
│   │       │       └── 📄 demo-inventory.sql
│   │       ├── 📂 templates/          # Email/Report templates
│   │       │   ├── 📄 expiry-alert.html
│   │       │   ├── 📄 low-stock-alert.html
│   │       │   └── 📄 sales-report.html
│   │       └── 📂 static/             # Static resources
│   │           ├── 📂 css/
│   │           ├── 📂 js/
│   │           └── 📂 images/
│   │
│   └── 📂 test/                      # Test Directory
│       └── 📂 java/
│           └── 📂 com.mediShop/
│               ├── 📂 medicine/
│               │   ├── 📂 domain/
│               │   │   ├── 📄 MedicineTest.java
│               │   │   └── 📄 MedicineServiceTest.java
│               │   ├── 📂 application/
│               │   │   └── 📄 AddMedicineUseCaseTest.java
│               │   └── 📂 infrastructure/
│               │       └── 📄 MedicineControllerTest.java
│               ├── 📂 user/
│               │   ├── 📂 domain/
│               │   │   └── 📄 UserServiceTest.java
│               │   ├── 📂 application/
│               │   │   └── 📄 LoginUseCaseTest.java
│               │   └── 📂 infrastructure/
│               │       └── 📄 AuthControllerTest.java
│               ├── 📂 inventory/
│               │   ├── 📂 domain/
│               │   │   └── 📄 InventoryServiceTest.java
│               │   ├── 📂 application/
│               │   │   └── 📄 AddInventoryUseCaseTest.java
│               │   └── 📂 infrastructure/
│               │       └── 📄 InventoryControllerTest.java
│               ├── 📂 integration/
│               │   ├── 📄 MedicineIntegrationTest.java
│               │   ├── 📄 UserIntegrationTest.java
│               │   └── 📄 InventoryIntegrationTest.java
│               └── 📄 MediShopApplicationTest.java
│
├── 📄 pom.xml                        # Maven configuration
├── 📄 Dockerfile                     # Docker container config
└── 📄 .gitignore                     # Backend Git ignore rules
```

### 📋 Backend Layer Responsibilities

#### 1. **Domain Layer** 
- **Entities**: Business objects with identity and lifecycle
- **Value Objects**: Immutable objects that represent concepts
- **Repositories**: Interfaces for data access
- **Services**: Business logic that doesn't naturally fit in entities

#### 2. **Application Layer**
- **Use Cases**: Application-specific business rules
- **DTOs**: Data transfer objects for API communication
- **Exceptions**: Application-level error handling

#### 3. **Infrastructure Layer**
- **Web**: REST controllers and API endpoints
- **Persistence**: Database implementation and JPA entities
- **External Services**: Third-party integrations (email, SMS)

---

## 🎨 Frontend Structure (React.js)

The frontend follows a **feature-based modular architecture** with shared components and utilities.

### 📂 Complete Frontend Structure

```
frontend/
└── 📂 mediShop-ui/
    ├── 📂 public/                    # Static Public Files
    │   ├── 📄 index.html             # Main HTML template
    │   ├── 📄 favicon.ico            # Application icon
    │   ├── 📄 manifest.json          # PWA manifest
    │   ├── 📂 icons/                 # App icons
    │   └── 📂 images/                # Static images
    │
    ├── 📂 src/                       # Source Code
    │   ├── 📂 app/                   # App Configuration
    │   │   ├── 📄 App.tsx            # Main App component
    │   │   ├── 📄 App.css            # Global app styles
    │   │   ├── 📄 routes.tsx         # Route definitions
    │   │   ├── 📂 store/             # State Management
    │   │   │   ├── 📄 index.ts       # Store configuration
    │   │   │   ├── 📄 rootReducer.ts # Root reducer
    │   │   │   ├── 📂 slices/        # Redux Toolkit slices
    │   │   │   │   ├── 📄 authSlice.ts
    │   │   │   │   ├── 📄 medicineSlice.ts
    │   │   │   │   ├── 📄 inventorySlice.ts
    │   │   │   │   └── 📄 salesSlice.ts
    │   │   │   └── 📂 middleware/    # Custom middleware
    │   │   │       ├── 📄 authMiddleware.ts
    │   │   │       └── 📄 errorMiddleware.ts
    │   │   ├── 📂 hooks/             # Custom React hooks
    │   │   │   ├── 📄 useAuth.ts
    │   │   │   ├── 📄 useApi.ts
    │   │   │   ├── 📄 useDebounce.ts
    │   │   │   └── 📄 useLocalStorage.ts
    │   │   └── 📂 context/           # React contexts
    │   │       ├── 📄 AuthContext.tsx
    │   │       ├── 📄 ThemeContext.tsx
    │   │       └── 📄 NotificationContext.tsx
    │   │
    │   ├── 📂 modules/               # Feature Modules
    │   │   ├── 📂 auth/              # Authentication Module
    │   │   │   ├── 📂 components/    # Auth-specific components
    │   │   │   │   ├── 📄 LoginForm.tsx
    │   │   │   │   ├── 📄 RegisterForm.tsx
    │   │   │   │   ├── 📄 ForgotPassword.tsx
    │   │   │   │   └── 📄 ProtectedRoute.tsx
    │   │   │   ├── 📂 pages/         # Auth pages
    │   │   │   │   ├── 📄 LoginPage.tsx
    │   │   │   │   ├── 📄 RegisterPage.tsx
    │   │   │   │   └── 📄 ProfilePage.tsx
    │   │   │   ├── 📂 services/      # Auth API services
    │   │   │   │   ├── 📄 authApi.ts
    │   │   │   │   └── 📄 userApi.ts
    │   │   │   ├── 📂 hooks/         # Auth hooks
    │   │   │   │   ├── 📄 useLogin.ts
    │   │   │   │   ├── 📄 useRegister.ts
    │   │   │   │   └── 📄 useProfile.ts
    │   │   │   ├── 📂 types/         # Auth TypeScript types
    │   │   │   │   ├── 📄 auth.types.ts
    │   │   │   │   └── 📄 user.types.ts
    │   │   │   └── 📂 utils/         # Auth utilities
    │   │   │       ├── 📄 tokenUtils.ts
    │   │   │       └── 📄 validation.ts
    │   │   │
    │   │   ├── 📂 medicine/          # Medicine Management Module
    │   │   │   ├── 📂 components/
    │   │   │   │   ├── 📄 MedicineList.tsx
    │   │   │   │   ├── 📄 MedicineCard.tsx
    │   │   │   │   ├── 📄 MedicineForm.tsx
    │   │   │   │   ├── 📄 MedicineSearch.tsx
    │   │   │   │   ├── 📄 MedicineFilter.tsx
    │   │   │   │   ├── 📄 BatchInfo.tsx
    │   │   │   │   └── 📄 ExpiryAlert.tsx
    │   │   │   ├── 📂 pages/
    │   │   │   │   ├── 📄 MedicineListPage.tsx
    │   │   │   │   ├── 📄 MedicineDetailPage.tsx
    │   │   │   │   ├── 📄 AddMedicinePage.tsx
    │   │   │   │   ├── 📄 EditMedicinePage.tsx
    │   │   │   │   └── 📄 ExpiryManagementPage.tsx
    │   │   │   ├── 📂 services/
    │   │   │   │   ├── 📄 medicineApi.ts
    │   │   │   │   └── 📄 expiryApi.ts
    │   │   │   ├── 📂 hooks/
    │   │   │   │   ├── 📄 useMedicines.ts
    │   │   │   │   ├── 📄 useMedicineForm.ts
    │   │   │   │   ├── 📄 useExpiryTracking.ts
    │   │   │   │   └── 📄 useMedicineSearch.ts
    │   │   │   ├── 📂 types/
    │   │   │   │   ├── 📄 medicine.types.ts
    │   │   │   │   ├── 📄 batch.types.ts
    │   │   │   │   └── 📄 expiry.types.ts
    │   │   │   └── 📂 utils/
    │   │   │       ├── 📄 medicineValidation.ts
    │   │   │       ├── 📄 expiryCalculations.ts
    │   │   │       └── 📄 batchUtils.ts
    │   │   │
    │   │   ├── 📂 inventory/         # Inventory Management Module
    │   │   │   ├── 📂 components/
    │   │   │   │   ├── 📄 InventoryDashboard.tsx
    │   │   │   │   ├── 📄 StockLevelCard.tsx
    │   │   │   │   ├── 📄 InventoryList.tsx
    │   │   │   │   ├── 📄 StockAdjustmentForm.tsx
    │   │   │   │   ├── 📄 LocationPicker.tsx
    │   │   │   │   ├── 📄 StockAlerts.tsx
    │   │   │   │   └── 📄 InventoryFilters.tsx
    │   │   │   ├── 📂 pages/
    │   │   │   │   ├── 📄 InventoryDashboardPage.tsx
    │   │   │   │   ├── 📄 InventoryListPage.tsx
    │   │   │   │   ├── 📄 StockAdjustmentPage.tsx
    │   │   │   │   ├── 📄 LocationManagementPage.tsx
    │   │   │   │   └── 📄 AlertsPage.tsx
    │   │   │   ├── 📂 services/
    │   │   │   │   ├── 📄 inventoryApi.ts
    │   │   │   │   ├── 📄 stockApi.ts
    │   │   │   │   └── 📄 alertsApi.ts
    │   │   │   ├── 📂 hooks/
    │   │   │   │   ├── 📄 useInventory.ts
    │   │   │   │   ├── 📄 useStockLevels.ts
    │   │   │   │   ├── 📄 useStockAlerts.ts
    │   │   │   │   └── 📄 useLocationManagement.ts
    │   │   │   ├── 📂 types/
    │   │   │   │   ├── 📄 inventory.types.ts
    │   │   │   │   ├── 📄 stock.types.ts
    │   │   │   │   └── 📄 location.types.ts
    │   │   │   └── 📂 utils/
    │   │   │       ├── 📄 stockCalculations.ts
    │   │   │       ├── 📄 alertUtils.ts
    │   │   │       └── 📄 locationUtils.ts
    │   │   │
    │   │   ├── 📂 sales/             # Sales Management Module
    │   │   │   ├── 📂 components/
    │   │   │   │   ├── 📄 SalesForm.tsx
    │   │   │   │   ├── 📄 SalesHistory.tsx
    │   │   │   │   ├── 📄 CustomerForm.tsx
    │   │   │   │   ├── 📄 InvoiceGenerator.tsx
    │   │   │   │   ├── 📄 PaymentForm.tsx
    │   │   │   │   └── 📄 ReceiptPrinter.tsx
    │   │   │   ├── 📂 pages/
    │   │   │   │   ├── 📄 SalesPage.tsx
    │   │   │   │   ├── 📄 SalesHistoryPage.tsx
    │   │   │   │   ├── 📄 CustomerManagementPage.tsx
    │   │   │   │   └── 📄 InvoicePage.tsx
    │   │   │   ├── 📂 services/
    │   │   │   │   ├── 📄 salesApi.ts
    │   │   │   │   └── 📄 customerApi.ts
    │   │   │   ├── 📂 hooks/
    │   │   │   │   ├── 📄 useSales.ts
    │   │   │   │   ├── 📄 useCustomers.ts
    │   │   │   │   └── 📄 useInvoice.ts
    │   │   │   ├── 📂 types/
    │   │   │   │   ├── 📄 sales.types.ts
    │   │   │   │   ├── 📄 customer.types.ts
    │   │   │   │   └── 📄 invoice.types.ts
    │   │   │   └── 📂 utils/
    │   │   │       ├── 📄 salesCalculations.ts
    │   │   │       ├── 📄 invoiceUtils.ts
    │   │   │       └── 📄 paymentUtils.ts
    │   │   │
    │   │   ├── 📂 supplier/          # Supplier Management Module
    │   │   │   ├── 📂 components/
    │   │   │   │   ├── 📄 SupplierList.tsx
    │   │   │   │   ├── 📄 SupplierCard.tsx
    │   │   │   │   ├── 📄 SupplierForm.tsx
    │   │   │   │   ├── 📄 SupplierPerformance.tsx
    │   │   │   │   └── 📄 ContactInfo.tsx
    │   │   │   ├── 📂 pages/
    │   │   │   │   ├── 📄 SupplierListPage.tsx
    │   │   │   │   ├── 📄 SupplierDetailPage.tsx
    │   │   │   │   ├── 📄 AddSupplierPage.tsx
    │   │   │   │   └── 📄 SupplierPerformancePage.tsx
    │   │   │   ├── 📂 services/
    │   │   │   │   └── 📄 supplierApi.ts
    │   │   │   ├── 📂 hooks/
    │   │   │   │   ├── 📄 useSuppliers.ts
    │   │   │   │   └── 📄 useSupplierPerformance.ts
    │   │   │   ├── 📂 types/
    │   │   │   │   └── 📄 supplier.types.ts
    │   │   │   └── 📂 utils/
    │   │   │       └── 📄 supplierUtils.ts
    │   │   │
    │   │   └── 📂 reporting/         # Reporting Module
    │   │       ├── 📂 components/
    │   │       │   ├── 📄 ReportDashboard.tsx
    │   │       │   ├── 📄 ChartComponents.tsx
    │   │       │   ├── 📄 ReportFilters.tsx
    │   │       │   ├── 📄 ExportButtons.tsx
    │   │       │   └── 📄 DataTable.tsx
    │   │       ├── 📂 pages/
    │   │       │   ├── 📄 ReportsDashboard.tsx
    │   │       │   ├── 📄 SalesReportPage.tsx
    │   │       │   ├── 📄 InventoryReportPage.tsx
    │   │       │   └── 📄 ExpiryReportPage.tsx
    │   │       ├── 📂 services/
    │   │       │   └── 📄 reportsApi.ts
    │   │       ├── 📂 hooks/
    │   │       │   ├── 📄 useReports.ts
    │   │       │   └── 📄 useExport.ts
    │   │       ├── 📂 types/
    │   │       │   └── 📄 reports.types.ts
    │   │       └── 📂 utils/
    │   │           ├── 📄 chartUtils.ts
    │   │           └── 📄 exportUtils.ts
    │   │
    │   ├── 📂 shared/                # Shared Components & Utilities
    │   │   ├── 📂 components/        # Reusable UI Components
    │   │   │   ├── 📂 ui/            # Basic UI Components
    │   │   │   │   ├── 📄 Button.tsx
    │   │   │   │   ├── 📄 Input.tsx
    │   │   │   │   ├── 📄 Select.tsx
    │   │   │   │   ├── 📄 Modal.tsx
    │   │   │   │   ├── 📄 Card.tsx
    │   │   │   │   ├── 📄 Table.tsx
    │   │   │   │   ├── 📄 Loading.tsx
    │   │   │   │   └── 📄 ErrorBoundary.tsx
    │   │   │   ├── 📂 layout/        # Layout Components
    │   │   │   │   ├── 📄 Header.tsx
    │   │   │   │   ├── 📄 Sidebar.tsx
    │   │   │   │   ├── 📄 Footer.tsx
    │   │   │   │   ├── 📄 Navigation.tsx
    │   │   │   │   └── 📄 Layout.tsx
    │   │   │   ├── 📂 form/          # Form Components
    │   │   │   │   ├── 📄 FormField.tsx
    │   │   │   │   ├── 📄 FormGroup.tsx
    │   │   │   │   ├── 📄 Validation.tsx
    │   │   │   │   └── 📄 DatePicker.tsx
    │   │   │   └── 📂 feedback/      # Feedback Components
    │   │   │       ├── 📄 Toast.tsx
    │   │   │       ├── 📄 Alert.tsx
    │   │   │       ├── 📄 Notification.tsx
    │   │   │       └── 📄 ConfirmDialog.tsx
    │   │   ├── 📂 utils/             # Utility Functions
    │   │   │   ├── 📄 api.ts         # API client configuration
    │   │   │   ├── 📄 constants.ts   # Application constants
    │   │   │   ├── 📄 dateUtils.ts   # Date utility functions
    │   │   │   ├── 📄 formatUtils.ts # Formatting utilities
    │   │   │   ├── 📄 validationUtils.ts # Validation utilities
    │   │   │   └── 📄 storageUtils.ts # Local storage utilities
    │   │   ├── 📂 styles/            # Shared Styles
    │   │   │   ├── 📄 globals.css    # Global CSS styles
    │   │   │   ├── 📄 variables.css  # CSS custom properties
    │   │   │   ├── 📄 mixins.scss    # SCSS mixins
    │   │   │   └── 📄 theme.ts       # Theme configuration
    │   │   ├── 📂 types/             # Shared TypeScript Types
    │   │   │   ├── 📄 api.types.ts   # API response types
    │   │   │   ├── 📄 common.types.ts # Common types
    │   │   │   └── 📄 index.ts       # Type exports
