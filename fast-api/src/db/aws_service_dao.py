from typing import Annotated
from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select
from db.core import get_session

SessionDep = Annotated[Session, Depends(get_session)]

class aws_category(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str

class aws_service(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    description: str
    category: int = Field(foreign_key="aws_category.name")

def run_query(session: Session, query):
    """
    SQL実行
    """
    result = session.exec(query).first()
    if not result:
        raise HTTPException(status_code=404, detail="Item not found")
    return result


def get_aws_service_id_sql(name: str, session: SessionDep):
    """
    ORMによるSQL生成
    """
    sql = select(aws_service).where(aws_service.name == name)
    result =run_query(session, sql)

    print("[get_aws_service_id_sql] result:", result)
    return result

