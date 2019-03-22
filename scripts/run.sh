#!/bin/bash

PROJECT_ROOT=$(cd "$(dirname "$0")" && pwd -P)/..

docker run --rm -d \
	-v "$PROJECT_ROOT:/app" \
	-w /app \
	-p 5002:5002 \
	--name scipio \
	node npm run-script start-prod
