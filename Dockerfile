FROM node:alpine

COPY . /app

WORKDIR /app

ENTRYPOINT npm run-script start-prod