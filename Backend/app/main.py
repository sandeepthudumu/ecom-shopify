from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response

from app.database import engine
from app.models import Base

from app.routes.product import router as product_router
from app.auth.auth import router as auth_router
from app.routes import user
from app.routes import cart
from app.routes import payment



app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://ecom-shopify-4tx52mwee-sandeep-thudumus-projects.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)

app.include_router(product_router)
app.include_router(auth_router)
app.include_router(user.router)
app.include_router(cart.router)
app.include_router(payment.router)

@app.get("/")
def root():
    return {"message": "E-commerce API running"}

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return Response(status_code=204)