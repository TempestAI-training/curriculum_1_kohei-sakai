from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from backend.api.models.db import Base



class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True)
    conversation_id = Column(String(36),index=True)
    role = Column(String(10))
    content = Column(Text)
    model = Column(String(255))
    created_at = Column(DateTime,server_default=func.now())