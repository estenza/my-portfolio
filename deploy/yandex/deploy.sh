#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/my-portfolio}"
COMPOSE_FILE="deploy/yandex/docker-compose.yml"

cd "$APP_DIR"

git pull --ff-only
docker compose -f "$COMPOSE_FILE" up -d --build --remove-orphans
docker image prune -f
