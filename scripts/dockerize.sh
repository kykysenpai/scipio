#!/bin/bash

PROJECT_ROOT=$(cd "$(dirname "$0")" && pwd -P)/..

docker build $PROJECT_ROOT -t scipio
