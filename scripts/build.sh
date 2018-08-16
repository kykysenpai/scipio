#!/bin/bash

. $(dirname "$0")/env.sh

docker run --rm \
    --name scipio_build \
    -w /usr/src/app \
    -v ${PROJECT_ROOT}:/usr/src/app \
    -u ${UID} \
    node \
    npm install --verbose
