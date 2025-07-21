FROM ghcr.io/astral-sh/uv:debian

WORKDIR /usr/src/app

COPY ./src /usr/src/app
COPY ./Makefile /usr/src/app/Makefile

RUN uv --version \
 && uv sync --frozen

RUN make setup

EXPOSE 3000
