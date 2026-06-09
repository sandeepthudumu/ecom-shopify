from fastapi import APIRouter,HTTPException,Depends
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from sqlalchemy.orm import Session
from data.database import SessionLocal
from typing import Annotated
from app.models import Users
router=APIRouter(
    prefix='/auth',
    tags=['auth']
)

SECRET_KEY =""
ALOGRTHMS="HS256"

bcrypt_context =CryptContext(schemes=['bcrypt'],deprecated='auto')
auth_context=OAuth2PasswordBearer(tokenUrl='auth/token')

class CreateUserRequest(BaseModel):
    username:str
    email:str
    first_name:str
    last_name:str
    password:str
    role:str

class TOKEN(BaseModel):
    access_token:str
    token_type:str

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

#authentcatiion user

def authenticated_user(username:str,password:str,db):
    user=db.query(Users).filter(Users.username == username).first()
    if not user:
        return False
    if not bcrypt_context.verify(password,user.hashed_password):
        return False
    return user