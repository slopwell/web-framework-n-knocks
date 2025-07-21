# https://fastapi.tiangolo.com/tutorial/sql-databases

import os
from contextlib import asynccontextmanager
from typing import Annotated
from fastapi import Depends, FastAPI
from sqlalchemy import create_engine
from sqlmodel import Session, SQLModel

DATABASE_URL = "postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"


# 接続情報は環境変数で管理
DB_USER = os.getenv("DB_USER", "myuser")
DB_PASSWORD = os.getenv("DB_PASSWORD", "mypassword")
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "mydatabase")

def get_engine():
  """
  エンジンとは、SQLAlchemyがデータベースとやり取りするためのIFらしい
  SQLAlchemyとは、PythonのORM
  """
  url = DATABASE_URL.format(
      DB_USER=DB_USER,
      DB_PASSWORD=DB_PASSWORD,
      DB_HOST=DB_HOST,
      DB_PORT=DB_PORT,
      DB_NAME=DB_NAME,
  )
  print("[get_engine] URL:", url)
  engine = create_engine(
      url,
      echo=True,
  )
  return engine

engine = get_engine()


def get_session():
    with Session(engine) as session:
        yield session
