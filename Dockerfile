FROM docker.mytcc.be/node_docker
COPY . /app
WORKDIR /app
ENTRYPOINT npm run-script start-prod
