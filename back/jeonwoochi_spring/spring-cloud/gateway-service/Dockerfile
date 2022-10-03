FROM openjdk:8 AS builder
VOLUME /tmp

FROM openjdk:8
COPY build/libs/gateway-service-1.0-SNAPSHOT.jar GatewayServer.jar
EXPOSE 8000
ENTRYPOINT ["java","-jar","GatewayServer.jar"]
