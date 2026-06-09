from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Annotated
from app.database import SessionLocal
from app.auth.auth import get_current_user
from app.models import Product, Cart, CartItem

router = APIRouter(
    prefix="/payment",
    tags=["payment"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]


@router.post("/")
async def make_payment(
    user: user_dependency,
    db: db_dependency
):
    user_cart = db.query(Cart).filter(
        Cart.user_id == user["id"]
    ).first()

    if not user_cart or len(user_cart.items) == 0:
        raise HTTPException(
            status_code=400,
            detail="Cart is empty"
        )

    total = 0

    for item in user_cart.items:
        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        if not product:
            raise HTTPException(
                status_code=404,
                detail="Product not found"
            )

        if product.stock < item.quantity:
            raise HTTPException(
                status_code=400,
                detail=f"{product.name} does not have enough stock"
            )

        total += product.price * item.quantity

    for item in user_cart.items:
        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        product.stock -= item.quantity
        db.delete(item)

    db.commit()

    return {
        "message": "Payment successful",
        "amount": total,
        "status": "Success"
    }