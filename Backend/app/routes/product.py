from fastapi import APIRouter, Depends, HTTPException
from app.database import SessionLocal
from sqlalchemy.orm import Session
from typing import Annotated, Optional
from pydantic import BaseModel
from starlette import status
from app.models import Product 

router = APIRouter(
    prefix="/products",
    tags=["products"]
)

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]


# Schema
class ProductRequest(BaseModel):
    name: str
    description: str
    price: int
    category: str
    stock: int
    image_url:str


# CREATE PRODUCT
@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_product(db: db_dependency, product: ProductRequest):
    new_product = Product(**product.model_dump())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product


# GET ALL PRODUCTS WITH SEARCH, FILTER, PAGINATION
@router.get("/")
async def get_products(
    db: db_dependency,
    search: Optional[str] = None,
    category: Optional[str] = None,
    page: int = 1,
    limit: int = 8
):
    query = db.query(Product)

    if search:
        query = query.filter(Product.name.ilike(f"%{search}%"))

    if category:
        query = query.filter(Product.category == category)

    total_products = query.count()

    products = query.offset((page - 1) * limit).limit(limit).all()

    total_pages = (total_products + limit - 1) // limit

    return {
        "products": products,
        "current_page": page,
        "total_pages": total_pages,
        "total_products": total_products
    }


# GET SINGLE PRODUCT
@router.get("/{product_id}")
async def get_product(db: db_dependency, product_id: int):
    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return product

#delete all
@router.delete("/all")
async def delete_all_products(db: db_dependency):
    deleted_count = db.query(Product).delete()

    db.commit()

    return {
        "message": f"{deleted_count} products deleted successfully"
    }