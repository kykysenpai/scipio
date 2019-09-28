FROM registry:5000/node_docker
COPY . /app
WORKDIR /app
ENTRYPOINT npm run-script start-prod
