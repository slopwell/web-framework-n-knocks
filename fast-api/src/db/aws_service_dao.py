from sqlmodel import Field, SQLModel, select
from db.core import SessionDep, read_table, write_table


class aws_category(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str

class aws_service(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    description: str
    category: int = Field(foreign_key="aws_category.name")

def get_aws_service_id_sql(name: str, session: SessionDep) -> aws_service:
    """
    ORMによるSQL生成
    """
    sql = select(aws_service).where(aws_service.name == name)
    result = read_table(session, sql)

    return result

def list_aws_services_sql(category:str, session: SessionDep) -> list[aws_service]:
    """
    全AWSサービスIDの取得
    """
    sql = select(aws_service).where(aws_service.category == category)
    result = read_table(session, sql, returns_one=False)
    return result

def post_aws_service_id_sql(item: aws_service, session: SessionDep) -> aws_service:
    """
    新規AWSサービスIDの登録
    """
    result = write_table(session, item)
    return result


