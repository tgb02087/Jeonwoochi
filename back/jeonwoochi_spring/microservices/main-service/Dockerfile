FROM openjdk:8 AS builder
VOLUME /tmp

FROM openjdk:8
COPY build/libs/main-service-0.0.1-SNAPSHOT.jar MainServer.jar
ENTRYPOINT ["java","-jar","MainServer.jar"]
