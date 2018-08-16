#!/bin/bash

#. $(dirname "$0")/env.sh

docker run --rm \
    --name scipio_build \
    -w /home/node/app \
    -v .:/home/node/app \
    -u "node" \
    node \
    npm install --verbose
