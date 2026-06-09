from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session #its is used to communicate with the database
from app.database import SessionLocal #it creates database sessions (opens a connnection to db)
from pydantic import BaseModel
from app.models import Users
from jose import jwt ,JWTError
from typing import Annotated
from starlette import status
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm 
#OAuth2PasswordBearer-Extract token from Authorization header,OAuth2PasswordRequestForm:reads username and password from formdata
from datetime import timedelta ,datetime ,timezone
from sqlalchemy import or_
#router setup

router=APIRouter(
    prefix='/auth',
    tags=['auth']
)

#security constants
SECRET_KEY ='7444ac0b7a0bc1906787eff4870d269da5e5e1df544c836f484e64cd3de977e5'
ALGORITHM='HS256'

#password hashing 
bcrypt_context =CryptContext(schemes=['bcrypt'],deprecated="auto")
oauth2_bearer =OAuth2PasswordBearer(tokenUrl='/auth/token')


class CreateUserRequest(BaseModel):
    username:str
    email:str
    first_name:str
    last_name:str
    password:str
    role:str

class Token(BaseModel):
    access_token:str
    token_type:str

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency=  Annotated[Session,Depends(get_db)]

#authentication_user

#def authenticate_user(username:str,password:str,db):
   # user=db.query(Users).filter(Users.email == username).first()
   # if not user:
     #   return False
   # if not bcrypt_context.verify(password,user.hashed_password):
     #   return False
   # return user

#Allow login by username OR email.
def authenticate_user(username: str, password: str, db):
    user = db.query(Users).filter(
        or_(
            Users.email == username,
            Users.username == username
        )
    ).first()

    if not user:
        print("USER NOT FOUND:", username)
        return False

    if not bcrypt_context.verify(password, user.hashed_password):
        print("PASSWORD WRONG")
        return False

    return user





#create access token(jwt creation)
def create_access_token(username:str,user_id:int,role:str,expires_delta:timedelta):
    encode={ #here encode create token
        'sub':username,
        'id':user_id,
        'role':role
    }

    expires=datetime.now(timezone.utc) + expires_delta

    encode.update({'exp':expires})

    return jwt.encode(encode,SECRET_KEY,algorithm=ALGORITHM)
    

#get current _get (token validation)
async def get_current_user(token:Annotated[str,Depends(oauth2_bearer)]):
    try: #here decode verify the token
        payload=jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        username:str=payload.get("sub")
        user_id:int=payload.get("id") 

        user_role:str=payload.get("role")

        if username is None or user_id is None:
            raise HTTPException (status_code=status.HTTP_401_UNAUTHORIZED,
                                 detail='could not validate user')
        return {'username':username,'id':user_id,'user_role':user_role}
    except JWTError: #catches the invalid token errors
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="could not validate the user")
    
#create_user (register)
@router.post("/register",status_code=status.HTTP_201_CREATED)
async def create_user(db:db_dependency,create_user_request:CreateUserRequest):
    create_user_model=Users(
        email=create_user_request.email,
        username=create_user_request.username,
        first_name=create_user_request.first_name,
        last_name=create_user_request.last_name,
        role=create_user_request.role,
        hashed_password=bcrypt_context.hash(create_user_request.password),
        is_active=True
    )
    db.add(create_user_model)
    db.commit()
    return {"message": "User created successfully"}

@router.post("/token",response_model=Token)
async def login_for_access_token(form_data:Annotated[OAuth2PasswordRequestForm,Depends()],db:db_dependency):
    user=authenticate_user(form_data.username,form_data.password,db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail='could not validate the user')
   ## token= create_access_token(user.username,user.id,timedelta(minutes=20),user.role)
    token = create_access_token(
    user.username,
    user.id,
    user.role,
    timedelta(minutes=25)
)
    return{'access_token':token,"token_type":"bearer"}

#auth/me
@router.get("/me")
async def get_user(
    current_user: Annotated[dict, Depends(get_current_user)]
):
    return current_user