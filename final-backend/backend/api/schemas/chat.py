from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Message(BaseModel):
    id: int
    conversation_id: str
    role: Optional[str] = None
    content: str
    model: Optional[str] = None
    created_at: datetime

    class Config:
        orm_mode = True
        
class MessageCreate(BaseModel):
    content: str
    conversation_id: str | None = None
    role: str | None = None
    model: str | None = None