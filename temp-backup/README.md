# MediShop Backend

## Database Configuration

The application is configured to work with two database options:

1. **PostgreSQL** (Supabase Cloud DB) - Default for production
2. **H2 Database** - For development and testing

## Running the Application

### Development Mode (H2 Database)

To run the application with the H2 in-memory database:

```bash
./run_dev.sh
```

This will start the application with the `dev` profile, which uses an H2 in-memory database. This is useful when:
- You don't have access to the PostgreSQL database
- You're working offline
- You want to test without affecting the production database

The H2 console will be available at: http://localhost:8080/mediShop/h2-console
- JDBC URL: `jdbc:h2:mem:medishopdb`
- Username: `sa`
- Password: (leave empty)

### Production Mode (PostgreSQL)

To run the application with the PostgreSQL database:

```bash
./run_postgres.sh
```

This will start the application with the PostgreSQL configuration. Note that this requires:
- Network connectivity to the Supabase cloud database
- Valid database credentials

## Switching Between Profiles

You can manually switch between profiles by editing the `application.properties` file:

```properties
# Set to "dev" to use H2 database, or leave empty to use PostgreSQL
spring.profiles.active=dev
```

- Set to `dev` to use H2 database
- Leave empty to use PostgreSQL