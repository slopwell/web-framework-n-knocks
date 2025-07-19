from fastapi import FastAPI

app = FastAPI()

fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]


@app.get("/")
async def read_root():
    """
    Root endpoint.
    """
    return {"message": "Welcome to the FastAPI!"}

@app.get("/aws-service-id/{id}/")
async def get_aws_service_id(id: str):
    """
    Retrieve AWS service ID by ID.
    """
    return {"aws_service_id": id}

@app.post("/aws-service-id")
async def create_aws_service_id(item: dict):
    """
    Create a new AWS service ID.
    """
    fake_items_db.append(item)
    return {"message": "AWS service ID created", "item": item}

@app.get("/aws-services/")
async def list_aws_services():
    """
    List all AWS service IDs.
    """
    return {"aws_services": fake_items_db}

@app.get("/health")
async def health_check():
    """
    Health check endpoint.
    """
    return {"status": "ok"}
