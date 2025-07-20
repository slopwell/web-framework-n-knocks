FROM python:3.11-slim

RUN apt update
RUN curl -LsSf https://astral.sh/uv/install.sh | bash
RUN uv sync --frozen

RUN make setup

EXPOSE 3000
