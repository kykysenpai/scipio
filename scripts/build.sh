#!/bin/bash

. $(dirname "$0")/env.sh

echo ${PROJECT_ROOT}

docker run --rm \
    --name scipio_build \
    -v ${PROJECT_ROOT}:/app \
    -w /app \
    -u $UID \
    docker.tircher.be/nap \
    npm install
