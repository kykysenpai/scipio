#!/bin/bash

. $(dirname "$0")/env.sh

docker run --rm \
    --name scipio_build \
    -w /home/node/app \
    -v ${PROJECT_ROOT}:/home/node/app \
    -u "node" \
    node \
    mkdir /home/node/app && \
    npm install --verbose
