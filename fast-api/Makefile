
.PHONY: setup
setup:
	uv venv
	uv pip install -r pyproject.toml

.PHONY: start
start:
	uvicorn main:app --port 3000 --reload &
	explorer.exe http://localhost:3000

.PHONY: openapi
openapi:
	make start &
	echo "OpenAPI documentation available at http://localhost:3000/docs"
	explorer.exe http://localhost:3000/docs
