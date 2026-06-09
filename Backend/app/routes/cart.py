from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Annotated
from app.database import SessionLocal
from app.auth.auth import get_current_user
from app.models import Product, Cart, CartItem
from pydantic import BaseModel

router = APIRouter(
    prefix="/cart",
    tags=["cart"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]


class CartRequest(BaseModel):
    product_id: int
    quantity: int


@router.post("/add")
async def add_to_cart(
    user: user_dependency,
    db: db_dependency,
    cart: CartRequest
):
    product = db.query(Product).filter(Product.id == cart.product_id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    if cart.quantity <= 0:
        raise HTTPException(status_code=400, detail="Quantity must be greater than 0")

    if product.stock < cart.quantity:
        raise HTTPException(status_code=400, detail="Not enough stock")

    user_cart = db.query(Cart).filter(Cart.user_id == user["id"]).first()

    if not user_cart:
        user_cart = Cart(user_id=user["id"])
        db.add(user_cart)
        db.commit()
        db.refresh(user_cart)

    existing_item = db.query(CartItem).filter(
        CartItem.cart_id == user_cart.id,
        CartItem.product_id == cart.product_id
    ).first()

    if existing_item:
        if product.stock < existing_item.quantity + cart.quantity:
            raise HTTPException(status_code=400, detail="Not enough stock")

        existing_item.quantity += cart.quantity
    else:
        new_item = CartItem(
            cart_id=user_cart.id,
            product_id=cart.product_id,
            quantity=cart.quantity
        )
        db.add(new_item)

    db.commit()

    return {"message": "Product added to cart"}


@router.get("/")
async def get_cart(
    user: user_dependency,
    db: db_dependency
):
    user_cart = db.query(Cart).filter(Cart.user_id == user["id"]).first()

    if not user_cart:
        return {
            "items": [],
            "cart_total": 0
        }

    total = 0
    cart_data = []

    for item in user_cart.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()

        if not product:
            continue

        item_total = product.price * item.quantity
        total += item_total

        cart_data.append({
            "id": item.id,
            "product_id": product.id,
            "name": product.name,
            "price": product.price,
            "quantity": item.quantity,
            "total": item_total
        })

    return {
        "items": cart_data,
        "cart_total": total
    }


@router.put("/{item_id}")
async def update_quantity(
    user: user_dependency,
    db: db_dependency,
    item_id: int,
    quantity: int
):
    if quantity <= 0:
        raise HTTPException(status_code=400, detail="Quantity must be greater than 0")

    item = db.query(CartItem).join(Cart).filter(
        CartItem.id == item_id,
        Cart.user_id == user["id"]
    ).first()

    if not item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    product = db.query(Product).filter(Product.id == item.product_id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    if product.stock < quantity:
        raise HTTPException(status_code=400, detail="Not enough stock")

    item.quantity = quantity
    db.commit()

    return {"message": "Cart quantity updated"}


@router.delete("/{item_id}")
async def remove_from_cart(
    user: user_dependency,
    db: db_dependency,
    item_id: int
):
    item = db.query(CartItem).join(Cart).filter(
        CartItem.id == item_id,
        Cart.user_id == user["id"]
    ).first()

    if not item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    db.delete(item)
    db.commit()

    return {"message": "Item removed from cart"}