from typing import Annotated
from fastapi import Depends, HTTPException
from sqlmodel import Field, Session, SQLModel, select
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

def run_query(session: Session, query, returns_one: bool = True) :
    """
    SQL実行
    """
    # ScalarResult から値を取り出す必要がある
    if returns_one:
        result = session.exec(query).first()
    else:
        result = session.exec(query).all()
    if not result:
        raise HTTPException(status_code=404, detail="Item not found")
    return result


def get_aws_service_id_sql(name: str, session: SessionDep) -> aws_service:
    """
    ORMによるSQL生成
    """
    sql = select(aws_service).where(aws_service.name == name)
    result = run_query(session, sql)

    return result

def list_aws_services_sql(session: SessionDep) -> list[aws_service]:
    """
    全AWSサービスIDの取得
    """
    sql = select(aws_service)
    result = run_query(session, sql, returns_one=False)
    return result

def post_aws_service_id_sql(item: aws_service, session: SessionDep) -> aws_service:
    """
    新規AWSサービスIDの登録
    """
    session.add(item)
    session.commit()
    session.refresh(item)
    return item
