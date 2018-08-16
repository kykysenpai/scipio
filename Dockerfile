FROM node
COPY . /app
WORKDIR /app
ENTRYPOINT npm run-script start-prod