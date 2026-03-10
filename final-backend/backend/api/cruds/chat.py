from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from backend.api.models.chat import Message
from backend.api.schemas.chat import MessageCreate
import uuid


async def get_messages(db: AsyncSession):
    result = await db.execute(select(Message))
    return result.scalars().all()


async def create_message(db: AsyncSession, message: MessageCreate):
    if not message.conversation_id:
        message.conversation_id = str(uuid.uuid4())

    db_message = Message(
        conversation_id=message.conversation_id,
        content=message.content,
        role=message.role,
        model=message.model
    )
    db.add(db_message)
    await db.commit()
    await db.refresh(db_message)

    return db_message

async def get_messages_by_conversation(
    db: AsyncSession, conversation_id: str
):
    result = await db.execute(
        select(Message)
        .where(Message.conversation_id == conversation_id)
        .order_by(Message.created_at)
    )
    return result.scalars().all()