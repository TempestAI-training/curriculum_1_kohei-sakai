import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api.routers import chat as chat_router
from backend.api.models.db import Base, async_engine

from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def create_tables():
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

app.include_router(chat_router.router)