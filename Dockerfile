# Compile and package application
FROM maven:3-eclipse-temurin-17 AS build
COPY . .
RUN mvn clean package -DskipTests

# Run application
FROM eclipse-temurin:17
COPY --from=build /target/webrew-0.0.1-SNAPSHOT.jar webrew.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "webrew.jar"]
