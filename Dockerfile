FROM node

USER node

COPY . /home/node/app

WORKDIR /home/node/app

ENTRYPOINT npm run-script start-prod