#!/bin/bash
cd "$(dirname "$0")"
echo "Starting MediShop application with PostgreSQL..."
# Temporarily set the active profile to empty (use PostgreSQL)
sed -i 's/spring.profiles.active=dev/spring.profiles.active=/' src/main/resources/application.properties
./mvnw spring-boot:run
# Reset back to dev profile after running
sed -i 's/spring.profiles.active=/spring.profiles.active=dev/' src/main/resources/application.properties