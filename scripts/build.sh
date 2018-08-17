#!/bin/bash

. $(dirname "$0")/env.sh

docker run --rm \
    --name scipio_build \
    -w /app \
    -v ${PROJECT_ROOT}:/app \
    -u "node" \
    -e NPM_CONFIG_PREFIX=/home/node/.npm-global \
    node \
    npm install --verbose
