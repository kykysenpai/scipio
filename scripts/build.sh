#!/bin/bash

PROJECT_ROOT=$(cd "$(dirname "$0")" && pwd -P)/..

docker run --rm \
	-v "$PROJECT_ROOT:/home/node/app" \
	-w /home/node/app \
 	node npm install --verbose
