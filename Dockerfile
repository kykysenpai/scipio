FROM docker.tircher.be/nap

COPY . /app

WORKDIR /app

ENTRYPOINT npm run-script start-prod