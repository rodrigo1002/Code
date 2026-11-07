FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /workspace
COPY pom.xml .
COPY src ./src
RUN mvn --batch-mode --no-transfer-progress verify

FROM eclipse-temurin:17-jre-jammy
RUN useradd --system --uid 10001 --home-dir /app --create-home billing
WORKDIR /app
COPY --from=build --chown=billing:billing /workspace/target/billing-*.jar /app/billing.jar
USER 10001:10001
EXPOSE 7080
ENTRYPOINT ["java", "-jar", "/app/billing.jar"]
