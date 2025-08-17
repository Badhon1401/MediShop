# MediShop - Medical Inventory Management System

## Project Structure

```
/MediShop/

├── frontend/
│   └── mediShop-ui/
│       ├── public/
│       ├── src/
│       │   ├── app/
│       │   │   ├── App.tsx
│       │   │   ├── routes.tsx
│       │   │   └── App.css
│       │   ├── modules/
│       │   │   ├── medicine/
│       │   │   │   ├── components/
│       │   │   │   │   ├── MedicineForm.tsx
│       │   │   │   │   ├── MedicineTable.tsx
│       │   │   │   │   └── MedicineSearch.tsx
│       │   │   │   ├── pages/
│       │   │   │   │   └── MedicineInventoryPage.tsx
│       │   │   │   ├── services/
│       │   │   │   │   └── medicineService.ts
│       │   │   │   ├── hooks/
│       │   │   │   │   └── useMedicine.ts
│       │   │   │   ├── types/
│       │   │   │   │   └── index.ts
│       │   │   │   └── index.ts
│       │   │   ├── user/
│       │   │   └── inventory/
│       │   ├── shared/
│       │   │   ├── components/
│       │   │   │   ├── Modal.tsx
│       │   │   │   └── Loading.tsx
│       │   │   ├── utils/
│       │   │   │   ├── constants.ts
│       │   │   │   └── helpers.ts
│       │   │   ├── types/
│       │   │   │   └── common.ts
│       │   │   └── index.ts
│       │   └── index.tsx
│       ├── package.json
│       └── tsconfig.json
└── README.md
```

## Frontend Module Structure

### Medicine Module

The medicine module follows a clean architecture pattern with the following structure:

#### Components
- **MedicineForm.tsx** - Reusable form component for creating and editing medicines
- **MedicineTable.tsx** - Table component for displaying medicines with actions
- **MedicineSearch.tsx** - Search and filter component for medicines

#### Pages
- **MedicineInventoryPage.tsx** - Main page that combines all medicine components

#### Services
- **medicineService.ts** - API service class for medicine operations

#### Hooks
- **useMedicine.ts** - Custom hooks for medicine data management and actions

#### Types
- **index.ts** - TypeScript interfaces and types for medicine module

### Shared Module

Contains reusable components, utilities, and types used across the application:

#### Components
- **Modal.tsx** - Reusable modal component
- **Loading.tsx** - Loading spinner component

#### Utils
- **constants.ts** - Application constants and configuration
- **helpers.ts** - Utility functions for common operations

#### Types
- **common.ts** - Shared TypeScript interfaces

## Features

### Medicine Management
- ✅ View all medicines in inventory
- ✅ Add new medicines
- ✅ Edit existing medicines
- ✅ Delete medicines
- ✅ Search medicines by name, type, category,