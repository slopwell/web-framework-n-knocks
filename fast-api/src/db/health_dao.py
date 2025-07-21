from typing import Annotated
from fastapi import Depends, HTTPException
from sqlalchemy import text
from sqlmodel import Field, Session, SQLModel, select
from db.core import get_session

SessionDep = Annotated[Session, Depends(get_session)]

def test_db_connection(session: SessionDep):
    """
    DB接続テスト
    """
    try:
        session.exec(text("SELECT 1"))
        return {"status": "ok"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
