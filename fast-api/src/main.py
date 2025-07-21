from typing import Annotated
from fastapi import Depends, FastAPI
from sqlalchemy import select
from sqlmodel import Session
from db.core import get_session
from db.aws_service_dao import aws_service, get_aws_service_id_sql, list_aws_services_sql

app = FastAPI()

SessionDep = Annotated[Session, Depends(get_session)]

@app.get("/")
async def read_root():
    """
    Root endpoint.
    """
    return {"message": "Welcome to the FastAPI!"}

@app.get("/api/aws-service-id/{name}/", response_model=aws_service)
def get_aws_service_id(name: str, session: SessionDep) -> aws_service | None:
    """
    Retrieve AWS service ID by name.
    """
    result = get_aws_service_id_sql(name, session)
    if not result:
        return {"error": "AWS service not found"}

    return result

@app.post("/api/aws-service-id", response_model=aws_service)
async def create_aws_service_id(item: dict):
    """
    Create a new AWS service ID.
    """
    fake_items_db.append(item)
    return {"message": "AWS service ID created", "item": item}

@app.get("/api/aws-services/")
async def list_aws_services(session: SessionDep):
    """
    List all AWS service IDs.
    """
    result = list_aws_services_sql(session)
    return result

@app.get("/api/health")
async def health_check():
    """
    Health check endpoint.
    """
    return {"status": "ok"}
