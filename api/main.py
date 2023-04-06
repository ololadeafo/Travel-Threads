from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from authenticator import authenticator
from routers import accounts, packlists, datelists, items, weather, location

app = FastAPI()
app.include_router(authenticator.router, tags=["Accounts"])
app.include_router(accounts.router, tags=["Accounts"])
app.include_router(weather.router, tags=["Weather"])
app.include_router(packlists.router, tags=["Pack Lists"])
app.include_router(datelists.router, tags=["Date Lists"])
app.include_router(items.router, tags=["Items"])
app.include_router(location.router, tags=["Location"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
