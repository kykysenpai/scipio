#!/bin/bash

. $(dirname "$0")/env.sh

rm -r node_modules || true
rm package-lock.json || true

docker run --rm \
    --name scipio_build \
    -v ${PROJECT_ROOT}:/app \
    -w /app \
    -u $UID \
    docker.tircher.be/nap \
    npm install
