#!/bin/bash
set -e

DOCKER_TAG=${DOCKER_BASE_TAG:-latest}

COMMIT_HASH=$(git rev-parse --short "$GITHUB_SHA")

DOCKER_TAG_LONG=$DOCKER_TAG-$(date +"%Y-%m-%dT%H.%M.%S")-$COMMIT_HASH
DOCKER_IMAGE_TAG=$ECR_REGISTRY/$ECR_REPOSITORY:$DOCKER_TAG
DOCKER_IMAGE_TAG_LONG=$ECR_REGISTRY/$ECR_REPOSITORY:$DOCKER_TAG_LONG

# Build image
echo "Building digitransit-ui"
echo -e "export const COMMIT_ID = \"${GITHUB_SHA}\";\nexport const BUILD_TIME = \""`date -Iminutes -u`"\";" > app/buildInfo.js
docker build --tag=$DOCKER_IMAGE_TAG_LONG .

echo "Pushing $DOCKER_TAG image"
docker push $DOCKER_IMAGE_TAG_LONG
docker tag $DOCKER_IMAGE_TAG_LONG $DOCKER_IMAGE_TAG
docker push $DOCKER_IMAGE_TAG

echo Build completed
