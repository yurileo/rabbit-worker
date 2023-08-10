FROM node:18.14.2-alpine3.17 as build

WORKDIR /app

COPY . .

RUN npm i
RUN npm i -g nx




