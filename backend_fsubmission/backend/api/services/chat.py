import os
import uuid
from openai import AsyncOpenAI, OpenAIError as openai_error
from sqlalchemy.ext.asyncio import AsyncSession
import logging

from backend.api.schemas.chat import MessageCreate
from backend.api.models.chat import Message
from backend.api.cruds.chat import (
    create_message,
    get_messages_by_conversation,
)

client = AsyncOpenAI(
    api_key=os.getenv("AZURE_OPENAI_KEY"),
    base_url=os.getenv("AZURE_OPENAI_ENDPOINT") + "/openai/deployments/" + os.getenv("AZURE_OPENAI_DEPLOYMENT")
)

async def chat_service(db: AsyncSession, message: MessageCreate):
    # UUIDをconversation_idに設定
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

    # OpenAI APIにリクエストを送信
    try:
        response = await client.chat.completions.create(
            model=os.getenv("OPENAI_DEPLOYMENT"),
            messages=gpt_messages,
            extra_query={"api-version": "2025-01-01-preview"},
        )

        assistant_content = response.choices[0].message.content
        
    except openai_error.OpenAIError as e:
        # APIエラー時の処理
        logging.error(f"OpenAI API error: {e}")
        assistant_content = "申し訳ありません。現在、回答を生成できません。"

    # アシスタントのメッセージを保存
    assistant_message = Message(
        conversation_id=message.conversation_id,
        role="assistant",
        content=assistant_content,
        model=os.getenv("OPENAI_DEPLOYMENT"),
    )

    saved_assistant = await create_message(db, assistant_message)

    return saved_assistant 