from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Annotated

from app.database import SessionLocal
from app.models import Product

router = APIRouter(
    prefix="/deleteall",
    tags=["deleteall"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]


@router.delete("/all")
async def delete_all_products(db: db_dependency):
    deleted = db.query(Product).delete()

    db.commit()

    return {
        "message": f"{deleted} products deleted"
    }