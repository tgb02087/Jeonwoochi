FROM openjdk:8 AS builder
VOLUME /tmp

FROM openjdk:8
COPY build/libs/festival-service-0.0.1-SNAPSHOT.jar FestivalServer.jar
ENTRYPOINT ["java","-jar","FestivalServer.jar"]
