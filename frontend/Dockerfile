FROM node:18-alpine as frontend

WORKDIR /OBTP-frontend

COPY ./package*.json ./
RUN npm install -y

COPY ./ ./