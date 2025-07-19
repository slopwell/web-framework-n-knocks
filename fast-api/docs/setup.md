```sh
curl -LsSf https://astral.sh/uv/install.sh | bash
uv --version

cd fast-api
uv venv
uv pip install "fastapi[standard]"
uv add fastapi[standard]
```
