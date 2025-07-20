# fast-api/Makefile
.PHONY: setup
setup:
	uv --project ./src venv --seed
	uv --project ./src sync

.PHONY: start
start:
	cd src && uv run uvicorn main:app --host 0.0.0.0 --port 3000 --reload

.PHONY: dev
dev:
	uv --project ./src sync --frozen
	cd src && uv run uvicorn main:app --host 0.0.0.0 --port 3000 --reload &
	explorer.exe http://localhost:3000

.PHONY: openapi
openapi:
	make start &
	echo "OpenAPI documentation available at http://localhost:3000/docs"
	explorer.exe http://localhost:3000/docs
