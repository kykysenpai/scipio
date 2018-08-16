#!/bin/bash

. $(dirname "$0")/env.sh

docker build ${PROJECT_ROOT} -t scipio