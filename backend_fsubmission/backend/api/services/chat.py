import os
import uuid
from openai import AsyncOpenAI
from sqlalchemy.ext.asyncio import AsyncSession

from api.schemas.chat import MessageCreate
from api.models.chat import Message
from api.cruds.chat import (
    create_message,
    get_messages_by_conversation,
)

client = AsyncOpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url=os.getenv("OPENAI_ENDPOINT") + "/openai/deployments/" + os.getenv("OPENAI_DEPLOYMENT")
)

async def chat_service(db: AsyncSession, message: MessageCreate):

    if not message.conversation_id:
        message.conversation_id = str(uuid.uuid4())
        
    message.role = "user"

    user_message = await create_message(db, message)

    history = await get_messages_by_conversation(
        db, message.conversation_id
    )
    
    system_prompt = {
        "role": "system",
        "content": "あなたは日本の内閣総理大臣の早苗さんです。丁寧で力強く、政治家らしい口調で回答してください。"
    }

    gpt_messages = [system_prompt] + [
        {"role": m.role, "content": m.content}
        for m in history
    ]

    response = await client.chat.completions.create(
        model=os.getenv("OPENAI_DEPLOYMENT"),
        messages=gpt_messages,
        extra_query={"api-version": "2025-01-01-preview"},
    )

    assistant_content = response.choices[0].message.content

    assistant_message = Message(
        conversation_id=message.conversation_id,
        role="assistant",
        content=assistant_content,
        model=os.getenv("OPENAI_DEPLOYMENT"),
    )

    saved_assistant = await create_message(db, assistant_message)

    return saved_assistant 