from typing import List

from fastapi import APIRouter
from fastapi import Depends

from backend.api.services.chat import chat_service
import backend.api.schemas.chat as chat_schema
from backend.api.models.chat import Message
from backend.api.models.db import get_db
from backend.api.cruds.chat import get_messages, create_message

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

router = APIRouter()


@router.get("/messages", response_model=List[chat_schema.Message])
async def list_messages(db: AsyncSession = Depends(get_db)):
    return await get_messages(db)


@router.post("/chat", response_model=chat_schema.Message)
async def chat(
    message: chat_schema.MessageCreate,
    db: AsyncSession = Depends(get_db),
):
    return await chat_service(db, message)