#!/bin/bash

. $(dirname "$0")/env.sh

rm -r node_modules
rm package-lock.json

docker run --rm \
    --name scipio_build \
    -v ${PROJECT_ROOT}:/app \
    -w /app \
    -u $UID \
    docker.tircher.be/nap \
    npm install
