FROM openjdk:8 AS builder
VOLUME /tmp

FROM openjdk:8
COPY build/libs/interest-service-0.0.1-SNAPSHOT.jar InterestServer.jar
ENTRYPOINT ["java","-jar","InterestServer.jar"]
