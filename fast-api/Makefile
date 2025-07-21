# fast-api/Makefile
.PHONY: setup start dev sync openapi stop

PORT := 3000
HOST := 0.0.0.0
ENV_FILE := .env.local
SRC_DIR := ./src
DOCKER_DIR := /usr/src/app

setup:
	uv --project $(SRC_DIR) venv --seed
	uv --project $(SRC_DIR) sync

start:
	uv run \
		uvicorn main:app  \
			--app-dir $(DOCKER_DIR) \
			--host $(HOST) \
			--port $(PORT) \
			--reload

dev:
	uv --project $(SRC_DIR) run \
		uvicorn main:app \
			--app-dir $(SRC_DIR) \
			--env-file ./$(ENV_FILE) \
			--host $(HOST) \
			--port $(PORT) \
			--reload &
	explorer.exe http://localhost:$(PORT)

sync:
	uv --project $(SRC_DIR) sync --frozen

openapi:
	make dev &
	echo "OpenAPI documentation available at http://localhost:$(PORT)/docs"
	explorer.exe http://localhost:$(PORT)/docs

stop:
	pkill -f "uvicorn main:app"
