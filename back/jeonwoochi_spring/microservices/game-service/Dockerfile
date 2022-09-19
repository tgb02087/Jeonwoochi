FROM openjdk:8 AS builder
VOLUME /tmp

FROM openjdk:8
COPY build/libs/game-service-0.0.1-SNAPSHOT.jar GameServer.jar
ENTRYPOINT ["java","-jar","GameServer.jar"]
